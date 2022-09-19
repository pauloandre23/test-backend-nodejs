import AppError from "../errors/AppError";
import { IProductRepository } from "../domain/IProductRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject("ProductRepository")
    private repository: IProductRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.repository.findOne(id);

    if (!product) {
      throw new AppError("Product not found");
    }

    await this.repository.remove(product);
  }
}

export default DeleteProductService;
