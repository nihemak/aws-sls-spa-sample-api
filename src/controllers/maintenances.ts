import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { Todos } from "../models/Todos";

export const init: Handler = (
  _event: APIGatewayEvent,
  _context: Context,
  cb: Callback
) => {
  if (!process.env.IS_OFFLINE) {
    cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Error request"
      })
    });
    return;
  }

  const todos = new Todos();
  todos
    .createTable()
    .then(() => {
      cb(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Tables has been created"
        })
      });
    })
    .catch(error => {
      cb(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error creating tables: " + error
        })
      });
    });
};
