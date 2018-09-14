import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import cors from "@middy/http-cors";
import { errorHandler } from "app/http/middlewares/error-handler";

export function applyCommonMiddlewares(handler: middy.IMiddy): middy.IMiddy {
  return handler
    .use(
      cors({
        origin: process.env.CORS || "*",
        headers:
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Cache-control,Pragma,X-Frame-Options",
        credentials: false
      })
    )
    .use(httpEventNormalizer())
    .use(httpJsonBodyParser())
    .use(errorHandler());
}
