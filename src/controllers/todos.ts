import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import * as validator from "validator";
import { Todos } from "../models/Todos";

export const create: Handler = (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  validateCreate(event)
    .then(input => {
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
    })
    .catch(() => {
      console.error("Validation Failed");
      cb(null, {
        statusCode: 400,
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
  validateGet(event)
    .then(input => {
      new Todos()
        .get(input.id)
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
    })
    .catch(() => {
      console.error("Validation Failed");
      cb(null, {
        statusCode: 400,
        body: JSON.stringify({
          message: "Couldn't create the todo item."
        })
      });
    });
};

export const update: Handler = (
  event: APIGatewayEvent,
  _: Context,
  cb: Callback
) => {
  validateUpdate(event)
    .then(input => {
      new Todos()
        .update(input.id, input.text, input.checked)
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
    })
    .catch(() => {
      console.error("Validation Failed");
      cb(null, {
        statusCode: 400,
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
  validateDestroy(event)
    .then(input => {
      new Todos()
        .delete(input.id)
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
    })
    .catch(() => {
      console.error("Validation Failed");
      cb(null, {
        statusCode: 400,
        body: JSON.stringify({
          message: "Couldn't remove the todo item."
        })
      });
    });
};

function validateCreate(event: APIGatewayEvent): Promise<any> {
  return new Promise((resolve, reject) => {
    const input = JSON.parse(event.body || "{}");
    if (!("text" in input) || validator.isEmpty(input.text)) {
      reject();
    } else {
      resolve({
        text: input.text
      });
    }
  });
}

function validateGet(event: APIGatewayEvent): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!event.pathParameters) {
      reject();
    } else {
      resolve({
        id: event.pathParameters.id
      });
    }
  });
}

function validateUpdate(event: APIGatewayEvent): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!event.pathParameters) {
      return reject();
    }
    const input = JSON.parse(event.body || "{}");
    if (!("text" in input) || validator.isEmpty(input.text)) {
      return reject();
    }
    if (!("checked" in input) || !validator.isBoolean(input.checked)) {
      return reject();
    }
    resolve({
      id: event.pathParameters.id,
      text: input.text,
      checked: input.checked
    });
  });
}

function validateDestroy(event: APIGatewayEvent): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!event.pathParameters) {
      reject();
    } else {
      resolve({
        id: event.pathParameters.id
      });
    }
  });
}
