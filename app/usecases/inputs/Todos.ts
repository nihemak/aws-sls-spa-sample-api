export interface TodoCreateInput {
  getAuthUserId(): string;
  getText(): string;
}

export interface TodoListInput {
  getAuthUserId(): string;
}

export interface TodoShowInput {
  getAuthUserId(): string;
  getId(): string;
}

export interface TodoUpdateInput {
  getAuthUserId(): string;
  getId(): string;
  getText(): string | undefined;
  getChecked(): boolean | undefined;
}

export interface TodoDeleteInput {
  getAuthUserId(): string;
  getId(): string;
}
