import { HttpGetClient } from './client'

import axios from 'axios'

export class AxiosHttpClient implements HttpGetClient {
  async get(args: HttpGetClient.Params): Promise<any> {
    const result = await axios
      .get(args.url, { params: args.params })
      .catch(() => {
        throw new Error('http_error')
      })
    return result.data
  }
}
