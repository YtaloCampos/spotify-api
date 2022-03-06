export interface LoadUserRepository {
  load: (params: LoadUserRepository.Params) => Promise<LoadUserRepository.Result>;
}

export namespace LoadUserRepository {
  export type Params = {
    spotifyId: string;
  };

  export type Result = {
    username: string;
    publicProfile: string;
  } | undefined;
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

export interface UpdateUserRepository {
  update: (params: UpdateUserRepository.Params) => Promise<void>;
}

export namespace UpdateUserRepository {
  export type Params = {
    username: string;
    publicProfile: string;
    spotifyId: string;
  };
}
