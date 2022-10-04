import ApiClient from 'services/ApiClient';
const api = new ApiClient();

export const getMyPoint = () => api.get(`/point`);
