import axios from 'axios';

import { SERVICE_API } from '../service';

export const getPhotoByAlbum = (albumId?: number): Promise<any> => axios.get(`${SERVICE_API}/photos`, {
  params: {
    albumId,
  },
});
