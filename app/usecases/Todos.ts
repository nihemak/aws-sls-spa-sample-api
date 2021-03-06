import {
  TodoCreateInput,
  TodoListInput,
  TodoShowInput,
  TodoUpdateInput,
  TodoDeleteInput
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
  list(input: TodoListInput, output: TodoListOutput): Promise<void>;
  show(input: TodoShowInput, output: TodoShowOutput): Promise<void>;
  update(input: TodoUpdateInput, output: TodoUpdateOutput): Promise<void>;
  delete(input: TodoDeleteInput, output: TodoDeleteOutput): Promise<void>;
}
