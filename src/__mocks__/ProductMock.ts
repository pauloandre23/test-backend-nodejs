import { Product } from "../domain/entities/Product"

export const mockProduct = () => {
    return new Product({
        title: "Firestick v2",
        category: "electronics",
        description: "usb dongle to entertain your tv",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}