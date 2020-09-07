import axios from 'axios';

import { SERVICE_API } from '../service';

export const getPostList = (userId?: number) => axios.get(`${SERVICE_API}/posts`, {
  params: {
    userId,
  },
});
