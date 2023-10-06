import axios from "axios";

const instance = axios.create({
    baseURL:
     'https://backend-loft.onrender.com/api/bar'
    // 'http://localhost:3001/api/bar'
});

export const getAllBar = async () => {
    const {data: result} = await instance.get('');
    return result;
}

export const getProductBar = async (productId) => {
    const {data: result} = await instance.get(`/${productId}`);
    return result;
}

export const addBarProduct = async (data) => {
    const {data: result} = await instance.post('', data);
    console.log(result);
    return result;
}

export const deleteBarProduct = async () => {
    const {data: result} = await instance.get('');
    console.log(result);
    return result;
}

