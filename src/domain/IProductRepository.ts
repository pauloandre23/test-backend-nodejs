import Product from "../domain/typeorm/entities/Product";

interface ICreateProduct {
  title: string;
  description: string;
  price: number;
  category: string;
}

export interface IProductRepository {
  save(Product: Product): Promise<Product>;
  find(): Promise<Product[]>;
  remove(product: Product): Promise<void>;
  findByTitle(name: string): Promise<Product | null>;
  create({
    title,
    price,
    category,
    description,
  }: ICreateProduct): Promise<Product>;
  findOne(id: string): Promise<Product | null>;
}
