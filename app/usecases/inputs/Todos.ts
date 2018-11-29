export interface TodoCreateInput {
  getAuthUserId(): string;
  getText(): string;
}

export interface TodoShowInput {
  getId(): string;
}

export interface TodoUpdateInput {
  getId(): string;
  getText(): string | undefined;
  getChecked(): boolean | undefined;
}

export interface TodoDeleteInput {
  getId(): string;
}
