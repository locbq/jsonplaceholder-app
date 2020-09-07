import axios from 'axios';

import { SERVICE_API } from '../service';

export const getPostList = () => axios.get(`${SERVICE_API}/posts`);
