import middy from "@middy/core";

export const errorHandler = () => {
  return {
    onError: async (handler: middy.IHandlerLambda) => {
      console.error(handler.error);
      handler.response = {
        statusCode: (handler.error as any).statusCode || 501,
        body: JSON.stringify({
          message: (handler.error as any).message,
          errors: (handler.error as any).errors
        })
      };
    }
  };
};
