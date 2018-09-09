import { container, TYPES } from "../providers/container";
import { Todos } from "../usecases/stores/Todos";

container
  .get<Todos>(TYPES.STORE_TODOS)
  .createTable(1 /* readCapacity */, 1 /* writeCapacity */)
  .then(() => {
    console.log("Tables has been created");
  })
  .catch(error => {
    console.error("Error creating tables: " + error);
  });
