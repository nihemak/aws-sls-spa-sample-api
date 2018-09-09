import { container, TYPES } from "../providers/StoreContainer";
import { Todos } from "../usecases/stores/Todos";

container
  .get<Todos>(TYPES.Todos)
  .createTable(1 /* readCapacity */, 1 /* writeCapacity */)
  .then(() => {
    console.log("Tables has been created");
  })
  .catch(error => {
    console.error("Error creating tables: " + error);
  });
