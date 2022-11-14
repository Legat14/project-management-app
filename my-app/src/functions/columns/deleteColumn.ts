import { request } from '../request';
import { Endpoints, IColumn, IRequestError, Methods } from '../request-types';

export async function deleteColumn(token: string, boardId: string, columnId: string): Promise<IColumn | IRequestError> {
  const requestParams = {
    method: Methods.DELETE,
    endpoint: `${Endpoints.BOARDS}/${boardId}${Endpoints.COLUMNS}/${columnId}`,
    token,
  };
  return (await request(requestParams)) as IColumn | IRequestError;
}
