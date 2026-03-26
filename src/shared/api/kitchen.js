import baseInstance from './axiosInstance';

const instance = baseInstance;

export const getAllKitchen = async () => {
  const { data: result } = await instance.get('/kitchen');
  return result;
};

export const getProductKitchen = async productId => {
  const { data: result } = await instance.get(`/kitchen/${productId}`);
  return result;
};

export const addKitchenProduct = async data => {
  const { data: result } = await instance.post('/kitchen', data);
  return result;
};

export const updateKitchenProduct = async (productId, data) => {
  const { data: result } = await instance.put(`/kitchen/${productId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result;
};

export const deleteKitchenProduct = async id => {
  const { data: result } = await instance.delete(`/kitchen/${id}`);
  return result;
};
