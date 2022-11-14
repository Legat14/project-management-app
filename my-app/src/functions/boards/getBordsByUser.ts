import { request } from '../request';
import { Endpoints, IBoard, IRequestError, Methods } from '../request-types';

// getBordsByUser может получить все доски, в которых упомянут user (владелец или участник). Нужно передать id пользователя.
export async function getBordsByUser(token: string, userId: string): Promise<IBoard[] | IRequestError> {
  const requestParams = {
    method: Methods.GET,
    endpoint: Endpoints.BOARDS_SET,
    token,
    id: userId,
  };
  return (await request(requestParams)) as IBoard[] | IRequestError;
}
