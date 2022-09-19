import "reflect-metadata";
import ListProductService from "./ListProductService";
import { ProductRepository } from "../infra/repository/ProductRepository";
import { mockProduct, mockProductList } from "../__mocks__/ProductMock";
import AppError from "../errors/AppError";
import Product from "../domain/typeorm/entities/Product";
jest.mock("../infra/repository/ProductRepository");

describe("List", () => {
  let listService: ListProductService;
  let repository: ProductRepository;

  beforeAll(async () => {
    repository = new ProductRepository();
    listService = new ListProductService(repository);
  });

  it("should list all products", async () => {
    const product = mockProductList();
    jest.spyOn(repository, "find").mockResolvedValueOnce(product);

    const products = await listService.execute();

    expect(products).not.toBeNull();
    expect(repository.find.call.length).toBe(1)
  });

})


