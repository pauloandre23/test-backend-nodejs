import { Request, Response } from "express";
import CreateProductService from "../../services/CreateProductService";
import { container } from "tsyringe";

export default class ProductController {
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
}
