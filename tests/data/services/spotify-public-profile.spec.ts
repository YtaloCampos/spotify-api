import {
  LoadUserAccountRepository,
  SaveUserAccountRepository,
} from '../../../src/data/interfaces/repositories/user-account'
import { LoadSpotifyUserApi } from '@/data/interfaces/apis'
import { SpotifyPublicProfileService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'

describe('SpotifyPublicProfileService', () => {
  let spotifyApi: MockProxy<LoadSpotifyUserApi>
  let userAccountRepository: MockProxy<
  LoadUserAccountRepository & SaveUserAccountRepository
  >
  let sut: SpotifyPublicProfileService

  beforeEach(() => {
    spotifyApi = mock()
    spotifyApi.loadUser.mockResolvedValue({
      display_name: 'any_display_name',
      external_urls: { spotify: 'any_external_url' },
      id: 'any_id',
    })
    userAccountRepository = mock()
    userAccountRepository.load.mockResolvedValue(undefined)
    sut = new SpotifyPublicProfileService(spotifyApi, userAccountRepository)
  })

  it('should to call spotify public profile with correct params', async () => {
    await sut.perform({
      username: 'any_username',
    })
    expect(spotifyApi.loadUser).toHaveBeenCalledWith({
      username: 'any_username',
    })
    expect(spotifyApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should to call LoadUserAccountRepository and returns data', async () => {
    await sut.perform({
      username: 'any_username',
    })

    expect(userAccountRepository.load).toHaveBeenCalledWith({
      spotifyId: 'any_id',
    })
    expect(userAccountRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should to create user when LoadUserAccountRepository returns undefined', async () => {
    await sut.perform({
      username: 'any_username',
    })

    expect(userAccountRepository.save).toHaveBeenCalledWith({
      username: 'any_display_name',
      publicProfile: 'any_external_url',
      spotifyId: 'any_id',
    })
    expect(userAccountRepository.save).toHaveBeenCalledTimes(1)
  })

  it('shoud to update user when LoadUserAccountRepository returns data', async () => {
    userAccountRepository.load.mockResolvedValueOnce({
      id: 'any_id',
      spotifyId: 'any_spotify_id',
      username: 'any_username',
      publicProfile: 'any_public_profile',
    })

    await sut.perform({
      username: 'any_username',
    })

    expect(userAccountRepository.save).toHaveBeenCalledWith({
      id: 'any_id',
      username: 'any_display_name',
      publicProfile: 'any_external_url',
      spotifyId: 'any_id',
    })
    expect(userAccountRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if LoadSpotifyUserApi throws', async () => {
    spotifyApi.loadUser.mockRejectedValueOnce(new Error('spotify_error'))

    const promise = sut.perform({
      username: 'any_username',
    })

    await expect(promise).rejects.toThrow(new Error('spotify_error'))
  })

  it('should rethrow if LoadUserAccountRepository throws', async () => {
    userAccountRepository.load.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut.perform({
      username: 'any_username',
    })

    await expect(promise).rejects.toThrow(new Error('load_error'))
  })

  it('should rethrow if SaveUserAccountRepository throws', async () => {
    userAccountRepository.save.mockRejectedValueOnce(new Error('save_error'))

    const promise = sut.perform({
      username: 'any_username',
    })

    await expect(promise).rejects.toThrow(new Error('save_error'))
  })
})
