import { SpotifyPublicProfile } from '@/domain/features'
import { LoadSpotifyUserApi } from '../interfaces/apis'
import {
  SaveUserAccountRepository,
  LoadUserAccountRepository,
} from '../interfaces/repositories'

export class SpotifyPublicProfileService implements SpotifyPublicProfile {
  constructor(
    private readonly spotifyApi: LoadSpotifyUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository &
    SaveUserAccountRepository
  ) {}

  async perform(params: SpotifyPublicProfile.Params): Promise<SpotifyPublicProfile.Result> {
    const spotifyUser = await this.spotifyApi.loadUser({
      username: params.username,
    })
    if (spotifyUser !== undefined) {
      const userData = await this.userAccountRepository.load({
        spotifyId: spotifyUser.id,
      })
      if (spotifyUser?.display_name !== userData?.username) {
        await this.userAccountRepository.save({
          id: userData?.id,
          username: spotifyUser.display_name,
          publicProfile: spotifyUser.external_urls.spotify,
          spotifyId: spotifyUser.id,
        })
      }
    }
    return spotifyUser
  }
}
