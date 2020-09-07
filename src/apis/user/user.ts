import axios from 'axios';

import { SERVICE_API } from '../service';

export const getUserList = () => axios.get(`${SERVICE_API}/users`);

export const getUserDetail = (id: number) => axios.get(`${SERVICE_API}/users/${id}`);
