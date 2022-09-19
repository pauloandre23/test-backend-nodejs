import "reflect-metadata";
import { v4 } from "uuid";
import { ProductRepository } from "../infra/repository/ProductRepository";
import { mockProduct } from "../__mocks__/ProductMock";
import AppError from "../errors/AppError";
import DeleteProductService from "./DeleteProductService";
jest.mock("../infra/repository/ProductRepository");

describe("Delete", () => {
  let deleteService: DeleteProductService;
  let repository: ProductRepository;

  beforeAll(async () => {
    repository = new ProductRepository();
    deleteService = new DeleteProductService(repository);
  });

  it("should call service delete", async () => {
    const product = mockProduct();
    jest.spyOn(repository, "findOne").mockResolvedValueOnce(product);
    jest.spyOn(repository, "remove").mockResolvedValueOnce();

    await deleteService.execute({ id: v4() });

    expect(repository.findOne.call.length).toBe(1);
    expect(repository.remove.call.length).toBe(1);
  });

  it("should raise an exception when trying to delete a product with an invalid id", async () => {
    jest.spyOn(repository, "findOne").mockResolvedValueOnce(null);

    await expect(deleteService.execute({ id: v4() })).rejects.toBeInstanceOf(
      AppError
    );
  });
});
