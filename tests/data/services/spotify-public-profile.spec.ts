import { LoadUserRepository } from "./../../../src/data/interfaces/repositories/user";
import { LoadUserApi } from "@/data/interfaces/apis";
import { SpotifyPublicProfileService } from "@/data/services";
import { mock, MockProxy } from "jest-mock-extended";

describe("SpotifyPublicProfileService", () => {
  let loadSpotifyUser: MockProxy<LoadUserApi>;
  let loadUserRepository: MockProxy<LoadUserRepository>;
  let sut: SpotifyPublicProfileService;

  beforeEach(() => {
    loadSpotifyUser = mock();
    loadSpotifyUser.perform.mockResolvedValue({
      display_name: "any_display_name",
      external_urls: { spotify: "any_external_url" },
      id: "any_id",
    });
    loadUserRepository = mock();
    sut = new SpotifyPublicProfileService(loadSpotifyUser, loadUserRepository);
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

    expect(loadUserRepository.perform).toHaveBeenCalledWith({
      spotifyId: "any_id",
    });
    expect(loadUserRepository.perform).toHaveBeenCalledTimes(1);
  });
});
