import { request } from '../request';
import { Endpoints, IColumn, IColumnBody, IRequestError, Methods } from '../request-types';

export async function createColumn(
  token: string,
  body: IColumnBody,
  boardId: string
): Promise<IColumn | IRequestError> {
  const requestParams = {
    method: Methods.POST,
    endpoint: `${Endpoints.BOARDS}/${boardId}${Endpoints.COLUMNS}`,
    token,
    body,
  };
  return (await request(requestParams)) as IColumn | IRequestError;
}
