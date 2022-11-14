import { request } from '../request';
import { Endpoints, IColumn, IColumnBody, IRequestError, Methods } from '../request-types';

export async function updateColumn(
  token: string,
  body: IColumnBody,
  boardId: string,
  columnId: string
): Promise<IColumn | IRequestError> {
  const requestParams = {
    method: Methods.PUT,
    endpoint: `${Endpoints.BOARDS}/${boardId}${Endpoints.COLUMNS}/${columnId}`,
    token,
    body,
  };
  return (await request(requestParams)) as IColumn | IRequestError;
}
