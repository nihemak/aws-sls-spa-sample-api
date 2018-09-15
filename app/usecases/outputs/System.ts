export interface SystemResetStoresOutput {
  success(): void;
  failed(error: any): void;
}
