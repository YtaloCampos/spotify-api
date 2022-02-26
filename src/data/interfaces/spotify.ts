export interface LoadUser {
  perform: (params: LoadUser.Params) => Promise<void>;
}

export namespace LoadUser {
  export type Params = {
    username: string;
  };

  export type Result = undefined;
}
