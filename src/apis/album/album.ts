import axios from 'axios';

import { SERVICE_API } from '../service';

export const getAlbumList = () => axios.get(`${SERVICE_API}/albums`);

export const getAlbumDetail = (albumId?: number) => axios.get(`${SERVICE_API}/albums/${albumId}`);
