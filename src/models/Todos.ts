export interface Todos {
  create(text: string): Promise<any>;
  all(): Promise<any>;
  get(id: string): Promise<any>;
  update(id: string, text: string, checked: boolean): Promise<any>;
  delete(id: string): Promise<any>;
  createTable(rc: number, wc: number): Promise<void>;
}
