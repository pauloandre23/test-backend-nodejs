import "reflect-metadata";
import { ProductRepository } from "../infra/repository/ProductRepository";
import { mockProduct, mockRequest } from "../__mocks__/ProductMock";
import UpdateProductService from "./UpdateProductService";
jest.mock("../infra/repository/ProductRepository");

describe("Update", () => {
  let updateService: UpdateProductService;
  let repository: ProductRepository;

  beforeAll(async () => {
    repository = new ProductRepository();
    updateService = new UpdateProductService(repository);
  });

  it("should call update function when a valid product is informed", async () => {
    const product = mockProduct();
    const request = mockRequest();

    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(product);
    jest.spyOn(repository, 'findByTitle').mockResolvedValueOnce(null);
    await updateService.execute(request);

    expect(repository.findOne.call.length).toBe(1);
    expect(repository.findOne.call.length).toBe(1);
    expect(repository.save.call.length).toBe(1);
  });

})


