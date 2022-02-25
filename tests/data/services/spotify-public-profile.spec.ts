import { SpotifyPublicProfile } from "@/domain/features";

class SpotifyPublicProfileService {
  constructor(private readonly loadSpotifyUser: LoadSpotifyUser) {}

  async perform(params: SpotifyPublicProfile.Params): Promise<void> {
    await this.loadSpotifyUser.perform({ username: params.username });
    return undefined;
  }
}

interface LoadSpotifyUser {
  perform: (params: LoadSpotifyUser.Params) => Promise<void>;
}

namespace LoadSpotifyUser {
  export type Params = {
    username: string;
  };

  export type Result = undefined;
}

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
  it("Should to call spotify public profile with correct params", async () => {
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
