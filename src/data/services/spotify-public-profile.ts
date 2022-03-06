import { SpotifyPublicProfile } from "@/domain/features";
import { LoadUserApi } from "../interfaces/apis";
import {
  CreateUserRepository,
  LoadUserRepository,
  UpdateUserRepository,
} from "../interfaces/repositories";

export class SpotifyPublicProfileService {
  constructor(
    private readonly spotifyApi: LoadUserApi,
    private readonly userRepository: LoadUserRepository & CreateUserRepository & UpdateUserRepository
  ) {}

  async perform(params: SpotifyPublicProfile.Params): Promise<void> {
    const spotifyUser = await this.spotifyApi.perform({ username: params.username });
    if (spotifyUser !== undefined) {
      const userData = await this.userRepository.load({ spotifyId: spotifyUser.id });
      if (userData === undefined) {
        await this.userRepository.create({
          username: spotifyUser.display_name,
          publicProfile: spotifyUser.external_urls.spotify,
          spotifyId: spotifyUser.id,
        });
      } else {
        await this.userRepository.update({
          username: spotifyUser.display_name,
          publicProfile: spotifyUser.external_urls.spotify,
          spotifyId: spotifyUser.id,
        })
      }
    }
    return undefined;
  }
}
