import { container, TYPES } from "app/providers/container";
import { System as UseCase } from "app/usecases/System";
import {
  SystemResetStoresInput,
  SystemResetStoresOutput
} from "app/adapters/commands/ResetAllTables";

const readCapacity = 1;
const writeCapacity = 1;

container
  .get<UseCase>(TYPES.USECASE_SYSTEM)
  .resetAllStores(
    new SystemResetStoresInput(readCapacity, writeCapacity),
    new SystemResetStoresOutput()
  )
  .then(() => console.log("done"))
  .catch(err => {
    console.error("Internal error: " + err);
    process.exit(99);
  });
