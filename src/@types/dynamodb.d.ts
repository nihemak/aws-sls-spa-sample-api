declare module "dynamodb" {
  var types: any;
  function dynamoDriver(driver: any): any;
  function define(modelName: string, config: any): any;
  function createTables(options: any, callback: any): any;
}
