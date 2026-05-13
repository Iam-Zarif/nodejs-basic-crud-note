import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { Product } from "../types/Product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
  url: string,
  method: string | undefined,
) => {
  try {
    const products = readProduct();
    const urlParts = url?.split("/");
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

    const noProductsFound = (res: ServerResponse) => {
      sendResponse(res, "No Products Found", 404, null);
    };

    if (url === "/products" && method === "GET") {
      if (!products || products.length === 0) {
        return noProductsFound(res);
      }

      sendResponse(res, "Products Fetched Successfully", 200, products);
    } else if (method === "GET" && id !== null) {
      if (!products || products.length === 0) {
        return noProductsFound(res);
      }

      const product = products?.find((product: Product) => product?.id === id);

      sendResponse(res, "Product Fetched Successfully", 200, product);
    } else if (method === "POST" && url === "/products") {
      const body = await parseBody(req);

      const newProduct = {
        id: Date.now(),
        ...(typeof body === "object" && body !== null ? body : {}),
      };

      products.push(newProduct);

      insertProduct(products);

      sendResponse(res, "Product Created Successfully", 201, newProduct);
    } else if (method === "PUT" && id !== null) {
      const bbody = await parseBody(req);

      const products = readProduct();

      const index = products.findIndex((product: Product) => product.id === id);

      if (index !== -1) {
        const updatedProduct = {
          ...products[index],
          ...(typeof bbody === "object" && bbody !== null ? bbody : {}),
        };

        products[index] = updatedProduct;

        insertProduct(products);

        sendResponse(res, "Product Updated Successfully", 200, updatedProduct);
      } else {
        sendResponse(res, "Product Not Found", 404, null);
      }
    } else if (method === "DELETE" && id !== null) {
      if (!products || products.length === 0) {
        return noProductsFound(res);
      }

      const index = products.findIndex((product: Product) => product.id === id);

      if (index !== -1) {
        products.splice(index, 1);

        insertProduct(products);

        sendResponse(res, "Product Deleted Successfully", 200, null);
      } else {
        sendResponse(res, "Product Not Found", 404, null);
      }
    }
  } catch (error) {
    sendResponse(res, "Internal Server Error", 500, error);
  }
};
