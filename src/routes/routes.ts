import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req:IncomingMessage, res:ServerResponse) =>{
      const url = req.url;
      const method = req.method;

      if (url === "/" && method === "GET") {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            message: "This is Root Route",
            route: url,
            method: method,
          }),
        );
      } else if (url?.startsWith("/products")) {
       productController(req, res, url, method);
      } else {
      }
}