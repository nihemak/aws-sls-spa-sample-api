import {
  TodoCreateInput as ITodoCreateInput,
  TodoListInput as ITodoListInput,
  TodoShowInput as ITodoShowInput,
  TodoUpdateInput as ITodoUpdateInput,
  TodoDeleteInput as ITodoDeleteInput
} from "app/usecases/inputs/Todos";
import jwk from "jsonwebtoken";

class TodoInput {
  protected _getAuthUserId(headers: { [name: string]: string }): string {
    let userId = headers["Authorization"];
    if (process.env.USER_POOL_ID !== "Dummy") {
      const decodedJwt: any = jwk.decode(userId, { complete: true });
      userId = decodedJwt.payload.sub;
    }
    return userId;
  }
}

export class TodoCreateInput extends TodoInput implements ITodoCreateInput {
  private userId: string;
  private text: string;

  public constructor(
    headers: { [name: string]: string },
    eventBody: { [field: string]: any }
  ) {
    super();

    this.userId = this._getAuthUserId(headers);
    this.text = eventBody.text;
  }

  public getAuthUserId(): string {
    return this.userId;
  }

  public getText(): string {
    return this.text;
  }
}

export class TodoListInput extends TodoInput implements ITodoListInput {
  private userId: string;

  public constructor(headers: { [name: string]: string }) {
    super();

    this.userId = this._getAuthUserId(headers);
  }

  public getAuthUserId(): string {
    return this.userId;
  }
}

export class TodoShowInput extends TodoInput implements ITodoShowInput {
  private userId: string;
  private id: string;

  public constructor(
    headers: { [name: string]: string },
    eventPathParameters: { [field: string]: any }
  ) {
    super();

    this.userId = this._getAuthUserId(headers);
    this.id = eventPathParameters.id;
  }

  public getAuthUserId(): string {
    return this.userId;
  }

  public getId(): string {
    return this.id;
  }
}

export class TodoUpdateInput extends TodoInput implements ITodoUpdateInput {
  private userId: string;
  private id: string;
  private text: string;
  private checked: boolean;

  public constructor(
    headers: { [name: string]: string },
    eventPathParameters: { [field: string]: any },
    eventBody: { [field: string]: any }
  ) {
    super();

    this.userId = this._getAuthUserId(headers);
    this.id = eventPathParameters.id;
    this.text = "text" in eventBody ? eventBody.text : undefined;
    this.checked = "checked" in eventBody ? eventBody.checked : undefined;
  }

  public getAuthUserId(): string {
    return this.userId;
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

export class TodoDeleteInput extends TodoInput implements ITodoDeleteInput {
  private userId: string;
  private id: string;

  public constructor(
    headers: { [name: string]: string },
    eventPathParameters: { [field: string]: any }
  ) {
    super();

    this.userId = this._getAuthUserId(headers);
    this.id = eventPathParameters.id;
  }

  public getAuthUserId(): string {
    return this.userId;
  }

  public getId(): string {
    return this.id;
  }
}
