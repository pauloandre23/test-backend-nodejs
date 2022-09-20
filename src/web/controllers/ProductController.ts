import { Request, Response } from "express";
import CreateProductService from "../../services/CreateProductService";
import { container } from "tsyringe";
import ListProductService from "../../services/ListProductService";
import UpdateProductService from "../../services/UpdateProductService";
import DeleteProductService from "../../services/DeleteProductService";

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = container.resolve(ListProductService);
    const products = await listProductsService.execute();

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, price, description, category } = request.body;
    const createProductService = container.resolve(CreateProductService);
    const product = await createProductService.execute({
      title,
      price,
      description,
      category,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, price, category, description } = request.body;
    const { id } = request.params;

    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute({
      id,
      title,
      price,
      description,
      category
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = container.resolve(DeleteProductService);
    await deleteProductService.execute({ id });

    return response.json([]);
  }
}
