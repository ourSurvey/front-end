import axios, { type AxiosRequestConfig } from 'axios';
import TokenProvider from 'services/TokenProvider';

class ApiClient {
  #instance;
  constructor() {
    this.#instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API}/api`,
    });
  }

  requsetConfig(options: any = {}) {
    return TokenProvider.has('accessToken')
      ? {
          headers: {
            ...options,
            Authorization: `Bearer ${TokenProvider.get('accessToken')}`,
          },
        }
      : options.customHeader;
  }

  async get(url: string, option?: AxiosRequestConfig) {
    const { data } = await this.#instance.get(url, this.requsetConfig(option));

    return data;
  }

  async post(url: string, data: any, option?: AxiosRequestConfig) {
    return await this.#instance.post(url, data, this.requsetConfig(option));
  }

  async put(url: string, data: any, option?: AxiosRequestConfig) {
    return await this.#instance.put(url, data, this.requsetConfig(option));
  }

  async delete(url: string, option?: AxiosRequestConfig) {
    return await this.#instance.delete(url, this.requsetConfig(option));
  }
}

export default ApiClient;
