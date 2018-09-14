import { container, TYPES } from "app/providers/container";
import { Todos as UseCase } from "app/usecases/Todos";
import { TodoCreateTableInput } from "app/adapters/commands/Todos";

container
  .get<UseCase>(TYPES.USECASE_TODOS)
  .createTable(
    new TodoCreateTableInput(1 /* readCapacity */, 1 /* writeCapacity */)
  )
  .then(() => {
    console.log("Tables has been created");
  })
  .catch(error => {
    console.error("Error creating tables: " + error);
  });
