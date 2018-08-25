import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import * as validator from "validator";
import { Todos } from "../models/Todos";

export const create: Handler = (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  const input = JSON.parse(event.body || "{}");
  if (!input.text || validator.isEmpty(input.text)) {
    console.error("Validation Failed");
    cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Couldn't create the todo item."
      })
    });
    return;
  }
  new Todos()
    .create(input.text)
    .then(todo => {
      cb(null, {
        statusCode: 200,
        body: JSON.stringify(todo)
      });
    })
    .catch(error => {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        body: JSON.stringify({
          message: "Couldn't create the todo item."
        })
      });
    });
};

export const list: Handler = (
  _event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  new Todos()
    .all()
    .then(todos => {
      cb(null, {
        statusCode: 200,
        body: JSON.stringify(todos)
      });
    })
    .catch(error => {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        body: JSON.stringify({
          message: "Couldn't fetch the todos."
        })
      });
    });
};

export const get: Handler = (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  if (!event.pathParameters) {
    console.error("Validation Failed");
    cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Couldn't fetch the todo item."
      })
    });
    return;
  }
  new Todos()
    .get(event.pathParameters.id)
    .then(todo => {
      cb(null, {
        statusCode: 200,
        body: JSON.stringify(todo)
      });
    })
    .catch(error => {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        body: JSON.stringify({
          message: "Couldn't fetch the todo item."
        })
      });
    });
};

export const update: Handler = (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  if (!event.pathParameters) {
    console.error("Validation Failed");
    cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Couldn't update the todo item. id"
      })
    });
    return;
  }
  const input = JSON.parse(event.body || "{}");
  if (!input.text || validator.isEmpty(input.text)) {
    console.error("Validation Failed");
    cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Couldn't update the todo item. text"
      })
    });
    return;
  }
  if (!input.checked || !validator.isBoolean(input.checked)) {
    console.error("Validation Failed");
    cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Couldn't update the todo item. checked"
      })
    });
    return;
  }
  new Todos()
    .update(event.pathParameters.id, input.text, input.checked)
    .then(todo => {
      cb(null, {
        statusCode: 200,
        body: JSON.stringify(todo)
      });
    })
    .catch(error => {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        body: JSON.stringify({
          message: "Couldn't update the todo item."
        })
      });
    });
};

export const destroy: Handler = (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  if (!event.pathParameters) {
    console.error("Validation Failed");
    cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Couldn't remove the todo item."
      })
    });
    return;
  }
  new Todos()
    .delete(event.pathParameters.id)
    .then(() => {
      cb(null, {
        statusCode: 200,
        body: JSON.stringify({})
      });
    })
    .catch(error => {
      console.error(error);
      cb(null, {
        statusCode: error.statusCode || 501,
        body: JSON.stringify({
          message: "Couldn't remove the todo item."
        })
      });
    });
};
