import { Container } from "inversify";
import { Todos as UseCaseTodos } from "../usecases/Todos";
import { Todos as UseCaseTodosImpl } from "../usecases/implementations/Todos";
import { Todos as StoreTodos } from "../usecases/stores/Todos";
import { Todos as StoreTodosImpl } from "../databases/Todos";

export const TYPES = {
  USECASE_TODOS: Symbol.for("USECASE_TODOS"),
  STORE_TODOS: Symbol.for("STORE_TODOS")
};

export const container = new Container();
container.bind<UseCaseTodos>(TYPES.USECASE_TODOS).to(UseCaseTodosImpl);
container.bind<StoreTodos>(TYPES.STORE_TODOS).to(StoreTodosImpl);
