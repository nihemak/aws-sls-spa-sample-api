import { Container } from "inversify";
import { Todos } from "../models/Todos";
import { Todos as TodosImpl } from "../models/Implementations/Todos";

export const TYPES = {
  Todos: Symbol.for("Todos")
};

export const container = new Container();
container.bind<Todos>(TYPES.Todos).to(TodosImpl);
