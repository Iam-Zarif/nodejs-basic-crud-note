````md
# Basic Node.js CRUD API Without Express

This is a simple CRUD API built with **Node.js core HTTP module** and **TypeScript**.

No Express.js is used here.  
The main goal of this project is to understand the basic fundamentals of how a Node.js server and API work internally.

---

## Project Goal

This project helps me understand:

- How to create a server using Node.js
- How `req` and `res` work
- How to handle routes manually
- How to work with HTTP methods
- How to parse request body without Express
- How to send JSON response
- How to separate route, controller, service, utility, and types
- How to use a JSON file as a simple database

---

## Technologies Used

- Node.js
- TypeScript
- HTTP module
- File System module
- dotenv
- tsx

---

## Run The Project

```bash
npm install
````

```bash
npm run dev
```

---

## Package Script

```json
{
  "scripts": {
    "dev": "tsx watch ./src/server.ts"
  }
}
```

---

## Project Structure

```bash
.
├── package.json
├── .env
├── tsconfig.json
└── src
    ├── database
    │   └── db.json
    ├── types
    │   └── Product.type.ts
    ├── config
    │   └── index.ts
    ├── controller
    │   └── product.controller.ts
    ├── service
    │   └── product.service.ts
    ├── server.ts
    ├── routes
    │   └── routes.ts
    └── utility
        ├── parseBody.ts
        └── sendResponse.ts
```

---

## Server

The server is created using Node.js built-in `http` module.

```ts
import { createServer } from "http";
import { routeHandler } from "./routes/routes";
import config from "./config";

const server = createServer((req, res) => {
  routeHandler(req, res);
});

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
```

Here:

* `createServer()` creates the server
* `req` means incoming request
* `res` means server response
* `routeHandler()` handles all routes

---

## Routes

Routes are handled manually using `req.url` and `req.method`.

### Root Route

```http
GET /
```

Returns a basic root route response.

### Product Routes

```http
GET /products
```

Get all products.

```http
GET /products/:id
```

Get a single product by id.

```http
POST /products
```

Create a new product.

```http
PUT /products/:id
```

Update a product by id.

```http
DELETE /products/:id
```

Delete a product by id.

---

## Product Type

```ts
export type Product = {
  readonly id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
};
```

The `id` is readonly because it should not be changed after product creation.

---

## Request Body Parsing

In Express, we usually use:

```ts
app.use(express.json());
```

But in this project, the body is parsed manually.

```ts
req.on("data", (chunk) => {
  body += chunk;
});

req.on("end", () => {
  resolve(JSON.parse(body));
});
```

This shows that Node.js receives request data in chunks.

---

## JSON Response

A reusable helper function is used for sending JSON responses.

```ts
sendResponse(res, message, statusCode, data);
```

Example response:

```json
{
  "message": "Products Fetched Successfully",
  "data": []
}
```

---

## Database

This project uses a JSON file as a simple database.

```bash
src/database/db.json
```

Data is read using:

```ts
fs.readFileSync()
```

Data is written using:

```ts
fs.writeFileSync()
```

This is only for learning basic file-based data handling.

---

## CRUD Flow

### Create Product

* Receive request body
* Parse body manually
* Create new product with `Date.now()` as id
* Add product to array
* Save updated data in `db.json`
* Send success response

### Get All Products

* Read products from `db.json`
* Return all products

### Get Single Product

* Get id from URL
* Find product by id
* Return matched product

### Update Product

* Get id from URL
* Parse request body
* Find product index
* Merge old data with new data
* Save updated products
* Return updated product

### Delete Product

* Get id from URL
* Find product index
* Remove product from array
* Save updated products
* Send success response

---

## Example Product Body

```json
{
  "title": "Laptop",
  "price": 50000,
  "stock": 10,
  "category": "Electronics"
}
```

---

## Useful Command To View Project Structure

Without `tree`:

```bash
find . \
  -path ./node_modules -prune -o \
  -path ./.git -prune -o \
  -path ./dist -prune -o \
  -name package-lock.json -prune -o \
  -print
```

This ignores:

* `node_modules`
* `.git`
* `dist`
* `package-lock.json`

---

## Install Tree Command On Mac

To install `tree` globally on Mac:

```bash
brew install tree
```

Check if installed:

```bash
tree --version
```

Use this command to show clean project structure:

```bash
tree -L 4 -I "node_modules|.git|dist|package-lock.json"
```

---

## Important Notes

This project is not production-ready.

Because:

* It uses a JSON file as database
* It has no validation
* It has no authentication
* It has no advanced error handling
* It does not handle large request body safely
* It does not use a real database

---

## Summary

This project is useful for learning the core fundamentals of Node.js server-side API development before using Express.js or other frameworks.

