export interface LoadSpotifyUser {
  perform: (params: LoadSpotifyUser.Params) => Promise<void>;
}

export namespace LoadSpotifyUser {
  export type Params = {
    username: string;
  };

  export type Result = undefined;
}
