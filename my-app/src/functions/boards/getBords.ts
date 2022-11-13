import { request } from '../request';
import { Endpoints, IBoard, IRequestError, Methods } from '../request-types';

// getBoards может получить все доски или одну доску в зависимости от того, был ли передан id доски
export async function getBoards(token: string, id?: string): Promise<IBoard[] | IBoard | IRequestError> {
  const requestParams = {
    method: Methods.GET,
    endpoint: Endpoints.BOARDS,
    token,
    id,
  };
  return (await request(requestParams)) as IBoard[] | IBoard | IRequestError;
}
