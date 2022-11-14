import { request } from '../request';
import { Endpoints, IColumn, IRequestError, Methods } from '../request-types';

// getColumns может получить все колонки доски или одну колонку в зависимости от того, был ли передан id колонки
export async function getColumns(
  token: string,
  boardId: string,
  columnId?: string
): Promise<IColumn[] | IColumn | IRequestError> {
  let endpoint = `${Endpoints.BOARDS}/${boardId}${Endpoints.COLUMNS}`;
  if (columnId) {
    endpoint += `/${columnId}`;
  }
  const requestParams = {
    method: Methods.GET,
    endpoint,
    token,
  };
  return (await request(requestParams)) as IColumn[] | IColumn | IRequestError;
}
