import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend-loft.onrender.com/api/bar'
});

export const getAllBar = async () => {
    const {data} = await instance.get('');
    console.log(data);
    return data;
}