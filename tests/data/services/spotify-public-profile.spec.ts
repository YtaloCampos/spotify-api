import { LoadSpotifyUser } from "@/data/interfaces";
import { SpotifyPublicProfileService } from "@/data/services";

class LoadSpotifyUserSpy implements LoadSpotifyUser {
  public username?: string;
  public result: undefined;

  async perform(
    params: LoadSpotifyUser.Params
  ): Promise<LoadSpotifyUser.Result> {
    this.username = params.username;
    return this.result;
  }
}

describe("SpotifyPublicProfileService", () => {
  it("should to call spotify public profile with correct params", async () => {
    const loadSpotifyUserApi = new LoadSpotifyUserSpy();
    const sut = new SpotifyPublicProfileService(loadSpotifyUserApi);

    await sut.perform({
      username: "any_username",
    });

    expect(loadSpotifyUserApi.username).toBe("any_username");
  });

  it("should return undefined when loadSpotifyUserApi returns undefined", async () => {
    const loadSpotifyUserApi = new LoadSpotifyUserSpy();
    loadSpotifyUserApi.result = undefined;
    const sut = new SpotifyPublicProfileService(loadSpotifyUserApi);

    const result = await sut.perform({
      username: "any_username",
    });

    expect(result).toBe(undefined);
  });
});
