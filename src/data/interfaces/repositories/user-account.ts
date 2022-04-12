export interface LoadUserAccountRepository {
  load: (
    params: LoadUserAccountRepository.Params
  ) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    spotifyId: string
  }

  export type Result =
    | undefined
    | {
      id: string
      username: string
      publicProfile: string
      spotifyId: string
    }
}

export interface SaveUserAccountRepository {
  save: (params: SaveUserAccountRepository.Params) => Promise<void>
}

export namespace SaveUserAccountRepository {
  export type Params = {
    id?: string
    username: string
    publicProfile: string
    spotifyId: string
  }
}
