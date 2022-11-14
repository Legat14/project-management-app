import { request } from '../request';
import { Endpoints, IColumn, IColumnsOrder, IRequestError, Methods } from '../request-types';

export async function updateColumnsOrder(
  token: string,
  body: IColumnsOrder[],
): Promise<IColumn | IRequestError> {
  const requestParams = {
    method: Methods.PATCH,
    endpoint: Endpoints.COLUMNS_SET,
    token,
    body,
  };
  return (await request(requestParams)) as IColumn | IRequestError;
}
