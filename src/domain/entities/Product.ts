export class Product {
  public readonly _id: string;

  public title: string;
  public description: string;
  public price: number;
  public category: string;
  public created_at: Date;
  public updated_at: Date;

  constructor(props: Omit<Product, "_id">) {
    Object.assign(this, props);
  }
}
