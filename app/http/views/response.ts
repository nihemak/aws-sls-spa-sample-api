import { Callback } from "aws-lambda";

export function success(cb: Callback, body: string): void {
  cb(null, {
    statusCode: 200,
    body: body
  });
}
