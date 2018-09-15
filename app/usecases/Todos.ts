import {
  TodoCreateInput,
  TodoShowInput,
  TodoUpdateInput,
  TodoDeleteInput,
  TodoResetTableInput
} from "./inputs/Todos";
import {
  TodoCreateOutput,
  TodoListOutput,
  TodoShowOutput,
  TodoUpdateOutput,
  TodoDeleteOutput,
  TodoResetTableOutput
} from "./outputs/Todos";

export interface Todos {
  create(input: TodoCreateInput, output: TodoCreateOutput): Promise<void>;
  list(output: TodoListOutput): Promise<void>;
  show(input: TodoShowInput, output: TodoShowOutput): Promise<void>;
  update(input: TodoUpdateInput, output: TodoUpdateOutput): Promise<void>;
  delete(input: TodoDeleteInput, output: TodoDeleteOutput): Promise<void>;
  resetTable(
    input: TodoResetTableInput,
    output: TodoResetTableOutput
  ): Promise<void>;
}
