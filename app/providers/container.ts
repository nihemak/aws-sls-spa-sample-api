import { Container } from "inversify";

export const TYPES = {
  USECASE_SYSTEM: Symbol.for("USECASE_SYSTEM"),
  USECASE_TODOS: Symbol.for("USECASE_TODOS"),
  STORE_TODOS: Symbol.for("STORE_TODOS")
};

export const container = new Container();

import { System as UseCaseSystem } from "app/usecases/System";
import { System as UseCaseSystemImpl } from "app/usecases/implementations/System";
container.bind<UseCaseSystem>(TYPES.USECASE_SYSTEM).to(UseCaseSystemImpl);

import { Todos as UseCaseTodos } from "app/usecases/Todos";
import { Todos as UseCaseTodosImpl } from "app/usecases/implementations/Todos";
container.bind<UseCaseTodos>(TYPES.USECASE_TODOS).to(UseCaseTodosImpl);

import { Todos as StoreTodos } from "app/usecases/stores/Todos";
import { Todos as StoreTodosImpl } from "app/adapters/databases/Todos";
container.bind<StoreTodos>(TYPES.STORE_TODOS).to(StoreTodosImpl);
