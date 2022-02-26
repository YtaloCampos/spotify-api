import { SpotifyPublicProfile } from "@/domain/features";
import { LoadUserApi } from "../interfaces/apis";
import { LoadUserRepository } from "../interfaces/repositories";

export class SpotifyPublicProfileService {
  constructor(
    private readonly spotifyAPi: LoadUserApi,
    private readonly loadUserRepo: LoadUserRepository
  ) {}

  async perform(params: SpotifyPublicProfile.Params): Promise<void> {
    const result = await this.spotifyAPi.perform({ username: params.username });
    if (result !== undefined) {
      await this.loadUserRepo.perform({ spotifyId: result.id });
    }
    return undefined;
  }
}
