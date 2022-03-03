export interface LoadUserRepository {
  load: (params: LoadUserRepository.Params) => Promise<void>;
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

export interface CreateUserRepository {
  create: (params: CreateUserRepository.Params) => Promise<void>;
}

export namespace CreateUserRepository {
  export type Params = {
    username: string;
    publicProfile: string;
    spotifyId: string;
  };
}
