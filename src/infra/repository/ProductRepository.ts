import Product from "../../domain/typeorm/entities/Product";
import { IProductRepository } from "../../domain/IProductRepository";
import { getRepository, Repository } from "typeorm";
import { AppDataSource } from "../typeorm";

interface ICreateProduct {
  title: string;
  category: string;
  price: number;
  description: string;
}

export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;
  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }
  public async findByTitle(title: string): Promise<Product | null> {
    const product = await this.ormRepository.findOne({
      where: {
        title,
      },
    });
    return product;
  }

  public async create({
    title,
    category,
    price,
    description,
  }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({
      title,
      category,
      price,
      description,
    });
    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async findOne(id: string): Promise<Product | null> {
    const userFound = await this.ormRepository.findOne({
      where: { _id: id },
    });
    return userFound;
  }

  public async find(): Promise<Product[]> {
    const products = await this.ormRepository.find();
    return products;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}
