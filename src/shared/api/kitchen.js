import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend-loft.onrender.com/api/kitchen'
});

export const getAllKitchen = async () => {
    const {data: result} = await instance.get('');
    console.log(result);
    return result;
}

export const addKitchenProduct = async (data) => {
    const {data: result} = await instance.post('', data);
    console.log(result);
    return result;
}

export const deleteKitchenProduct = async () => {
    const {data: result} = await instance.get('');
    console.log(result);
    return result;
}