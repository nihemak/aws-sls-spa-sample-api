import { Container } from "inversify";
import { Todos } from "../usecases/Todos";
import { Todos as TodoImpl } from "../usecases/implementations/Todos";

export const TYPES = {
  Todos: Symbol.for("Todos")
};

export const container = new Container();
container.bind<Todos>(TYPES.Todos).to(TodoImpl);
