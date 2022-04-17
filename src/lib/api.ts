import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { camelizeKeys } from '@/lib/camelize';

const api = axios.create({ baseURL: 'http://localhost:3001' });

// Axios middleware レスポンスをcamelCaseに変換する
api.interceptors.response.use((response: AxiosResponse) => {
  if (response.data && response.headers['content-type'] === 'application/json; charset=utf-8') {
    response.data = camelizeKeys(response.data);
  }
  return response;
});

// Axios middleware リクエストをスネークケースに変換する
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig = { ...config };
  newConfig.url = `api/test/${config.url}`;
  // if (config.params) {
  //   newConfig.params = decamelizeKeys(config.params);
  // }
  // if (config.data) {
  //   newConfig.data = decamelizeKeys(config.data)
  // }
  return newConfig;
});

export default api;
