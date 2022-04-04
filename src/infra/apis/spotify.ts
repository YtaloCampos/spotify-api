import { LoadSpotifyUserApi } from '@/data/interfaces/apis/spotify'
import { HttpGetClient } from '@/infra/http'

export class SpotifyApi implements LoadSpotifyUserApi {
  private readonly baseUrl = 'https://accounts.spotify.com/api/token'

  constructor(
    private readonly httpGetClient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async loadUser(params: LoadSpotifyUserApi.Params): Promise<LoadSpotifyUserApi.Result> {
    return await this.httpGetClient.get({
      url: `${this.baseUrl}/${params.username}`,
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(this.clientId + ':' + this.clientSecret).toString(
            'base64'
          ),
      },
      form: {
        grant_type: 'client_credentials',
      },
      json: true,
    })
  }
}
