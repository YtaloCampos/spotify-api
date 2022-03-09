import { SpotifyPublicProfile } from "@/domain/features";
import { LoadSpotifyUserApi } from "../interfaces/apis";
import {
  SaveUserAccountRepository,
  LoadUserAccountRepository
} from "../interfaces/repositories";

export class SpotifyPublicProfileService {
  constructor(
    private readonly spotifyApi: LoadSpotifyUserApi,
    private readonly userRepository: LoadUserAccountRepository & SaveUserAccountRepository
  ) {}

  async perform(params: SpotifyPublicProfile.Params): Promise<void> {
    const spotifyUser = await this.spotifyApi.perform({ username: params.username });
    if (spotifyUser !== undefined) {
      const userData = await this.userRepository.load({ spotifyId: spotifyUser.id });
      await this.userRepository.save({
        id: userData?.id,
        username: spotifyUser.display_name,
        publicProfile: spotifyUser.external_urls.spotify,
        spotifyId: spotifyUser.id,
      });
    }
    return undefined;
  }
}
