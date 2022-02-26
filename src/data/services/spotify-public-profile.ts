import { SpotifyPublicProfile } from "@/domain/features";
import { LoadUserApi } from "../interfaces/apis";

export class SpotifyPublicProfileService {
  constructor(private readonly spotifyAPi: LoadUserApi) {}

  async perform(params: SpotifyPublicProfile.Params): Promise<void> {
    await this.spotifyAPi.perform({ username: params.username });
    return undefined;
  }
}
