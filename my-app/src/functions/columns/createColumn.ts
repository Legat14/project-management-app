import { request } from '../request';
import { Endpoints, IBoard, IColumnBody, IRequestError, Methods } from '../request-types';

export async function createColumn(token: string, body: IColumnBody, boardId: string): Promise<IBoard | IRequestError> {
  const requestParams = {
    method: Methods.POST,
    endpoint: `${Endpoints.BOARDS}/${boardId}${Endpoints.COLUMNS}`,
    token,
    body,
  };
  return (await request(requestParams)) as IBoard | IRequestError;
}
