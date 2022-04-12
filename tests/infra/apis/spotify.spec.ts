import { SpotifyApi } from '@/infra/apis/spotify'
import { HttpGetClient } from '@/infra/http/client'
import { mock, MockProxy } from 'jest-mock-extended'

describe('SpotifyApi', () => {
  let clientId: string
  let clientSecret: string
  let httpClient: MockProxy<HttpGetClient>
  let sut: SpotifyApi

  beforeAll(() => {
    clientId = 'any_client_id'
    clientSecret = 'any_client_secret'
    httpClient = mock()
  })

  beforeEach(() => {
    httpClient.get.mockResolvedValue({
      display_name: 'any_display_name',
      external_urls: {
        spotify: 'any_spotify_external_urls',
      },
      id: 'any_id',
    })
    sut = new SpotifyApi(httpClient, clientId, clientSecret)
  })

  it('should to get short-lived token with correct params', async () => {
    await sut.loadUser({ username: 'any_username' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://accounts.spotify.com/api/token/any_username',
      params: {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(clientId + ':' + clientSecret).toString('base64'),
        },
        form: {
          grant_type: 'client_credentials',
        },
        json: true,
      },
    })
  })

  it('shoud to return spotify user', async () => {
    const spotifyUser = await sut.loadUser({ username: 'any_username' })

    expect(spotifyUser).toEqual({
      display_name: 'any_display_name',
      external_urls: {
        spotify: 'any_spotify_external_urls',
      },
      id: 'any_id',
    })
  })

  it('should to rethrow if HttpGetClient throws', async () => {
    httpClient.get.mockRejectedValueOnce(new Error('get_error'))

    const promise = sut.loadUser({ username: 'any_username' })

    await expect(promise).rejects.toThrow(new Error('get_error'))
  })
})
