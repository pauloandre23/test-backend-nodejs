import { container } from 'tsyringe';
import { IProductRepository } from '../domain/IProductRepository';
import { ProductRepository } from '../infra/repository/ProductRepository';

container.registerSingleton<IProductRepository>(
    'ProductRepository',
    ProductRepository,
  );