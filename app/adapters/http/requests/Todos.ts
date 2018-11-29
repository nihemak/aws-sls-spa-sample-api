import {
  TodoCreateInput as ITodoCreateInput,
  TodoShowInput as ITodoShowInput,
  TodoUpdateInput as ITodoUpdateInput,
  TodoDeleteInput as ITodoDeleteInput
} from "app/usecases/inputs/Todos";
import jwk from "jsonwebtoken";

export class TodoCreateInput implements ITodoCreateInput {
  private userId: string;
  private text: string;

  public constructor(
    headers: { [name: string]: string },
    eventBody: { [field: string]: any }
  ) {
    this.userId = this._getAuthUserId(headers);
    this.text = eventBody.text;
  }

  public getAuthUserId(): string {
    return this.userId;
  }

  public getText(): string {
    return this.text;
  }

  private _getAuthUserId(headers: { [name: string]: string }): string {
    let userId = headers["Authorization"];
    if (process.env.USER_POOL_ID !== "Dummy") {
      const decodedJwt: any = jwk.decode(userId, { complete: true });
      userId = decodedJwt.payload.sub;
    }
    return userId;
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
