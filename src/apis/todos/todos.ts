import axios from 'axios';

import { TodosListRequest } from 'types/todos/Todo';
import { SERVICE_API } from '../service';

export const getTodosList = (params?: TodosListRequest): Promise<any> => axios.get(`${SERVICE_API}/todos`, {
  params: {
    ...params,
  },
});
