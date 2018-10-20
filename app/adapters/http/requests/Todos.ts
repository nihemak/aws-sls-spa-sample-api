import {
  TodoCreateInput as ITodoCreateInput,
  TodoShowInput as ITodoShowInput,
  TodoUpdateInput as ITodoUpdateInput,
  TodoDeleteInput as ITodoDeleteInput
} from "app/usecases/inputs/Todos";

export class TodoCreateInput implements ITodoCreateInput {
  private text: string;

  public constructor(eventBody: { [field: string]: any }) {
    this.text = eventBody.text;
  }

  public getText(): string {
    return this.text;
  }
}

export class TodoShowInput implements ITodoShowInput {
  private id: string;

  public constructor(eventPathParameters: { [field: string]: any }) {
    this.id = eventPathParameters.id;
  }

  public getId(): string {
    return this.id;
  }
}

export class TodoUpdateInput implements ITodoUpdateInput {
  private id: string;
  private text: string;
  private checked: boolean;

  public constructor(
    eventPathParameters: { [field: string]: any },
    eventBody: { [field: string]: any }
  ) {
    this.id = eventPathParameters.id;
    this.text = "text" in eventBody ? eventBody.text : undefined;
    this.checked = "checked" in eventBody ? eventBody.checked : undefined;
  }

  public getId(): string {
    return this.id;
  }

  public getText(): string | undefined {
    return this.text;
  }

  public getChecked(): boolean | undefined {
    return this.checked;
  }
}

export class TodoDeleteInput implements ITodoDeleteInput {
  private id: string;

  public constructor(eventPathParameters: { [field: string]: any }) {
    this.id = eventPathParameters.id;
  }

  public getId(): string {
    return this.id;
  }
}
