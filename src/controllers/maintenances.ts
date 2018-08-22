import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { Todos } from "../models/Todos";

export const init: Handler = (
  _event: APIGatewayEvent,
  _context: Context,
  cb: Callback
) => {
  if (! process.env.IS_OFFLINE) {
    cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "Error request"
      })
    });
    return;
  }

  const todos = new Todos();
  todos.createTable(function(err: any) {
    let response = {};
    if (err) {
      response = {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error creating tables: " + err
        })
      };
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Tables has been created"
        })
      };
    }
    cb(null, response);
  });
};
