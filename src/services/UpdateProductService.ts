import AppError from '../errors/AppError';
import { IProductRepository } from '../domain/IProductRepository';
import Product from '../domain/typeorm/entities/Product';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  public async execute({
    id,
    title,
    price,
    description,
    category,
  }: IRequest): Promise<Product> {
    const product = await this.repository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await this.repository.findByTitle(title);

    if (productExists && title !== product.title) {
      throw new AppError(
        `Product ${title} already exists. Try a different title.`,
      );
    }

    product.title = title;
    product.price = price;
    product.description = description;
    product.category = category;

    await this.repository.save(product);

    return product;
  }
}

export default UpdateProductService;
