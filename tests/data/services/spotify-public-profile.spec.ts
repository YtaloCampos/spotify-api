import { LoadSpotifyUser } from "@/data/interfaces";
import { SpotifyPublicProfileService } from "@/data/services";
import { mock } from "jest-mock-extended";

describe("SpotifyPublicProfileService", () => {
  it("should to call spotify public profile with correct params", async () => {
    const loadSpotifyUser = mock<LoadSpotifyUser>();
    const sut = new SpotifyPublicProfileService(loadSpotifyUser);
    await sut.perform({
      username: "any_username",
    });
    expect(loadSpotifyUser.perform).toHaveBeenCalledWith({
      username: "any_username",
    });
    expect(loadSpotifyUser.perform).toHaveBeenCalledTimes(1);
  });

  it("should return undefined when loadSpotifyUser returns undefined", async () => {
    const loadSpotifyUser = mock<LoadSpotifyUser>();
    loadSpotifyUser.perform.mockResolvedValueOnce(undefined);
    const sut = new SpotifyPublicProfileService(loadSpotifyUser);
    const result = await sut.perform({
      username: "any_username",
    });
    expect(result).toBe(undefined);
  });
});
