import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Product {
  readonly id: string;
  readonly title: string;
  readonly images: string[];
  readonly quantity?: number;
  readonly oldPrice?: number;
  readonly orders?: number;
  readonly avgRating?: number;
  readonly ratings?: number;
  readonly prodType: string;
  readonly featured: boolean;
  readonly prices: string[];
  readonly description?: string[];
  readonly queryName: string;
  readonly tags?: string[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}