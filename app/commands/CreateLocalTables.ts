import { container, TYPES } from "app/providers/container";
import { Todos } from "app/usecases/stores/Todos";

container
  .get<Todos>(TYPES.STORE_TODOS)
  .createTable(1 /* readCapacity */, 1 /* writeCapacity */)
  .then(() => {
    console.log("Tables has been created");
  })
  .catch(error => {
    console.error("Error creating tables: " + error);
  });
