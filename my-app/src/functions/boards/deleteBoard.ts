import { request } from '../request';
import { Endpoints, IBoard, IRequestError, Methods } from '../request-types';

export async function deleteBoard(token: string, id: string): Promise<IBoard | IRequestError> {
  const requestParams = {
    method: Methods.DELETE,
    endpoint: Endpoints.BOARDS,
    token,
    id,
  };
  return (await request(requestParams)) as IBoard | IRequestError;
}
