import axios from 'axios';

export const getUserList = () => axios.get('https://jsonplaceholder.typicode.com/users');

export const getUserDetail = (id: number) => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
