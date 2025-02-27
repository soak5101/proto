export interface SearchParams {
  keyword: string;
  genreId: string;
  priceRange: string;
  page: number;
}

export interface RakutenProduct {
  itemCode: string;
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  mediumImageUrls: { imageUrl: string }[];
  shopName: string;
  reviewAverage: number;
  reviewCount: number;
}

export interface Product {
  itemCode: string;
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  imageUrl: string;
  shopName: string;
  reviewAverage: number;
  reviewCount: number;
}

export interface SearchResponse {
  Items: {
    Item: RakutenProduct;
  }[];
  pageCount: number;
  hits: number;
  last: number;
  count: number;
  page: number;
  carrier: number;
  GenreInformation: any[];
  TagInformation: any[];
}