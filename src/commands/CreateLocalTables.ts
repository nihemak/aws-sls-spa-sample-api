import { container, TYPES } from "../providers/inversify.config";
import { Todos } from "../models/Todos";

container
  .get<Todos>(TYPES.Todos)
  .createTable(1 /* readCapacity */, 1 /* writeCapacity */)
  .then(() => {
    console.log("Tables has been created");
  })
  .catch(error => {
    console.error("Error creating tables: " + error);
  });
