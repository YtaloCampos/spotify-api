export interface LoadSpotifyUserApi {
  loadUser: (params: LoadSpotifyUserApi.Params) => Promise<LoadSpotifyUserApi.Result>;
}

export namespace LoadSpotifyUserApi {
  type ExternalUrls = { spotify: string };

  export type Params = {
    username: string;
  };

  export type Result = {
    display_name: string;
    external_urls: ExternalUrls;
    id: string;
  };
}
