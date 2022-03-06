import {
  CreateUserRepository,
  LoadUserRepository,
  UpdateUserRepository,
} from "./../../../src/data/interfaces/repositories/user";
import { LoadUserApi } from "@/data/interfaces/apis";
import { SpotifyPublicProfileService } from "@/data/services";
import { mock, MockProxy } from "jest-mock-extended";

describe("SpotifyPublicProfileService", () => {
  let loadSpotifyUser: MockProxy<LoadUserApi>;
  let userRepository: MockProxy<LoadUserRepository & CreateUserRepository & UpdateUserRepository>;
  let sut: SpotifyPublicProfileService;

  beforeEach(() => {
    loadSpotifyUser = mock();
    loadSpotifyUser.perform.mockResolvedValue({
      display_name: "any_display_name",
      external_urls: { spotify: "any_external_url" },
      id: "any_id",
    });
    userRepository = mock();
    userRepository.load.mockResolvedValue(undefined);
    sut = new SpotifyPublicProfileService(loadSpotifyUser, userRepository);
  });

  it("should to call spotify public profile with correct params", async () => {
    await sut.perform({
      username: "any_username",
    });
    expect(loadSpotifyUser.perform).toHaveBeenCalledWith({
      username: "any_username",
    });
    expect(loadSpotifyUser.perform).toHaveBeenCalledTimes(1);
  });

  it("should return undefined when loadSpotifyUser returns undefined", async () => {
    const result = await sut.perform({
      username: "any_username",
    });
    expect(result).toBe(undefined);
  });

  it("should to call LoadUserRepository and returns data", async () => {
    await sut.perform({
      username: "any_username",
    });

    expect(userRepository.load).toHaveBeenCalledWith({
      spotifyId: "any_id",
    });
    expect(userRepository.load).toHaveBeenCalledTimes(1);
  });

  it("should to call CreateUserRepository when LoadUserRepository returns undefined", async () => {
    await sut.perform({
      username: "any_username",
    });

    expect(userRepository.create).toHaveBeenCalledWith({
      username: "any_display_name",
      publicProfile: "any_external_url",
      spotifyId: "any_id",
    });
    expect(userRepository.create).toHaveBeenCalledTimes(1);
  });

  it("shoud to call UpdateUserRepository when LoadUserRepository returns data", async () => {
    userRepository.load.mockResolvedValueOnce({
      username: "any_username",
      publicProfile: "any_public_profile",
    })

    await sut.perform({
      username: "any_username",
    });

    expect(userRepository.update).toHaveBeenCalledWith({
      username: "any_display_name",
      publicProfile: "any_external_url",
      spotifyId: "any_id",
    });
    expect(userRepository.update).toHaveBeenCalledTimes(1);
  })
});
