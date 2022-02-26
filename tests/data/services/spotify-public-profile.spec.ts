import { LoadSpotifyUser } from "@/data/interfaces";
import { SpotifyPublicProfileService } from "@/data/services";
import { mock, MockProxy } from "jest-mock-extended";

describe("SpotifyPublicProfileService", () => {
  let loadSpotifyUser: MockProxy<LoadSpotifyUser>;
  let sut: SpotifyPublicProfileService;

  beforeEach(() => {
    loadSpotifyUser = mock();
    sut = new SpotifyPublicProfileService(loadSpotifyUser);
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
    const sut = new SpotifyPublicProfileService(loadSpotifyUser);
    const result = await sut.perform({
      username: "any_username",
    });
    expect(result).toBe(undefined);
  });
});
