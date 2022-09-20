import { v4 } from "uuid";
import request from "supertest";
import { app } from "../../app";
import ProductController from "./ProductController";
import CreateProductService from "../../services/CreateProductService";
import { ProductRepository } from "../../infra/repository/ProductRepository";
import { mockProduct } from "../../__mocks__/ProductMock";
import ListProductService from "../../services/ListProductService";

jest.mock("../../services/CreateProductService");
jest.mock("../../infra/repository/ProductRepository");
jest.mock("../../services/ListProductService");

const productController = new ProductController();
const fakeDate = new Date();
const fakeId = v4();

describe("Controller - All methods", () => {
  let createProductService: CreateProductService;
  let repository: ProductRepository;
  let listProductService: ListProductService;

  beforeAll(async () => {
    repository = new ProductRepository();
    createProductService = new CreateProductService(repository);
    listProductService = new ListProductService(repository);
  });

  it("execute method from CreateProductService should be called when controller create method starts", async () => {
    jest
      .spyOn(createProductService, "execute")
      .mockResolvedValueOnce(mockResponse());

    await productController.create(mockHttpReqRes(), mockHttpReqRes());

    expect(createProductService.execute.call.length).toBe(1);
  });

  it('should return 201 when /product POST method is called', async () => {
    jest.spyOn(createProductService, 'execute').mockResolvedValueOnce(mockResponse());

    const response = await request(app)
      .post('/product')
      .set('Accept', 'application/json')
      .send(mockRequest())

      expect(response.status).toBe(201);
  });

  it('remove method from ProductRepository should be called when controller delete method starts', async () => {
    const product = mockProduct(); 
    jest.spyOn(repository, 'remove').mockResolvedValueOnce();
    
    await productController.delete(mockHttpReqRes(), mockHttpReqRes());

    expect(repository.findOne.call.length).toBe(1);
    expect(repository.remove.call.length).toBe(1);
  });

  it("execute method from ListProductsUseCase should be called when controller index method starts", async () => {
    jest
      .spyOn(listProductService, "execute")
      .mockResolvedValueOnce([mockResponse()]);

    await productController.index(mockHttpReqRes(), mockHttpReqRes());

    expect(listProductService.execute.call.length).toBe(1);
  }, 30000);
});

const mockResponse = () => {
  return {
    _id: fakeId,
    title: "Produto 1",
    description: "Pacote de feijao",
    price: 2.0,
    created_at: fakeDate,
    updated_at: fakeDate,
    category: "Jonas Toys",
  };
};

const mockRequest = () => {
    return {
      title: "Produto 1",
      description: "Pacote de feijao",
      price: 2.0,
      created_at: fakeDate,
      updated_at: fakeDate,
      category: "Jonas Toys",
    };
  };

const mockHttpReqRes = () => {
  const httpReqResMock: any = {};
  httpReqResMock.status = jest.fn().mockReturnValue(httpReqResMock);
  httpReqResMock.json = jest.fn().mockReturnValue(httpReqResMock);
  httpReqResMock.body = jest.fn().mockReturnValue(mockResponse());

  return httpReqResMock;
};
