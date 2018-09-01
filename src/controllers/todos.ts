import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import middy from "@middy/core";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { errorHandler } from "../middlewares/error-handler";
import { requestValidator } from "../middlewares/request-validator";
import { Todos } from "../models/Todos";

export const create: middy.IMiddy = middy(
  async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    const todo = await new Todos().create((event.body as any).text);
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  }
)
  .use(httpJsonBodyParser())
  .use(
    requestValidator({
      text: ["required", "string"]
    })
  )
  .use(errorHandler());

export const list: middy.IMiddy = middy(
  async (_event: APIGatewayEvent, _: Context, cb: Callback) => {
    const todos = await new Todos().all();
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todos)
    });
  }
)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(errorHandler());

export const get: middy.IMiddy = middy(
  async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    const todo = await new Todos().get((event.pathParameters as any).id);
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  }
)
  .use(httpEventNormalizer())
  .use(
    requestValidator({
      id: ["required", "string"]
    })
  )
  .use(errorHandler());

export const update: middy.IMiddy = middy(
  async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    const todo = await new Todos().update(
      (event.pathParameters as any).id,
      (event.body as any).text,
      (event.body as any).checked
    );
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  }
)
  .use(httpEventNormalizer())
  .use(httpJsonBodyParser())
  .use(
    requestValidator({
      id: ["required", "string"],
      text: ["required", "string"],
      checked: ["required", "boolean"]
    })
  )
  .use(errorHandler());

export const destroy: middy.IMiddy = middy(
  async (event: APIGatewayEvent, _: Context, cb: Callback) => {
    await new Todos().delete((event.pathParameters as any).id);
    cb(null, {
      statusCode: 200,
      body: JSON.stringify({})
    });
  }
)
  .use(httpEventNormalizer())
  .use(
    requestValidator({
      id: ["required", "string"]
    })
  )
  .use(errorHandler());
