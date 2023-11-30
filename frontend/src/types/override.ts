type FinalType<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type Override<T, U extends Partial<Record<keyof T, unknown>>> = FinalType<
  Omit<T, keyof U> & U
>;
