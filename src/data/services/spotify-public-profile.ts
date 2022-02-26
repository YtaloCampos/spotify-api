import { SpotifyPublicProfile } from "@/domain/features";
import { LoadUser } from "../interfaces";

export class SpotifyPublicProfileService {
  constructor(private readonly spotifyAPi: LoadUser) {}

  async perform(params: SpotifyPublicProfile.Params): Promise<void> {
    await this.spotifyAPi.perform({ username: params.username });
    return undefined;
  }
}
