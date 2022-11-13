import { request } from '../request';
import { Endpoints, IBoard, IBoardBody, IRequestError, Methods } from '../request-types';

export async function createBoard(token: string, body: IBoardBody): Promise<IBoard | IRequestError> {
  const requestParams = {
    method: Methods.POST,
    endpoint: Endpoints.BOARDS,
    token,
    body,
  };
  return (await request(requestParams)) as IBoard | IRequestError;
}
