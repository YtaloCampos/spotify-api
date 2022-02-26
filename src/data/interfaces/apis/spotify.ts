export interface LoadUserApi {
  perform: (params: LoadUserApi.Params) => Promise<void>;
}

export namespace LoadUserApi {
  export type Params = {
    username: string;
  };

  export type Result = undefined;
}
