import { Container } from "inversify";
import { Todos } from "../usecases/stores/Todos";
import { Todos as TodosImpl } from "../databases/Todos";

export const TYPES = {
  Todos: Symbol.for("Todos")
};

export const container = new Container();
container.bind<Todos>(TYPES.Todos).to(TodosImpl);
