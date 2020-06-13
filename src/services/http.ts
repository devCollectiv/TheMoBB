import axios, {AxiosResponse} from 'axios'

const post = async (path: string, data?: any, params?: any): Promise<AxiosResponse> =>
  await axios.post(path, data, params)

const put = async (path: string, data?: any, params?: any): Promise<AxiosResponse> =>
    await axios.put(path, data, params)

const get = async (path: string, params?: any): Promise<AxiosResponse> =>
  await axios.get(path, params)

export default {post, put, get}