import axios from 'axios';

import { SERVICE_API } from '../service';

export const getCommentList = (postId?: number) => axios.get(`${SERVICE_API}/comments`, {
  params: {
    postId,
  },
});
