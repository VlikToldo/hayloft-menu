import baseInstance from './axiosInstance';

const instance = baseInstance;

export const getAllBar = async () => {
  const { data: result } = await instance.get('/bar');
  return result;
};

export const getProductBar = async productId => {
  const { data: result } = await instance.get(`/bar/${productId}`);
  return result;
};

export const addBarProduct = async data => {
  const { data: result } = await instance.post('/bar', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result;
};

export const updateBarProduct = async (productId, data) => {
  const { data: result } = await instance.put(`/bar/${productId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return result;
};

export const deleteBarProduct = async id => {
  const { data: result } = await instance.delete(`/bar/${id}`);
  return result;
};
