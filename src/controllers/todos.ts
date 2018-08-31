import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { Todos } from "../models/Todos";
import * as Validator from "validatorjs";

export const create: Handler = async (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  try {
    const input = await validate(event, {
      text: ["required", "string"]
    });
    const todo = await new Todos().create(input.text);
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  } catch (error) {
    console.error(error);
    cb(null, {
      statusCode: error.statusCode || 501,
      body: JSON.stringify({
        message: "Couldn't create the todo item.",
        errors: error.errors
      })
    });
  }
};

export const list: Handler = async (
  _event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  try {
    const todos = await new Todos().all();
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todos)
    });
  } catch (error) {
    console.error(error);
    cb(null, {
      statusCode: error.statusCode || 501,
      body: JSON.stringify({
        message: "Couldn't fetch the todos.",
        errors: error.errors
      })
    });
  }
};

export const get: Handler = async (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  try {
    const input = await validate(event, {
      id: ["required", "string"]
    });
    const todo = await new Todos().get(input.id);
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  } catch (error) {
    console.error(error);
    cb(null, {
      statusCode: error.statusCode || 501,
      body: JSON.stringify({
        message: "Couldn't fetch the todo item.",
        errors: error.errors
      })
    });
  }
};

export const update: Handler = async (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  try {
    const input = await validate(event, {
      id: ["required", "string"],
      text: ["required", "string"],
      checked: ["required", "boolean"]
    });
    const todo = await new Todos().update(input.id, input.text, input.checked);
    cb(null, {
      statusCode: 200,
      body: JSON.stringify(todo)
    });
  } catch (error) {
    console.error(error);
    cb(null, {
      statusCode: error.statusCode || 501,
      body: JSON.stringify({
        message: "Couldn't update the todo item.",
        errors: error.errors
      })
    });
  }
};

export const destroy: Handler = async (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  try {
    const input = await validate(event, {
      id: ["required", "string"]
    });
    await new Todos().delete(input.id);
    cb(null, {
      statusCode: 200,
      body: JSON.stringify({})
    });
  } catch (error) {
    console.error(error);
    cb(null, {
      statusCode: error.statusCode || 501,
      body: JSON.stringify({
        message: "Couldn't remove the todo item.",
        errors: error.errors
      })
    });
  }
};

function validate(
  event: APIGatewayEvent,
  rules: { [field: string]: string[] }
): Promise<{ [field: string]: any }> {
  return new Promise((resolve, reject) => {
    let assoc: { [field: string]: any } = {};
    if (event.pathParameters) {
      assoc = Object.assign(assoc, event.pathParameters);
    }
    assoc = Object.assign(assoc, JSON.parse(event.body || "{}"));

    const validation = new Validator(assoc, rules);
    if (validation.fails()) {
      return reject({
        statusCode: 400,
        errors: Object.keys(validation.errors.all()).map(function(field: string) {
          return {
            field: field,
            message: validation.errors.first(field)
          };
        })
      });
    }
    return resolve(assoc);
  });
}
