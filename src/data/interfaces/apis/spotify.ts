export interface LoadUserApi {
  perform: (params: LoadUserApi.Params) => Promise<LoadUserApi.Result>;
}

export namespace LoadUserApi {
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
