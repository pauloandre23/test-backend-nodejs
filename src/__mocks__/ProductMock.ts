import { Product } from "../domain/entities/Product";
import { v4 } from "uuid";

export const mockProduct = () => {
  return new Product({
    title: "Firestick v2",
    category: "electronics",
    description: "usb dongle to entertain your tv",
    price: 100,
    created_at: new Date(),
    updated_at: new Date(),
  });
};

export const mockProductList = () => {
  let list = [];
  const product1 = new Product({
    title: "Firestick v2",
    category: "electronics",
    description: "usb dongle to entertain your tv",
    price: 100,
    created_at: new Date(),
    updated_at: new Date(),
  });

  const product2 = new Product({
    title: "Worms 3d",
    category: "games",
    description: "best game ever",
    price: 100,
    created_at: new Date(),
    updated_at: new Date(),
  });

  list.push(product2);
  list.push(product1);
  return list;
}

export const mockRequest = () => {
  return {
    "id": v4(),
    "title": "Product Uno",
    "description": "Still the best",
    "price": 12.25,
    "category": "Muamba",
    
  };
}
