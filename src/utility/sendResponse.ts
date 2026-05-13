import type { ServerResponse } from "http";


export const sendResponse = (res:ServerResponse, message:string,statusCode:number, data:unknown) =>{

    
 res.writeHead(statusCode, {
   "Content-Type": "application/json",
 });
 res.end(
   JSON.stringify({
     message: message,
     data: data,
   }),
 );

}
