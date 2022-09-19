import { mockProduct } from "../../__mocks__/ProductMock";

describe("Domain", () => {
  it("should be able to instantiate a product", () => {
    const product = mockProduct();
    expect(product.category).toBe("electronics");
    expect(product.description).toBe("usb dongle to entertain your tv");
    expect(product.price).toBe(100);
    expect(product.title).toBe("Firestick v2");
  });
});
