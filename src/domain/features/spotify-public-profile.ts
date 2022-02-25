import { SpotifyProfile } from "../models/spotify-profile";

type Params = SpotifyPublicProfile.Params;
type Result = SpotifyPublicProfile.Result;

export interface SpotifyPublicProfile {
  execute: (params: Params) => Result;
}

export namespace SpotifyPublicProfile {
  export type Params = {
    username: string;
  };

  export type Result = SpotifyProfile;
}
