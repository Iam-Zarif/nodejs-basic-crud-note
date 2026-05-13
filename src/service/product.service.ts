import path from "path"
const cwd = process.cwd()
import fs from "fs"
const filepath = path.join(cwd, "./src/database/db.json")

export const readProduct = () =>{

    const products = fs.readFileSync(filepath, "utf-8")
    return JSON.parse(products)

}

export const insertProduct = (payload:unknown) =>{
 fs.writeFileSync(filepath, JSON.stringify(payload))
}