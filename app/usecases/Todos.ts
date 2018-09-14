import {
  TodoCreateInput,
  TodoShowInput,
  TodoUpdateInput,
  TodoDeleteInput,
  TodoCreateTableInput
} from "./inputs/Todos";
import {
  TodoCreateOutput,
  TodoListOutput,
  TodoShowOutput,
  TodoUpdateOutput,
  TodoDeleteOutput
} from "./outputs/Todos";

export interface Todos {
  create(input: TodoCreateInput, output: TodoCreateOutput): Promise<void>;
  list(output: TodoListOutput): Promise<void>;
  show(input: TodoShowInput, output: TodoShowOutput): Promise<void>;
  update(input: TodoUpdateInput, output: TodoUpdateOutput): Promise<void>;
  delete(input: TodoDeleteInput, output: TodoDeleteOutput): Promise<void>;
  createTable(input: TodoCreateTableInput): Promise<void>;
}
