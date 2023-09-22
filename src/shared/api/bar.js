import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend-loft.onrender.com/api/bar'
});

export const getAllBar = async () => {
    const {data: result} = await instance.get('');
    console.log(result);
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

