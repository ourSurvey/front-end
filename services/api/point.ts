import ApiClient from 'services/ApiClient';
const api = new ApiClient();

export const getMyPoint = async () => await api.get(`/point`);
