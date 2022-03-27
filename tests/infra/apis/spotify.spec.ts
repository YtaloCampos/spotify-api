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
    sut = new SpotifyApi(httpClient, clientId, clientSecret)
  })

  it('should to get short-lived token with correct params', async () => {
    await sut.loadUser({ username: 'any_username' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
      form: {
        grant_type: 'client_credentials',
      },
      json: true,
    })
  })
})
