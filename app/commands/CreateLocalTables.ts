import { container, TYPES } from "app/providers/container";
import { Todos as UseCase } from "app/usecases/Todos";
import {
  TodoCreateTableInput,
  TodoCreateTableOutput
} from "app/adapters/commands/Todos";

const readCapacity = 1;
const writeCapacity = 1;

container
  .get<UseCase>(TYPES.USECASE_TODOS)
  .createTable(
    new TodoCreateTableInput(readCapacity, writeCapacity),
    new TodoCreateTableOutput()
  )
  .then(() => console.log("done"))
  .catch(err => {
    console.error("Internal error: " + err);
    process.exit(99);
  });
