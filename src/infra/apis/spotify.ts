import { LoadSpotifyUserApi } from '@/data/interfaces/apis/spotify'
import { HttpGetClient } from '@/infra/http'

type Result = LoadSpotifyUserApi.Result

export class SpotifyApi implements LoadSpotifyUserApi {
  private readonly baseUrl = 'https://accounts.spotify.com/api/token'

  constructor(
    private readonly httpGetClient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  async loadUser(params: LoadSpotifyUserApi.Params): Promise<Result> {
    return await this.httpGetClient
      .get<Result>({
      url: `${this.baseUrl}/${params.username}`,
      params: {
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
      },
    })
      .catch(() => {
        throw new Error('get_error')
      })
  }
}
