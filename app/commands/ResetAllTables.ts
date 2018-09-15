import { container, TYPES } from "app/providers/container";
import { Todos as UseCase } from "app/usecases/Todos";
import {
  TodoResetTableInput,
  TodoResetTableOutput
} from "app/adapters/commands/Todos";

const readCapacity = 1;
const writeCapacity = 1;

container
  .get<UseCase>(TYPES.USECASE_TODOS)
  .resetTable(
    new TodoResetTableInput(readCapacity, writeCapacity),
    new TodoResetTableOutput()
  )
  .then(() => console.log("done"))
  .catch(err => {
    console.error("Internal error: " + err);
    process.exit(99);
  });
