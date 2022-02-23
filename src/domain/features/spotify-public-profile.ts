export interface SpotifyPublicProfile {
  execute: () => undefined;
}

export namespace SpotifyPublicProfile {
  export interface Params {
    clientId: string;
    clientSecret: string;
    username: string;
  }
}
