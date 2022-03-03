import { SpotifyPublicProfile } from "@/domain/features";
import { LoadUserApi } from "../interfaces/apis";
import {
  CreateUserRepository,
  LoadUserRepository,
} from "../interfaces/repositories";

export class SpotifyPublicProfileService {
  constructor(
    private readonly spotifyAPi: LoadUserApi,
    private readonly userRepository: LoadUserRepository & CreateUserRepository
  ) {}

  async perform(params: SpotifyPublicProfile.Params): Promise<void> {
    const result = await this.spotifyAPi.perform({ username: params.username });
    if (result !== undefined) {
      await this.userRepository.load({ spotifyId: result.id });
      await this.userRepository.create({
        username: result.display_name,
        publicProfile: result.external_urls.spotify,
        spotifyId: result.id,
      });
    }
    return undefined;
  }
}
