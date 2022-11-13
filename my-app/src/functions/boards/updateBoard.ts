import { request } from '../request';
import { Endpoints, IBoard, IBoardBody, IRequestError, Methods } from '../request-types';

export async function updateBoard(token: string, body: IBoardBody, id: string): Promise<IBoard | IRequestError> {
  const requestParams = {
    method: Methods.PUT,
    endpoint: Endpoints.BOARDS,
    token,
    id,
    body,
  };
  return (await request(requestParams)) as IBoard | IRequestError;
}
