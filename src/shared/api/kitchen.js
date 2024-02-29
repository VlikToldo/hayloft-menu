import axios from 'axios';

const instance = axios.create({
  baseURL:
    //  'http://localhost:3001/api/kitchen'
    'https://backend-loft.onrender.com/api/kitchen',
});

export const getAllKitchen = async () => {
  const { data: result } = await instance.get('');
  console.log(result);
  return result;
};

export const getProductKitchen = async productId => {
  const { data: result } = await instance.get(`/${productId}`);
  return result;
};

export const addKitchenProduct = async data => {
  const { data: result } = await instance.post('/', data);
  console.log(result);
  return result;
};

export const deleteKitchenProduct = async id => {
  const { data: result } = await instance.delete(id);
  return result;
};
