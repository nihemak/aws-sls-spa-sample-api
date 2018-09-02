import middy from "@middy/core";
import Validator = require("validatorjs");

export const requestValidator = (rules: { [field: string]: string[] }) => {
  return {
    before: (handler: middy.IHandlerLambda, next: middy.IMiddyNextFunction) => {
      let assoc: { [field: string]: any } = {};
      assoc = Object.assign(assoc, handler.event.body);
      assoc = Object.assign(assoc, handler.event.pathParameters);
      const validation = new Validator(assoc, rules);
      if (validation.fails()) {
        return next({
          statusCode: 400,
          message: "There is an error in the parameter.",
          errors: Object.keys(validation.errors.all()).map(function(
            field: string
          ) {
            return {
              field: field,
              message: validation.errors.first(field)
            };
          })
        });
      }
      return next();
    }
  };
};
