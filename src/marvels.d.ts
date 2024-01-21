declare global {
  export type Nullable<T> = T | null;

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

export {};
