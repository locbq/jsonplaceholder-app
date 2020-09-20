import axios from 'axios';

import { SERVICE_API } from '../service';

export const getUserList = (): Promise<any> => axios.get(`${SERVICE_API}/users`);

export const getUserDetail = (id?: number): Promise<any> => axios.get(`${SERVICE_API}/users/${id}`);
