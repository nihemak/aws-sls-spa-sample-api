import { SystemResetStoresInput } from "./inputs/System";
import { SystemResetStoresOutput } from "./outputs/System";

export interface System {
  resetAllStores(
    input: SystemResetStoresInput,
    output: SystemResetStoresOutput
  ): Promise<void>;
}
