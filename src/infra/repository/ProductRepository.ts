import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/IProductRepository';
import { getRepository, Repository } from 'typeorm';
import { AppDataSource } from '../typeorm';

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
        description
      }: ICreateProduct): Promise<Product> {
        const product = this.ormRepository.create({ title, category, price, description });
        await this.ormRepository.save(product);
    
        return product;
      }
}
