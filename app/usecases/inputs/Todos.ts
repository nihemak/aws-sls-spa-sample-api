export interface TodoCreateInput {
  getText(): string;
}

export interface TodoShowInput {
  getId(): string;
}

export interface TodoUpdateInput {
  getId(): string;
  getText(): string;
  getChecked(): boolean;
}

export interface TodoDeleteInput {
  getId(): string;
}

export interface TodoResetTableInput {
  getReadCapacity(): number;
  getWriteCapacity(): number;
}
