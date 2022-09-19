import { IProductRepository } from "../domain/IProductRepository";
import Product from "../domain/typeorm/entities/Product";
import { injectable, inject } from "tsyringe";

@injectable()
class ListProductService {
  constructor(
    @inject("ProductRepository")
    private repository: IProductRepository
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.repository.find();

    return products;
  }
}

export default ListProductService;
