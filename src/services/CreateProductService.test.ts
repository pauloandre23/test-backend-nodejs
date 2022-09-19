import "reflect-metadata";
import CreateProductService from "./CreateProductService";
import { ProductRepository } from "../infra/repository/ProductRepository";
import { mockProduct } from "../__mocks__/ProductMock";
import AppError from "../errors/AppError";
jest.mock("../infra/repository/ProductRepository");

describe("Create", () => {
  let createService: CreateProductService;
  let repository: ProductRepository;

  beforeAll(async () => {
    repository = new ProductRepository();
    createService = new CreateProductService(repository);
  });

  it("should save a new product", async () => {
    const product = mockProduct();
    jest.spyOn(repository, "findByTitle").mockResolvedValueOnce(null);
    jest.spyOn(repository, "create").mockResolvedValueOnce(product);
    jest.spyOn(repository, "save").mockResolvedValueOnce(product);

    const newProduct = await createService.execute(product);

    expect(newProduct.category).toBe(product.category);
    expect(newProduct.description).toBe(product.description);
    expect(newProduct.title).toBe(product.title);
    expect(newProduct.price).toBe(product.price);
  });

  it("should raise an exception when trying to save existent product", async () => {
    const product = mockProduct();

    jest.spyOn(repository, "findByTitle").mockResolvedValueOnce(product);

    await expect(createService.execute(product)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
