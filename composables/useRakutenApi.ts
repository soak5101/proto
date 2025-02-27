import { ref, Ref } from 'vue';
import { SearchParams, Product, SearchResponse } from '~/utils/types';

export const useRakutenApi = () => {
  const products: Ref<Product[]> = ref([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const totalCount = ref(0);
  const totalPages = ref(0);
  const currentPage = ref(1);

  const searchProducts = async (params: SearchParams) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // runtimeConfigから環境変数を取得
      const config = useRuntimeConfig();
      const appId = config.public.rakutenAppId;
      
      if (!appId) {
        throw new Error('楽天アプリケーションIDが設定されていません');
      }
      
      // 価格範囲の処理
      let minPrice, maxPrice;
      if (params.priceRange) {
        const [min, max] = params.priceRange.split('-');
        minPrice = min;
        maxPrice = max || '';
      }

      // APIリクエストパラメータの構築
      const queryParams = new URLSearchParams();
      queryParams.append('applicationId', appId);
      queryParams.append('format', 'json');
      queryParams.append('formatVersion', '2');
      
      if (params.keyword) {
        queryParams.append('keyword', params.keyword);
      }
      
      if (params.genreId) {
        queryParams.append('genreId', params.genreId);
      }
      
      if (minPrice) {
        queryParams.append('minPrice', minPrice);
      }
      
      if (maxPrice) {
        queryParams.append('maxPrice', maxPrice);
      }
      
      queryParams.append('hits', '20'); // 1ページあたりの商品数
      queryParams.append('page', params.page.toString());
      
      // APIリクエスト
      console.log(`https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${queryParams.toString()}`);
      const response = await fetch(`https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data: SearchResponse = await response.json();
      
      // レスポンスデータの処理
      console.log('API Response:', data);

      // 画像URLのCORS問題を回避するための修正
      const fixImageUrl = (url: string) => {
        // 画像URLにhttpsを強制
        if (url && url.startsWith('http:')) {
          return url.replace('http:', 'https:');
        }
        return url;
      };

      // 楽天APIのレスポンス形式を変換
      if (data.Items && Array.isArray(data.Items)) {
        console.log('First item sample:', data.Items[0]);
        
        products.value = data.Items.map((item: any) => {
          console.log('Image URLs:', item.mediumImageUrls);
          
          return {
            itemCode: item.itemCode || '',
            itemName: item.itemName || '',
            itemPrice: item.itemPrice || 0,
            itemUrl: item.itemUrl || '',
            imageUrl: item.mediumImageUrls && item.mediumImageUrls.length > 0 
              ? item.mediumImageUrls[0].imageUrl 
              : 'https://placehold.co/600x400/e2e8f0/1e293b?text=画像なし',
            shopName: item.shopName || '',
            reviewAverage: item.reviewAverage || 0,
            reviewCount: item.reviewCount || 0
          };
        });
      } else {
        products.value = [];
      }

      totalCount.value = data.count || 0;
      totalPages.value = data.pageCount || 0;
      currentPage.value = data.page || 1;
      
    } catch (err) {
      console.error('Error fetching products:', err);
      error.value = err instanceof Error ? err.message : '商品の検索中にエラーが発生しました';
      products.value = [];
      totalCount.value = 0;
      totalPages.value = 0;
    } finally {
      isLoading.value = false;
    }
  };

  const sortProducts = (sortOption: string) => {
    if (sortOption === 'standard' || !products.value.length) {
      return;
    }
    
    const direction = sortOption.startsWith('+') ? 1 : -1;
    const field = sortOption.substring(1);
    
    products.value.sort((a: any, b: any) => {
      return direction * (a[field] - b[field]);
    });
  };

  return {
    products,
    isLoading,
    error,
    totalCount,
    totalPages,
    currentPage,
    searchProducts,
    sortProducts
  };
}; 