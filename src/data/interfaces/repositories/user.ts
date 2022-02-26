export interface LoadUserRepository {
  perform: (params: LoadUserRepository.Params) => Promise<void>;
}

export namespace LoadUserRepository {
  export type Params = {
    spotifyId: string;
  };

  export type Result = {
    username: string;
    publicProfile: string;
  };
}
