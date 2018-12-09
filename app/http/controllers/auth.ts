// https://github.com/serverless/examples/tree/master/aws-node-auth0-cognito-custom-authorizers-api
// https://github.com/awslabs/aws-apigateway-lambda-authorizer-blueprints/blob/master/blueprints/nodejs/index.js
import jwk from "jsonwebtoken";
import request from "request";
import jwkToPem from "jwk-to-pem";

const region = process.env.REGION;
const userPoolId = process.env.USER_POOL_ID;
const iss = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;

// Generate policy to allow this user on this API:
const generatePolicy = (principalId: any, resource: any) => {
  const tmp = resource.split(":");
  const apiGatewayArnTmp = tmp[5].split("/");
  const awsAccountId = tmp[4];
  const region = tmp[3];
  const restApiId = apiGatewayArnTmp[0];
  const stage = apiGatewayArnTmp[1];
  const resourceArn = `arn:aws:execute-api:${region}:${awsAccountId}:${restApiId}/${stage}/*/*`;

  const policy = {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: [resourceArn]
        }
      ]
    }
  };

  return policy;
};

export function authorize(event: any, _context: any, cb: any) {
  console.log("Auth function invoked");

  if (userPoolId === "Dummy") {
    console.log("Auth function dummy mode");
    cb(null, generatePolicy("dummySub", event.methodArn));
    return;
  }

  if (event.authorizationToken) {
    const token = event.authorizationToken;
    // Make a request to the iss + .well-known/jwks.json URL:
    request(
      { url: `${iss}/.well-known/jwks.json`, json: true },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          console.log("Request error:", error);
          cb("Unauthorized");
        }
        const keys = body;
        // Based on the JSON of `jwks` create a Pem:
        const k = keys.keys[0];
        const jwkArray = {
          kty: k.kty,
          n: k.n,
          e: k.e
        };
        const pem = jwkToPem(jwkArray);

        // Verify the token:
        jwk.verify(token, pem, { issuer: iss }, (err, decoded: any) => {
          if (err) {
            console.log("Unauthorized user:", err.message);
            cb("Unauthorized");
          } else {
            cb(null, generatePolicy(decoded.sub, event.methodArn));
          }
        });
      }
    );
  } else {
    console.log("No authorizationToken found in the header.");
    cb("Unauthorized");
  }
}
