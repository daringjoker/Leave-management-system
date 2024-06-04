export type Concrete<T> = {
  [P in keyof T]-?: T[P];
};

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type ValueOf<T> = T[keyof T];
