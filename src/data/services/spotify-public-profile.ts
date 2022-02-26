import { SpotifyPublicProfile } from "@/domain/features";
import { LoadSpotifyUser } from "../interfaces";

export class SpotifyPublicProfileService {
  constructor(private readonly loadSpotifyUser: LoadSpotifyUser) {}

  async perform(params: SpotifyPublicProfile.Params): Promise<void> {
    await this.loadSpotifyUser.perform({ username: params.username });
    return undefined;
  }
}
