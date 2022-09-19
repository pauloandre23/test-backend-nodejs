import { Product } from "../domain/entities/Product";

interface ICreateProduct {
  title: string;
  description: string;
  price: number;
  category: string;
}

export interface IProductRepository {
  save(Product: Product): Promise<Product>;
  update(Product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
  findByTitle(name: string): Promise<Product | null>;
  create({ title, price, category, description }: ICreateProduct): Promise<Product>;
}
