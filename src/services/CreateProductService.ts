import 'reflect-metadata';
import { IProductRepository } from "../domain/IProductRepository";
import Product from "../domain/typeorm/entities/Product";
import { injectable, inject } from "tsyringe";
import AppError from "../errors/AppError";

interface IRequest {
  title: string;
  price: number;
  description: string;
  category: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductMongoRepository")
    private repository: IProductRepository
  ) {}

  public async execute({
    title,
    price,
    description,
    category,
  }: IRequest): Promise<Product> {
    const productExists = await this.repository.findByTitle(title);
    if (productExists) {
      throw new AppError(`Product ${title} already exists`);
    }

    const product = await this.repository.create({
      title,
      price,
      category,
      description,
    });

    await this.repository.save(product);
    return product;
  }
}

export default CreateProductService;
