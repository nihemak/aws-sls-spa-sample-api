# AWS Serverless SPA(Single Page Application) Sample: Backend REST API

[![CircleCI](https://circleci.com/gh/nihemak/aws-sls-spa-sample-api/tree/master.svg?style=svg)](https://circleci.com/gh/nihemak/aws-sls-spa-sample-api/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/fbd1afc98b686d101a9e/maintainability)](https://codeclimate.com/github/nihemak/aws-sls-spa-sample-api/maintainability)

This is a sample to REST API with Serverless Framework and TypeScript. The repository for sample of infrastructure is [aws-sls-spa-sample-terraform](https://github.com/nihemak/aws-sls-spa-sample-terraform).

## APIs

* `POST /todos` : Register todo
* `GET /todos` : List todos
* `GET /todos/:id` : Get todo
* `PUT /todos/:id` : Update todo
* `DELETE /todos/:id` : Delete todo

## Getting Started with Docker

Clone the Repository:

```bash
$ git clone https://github.com/nihemak/aws-sls-spa-sample-api.git sample-spa-api
$ cd sample-spa-api
```

Build docker environment and Reset DynamoDB Local tables:

```bash
$ npm run docker-build
$ npm run docker-up-dev
$ npm run docker-reset-tables
$ npm run docker-down
```

Invoke serverless-offline in docker environment:

```bash
$ npm run docker-up
$ npm run docker-offline
```

Try the APIs:

```bash
# POST /todos
$ curl -X POST http://localhost:3000/v1/todos -H "Content-Type: application/json" --data '{ "text": "foo" }'
# GET /todos
$ curl http://localhost:3000/v1/todos
# GET /todos/:id
$ curl http://localhost:3000/v1/todos/:id
# PUT /todos/:id
$ curl -X PUT http://localhost:3000/v1/todos/:id -H "Content-Type: application/json" --data '{ "text": "bar", "checked": true }'
# DELETE /todos/:id
$ curl -X DELETE http://localhost:3000/v1/todos/:id
```

Access to DynamoDB Local admin web:

http://localhost:8000/

## Getting Started with AWS

See: [aws-sls-spa-sample-terraform](https://github.com/nihemak/aws-sls-spa-sample-terraform).
