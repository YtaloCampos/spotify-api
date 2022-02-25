import { SpotifyPublicProfile } from "@/domain/features";

class SpotifyPublicProfileService {
  constructor(private readonly loadSpotifyUser: LoadSpotifyUser) {}

  async perform(params: SpotifyPublicProfile.Params): Promise<void> {
    await this.loadSpotifyUser.perform({ username: params.username });
  }
}

interface LoadSpotifyUser {
  perform: (params: LoadSpotifyUser.Params) => Promise<void>;
}

namespace LoadSpotifyUser {
  export type Params = {
    username: string;
  };
}

class LoadSpotifyUserSpy implements LoadSpotifyUser {
  public username?: string;

  async perform(params: LoadSpotifyUser.Params): Promise<void> {
    this.username = params.username;
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
});
