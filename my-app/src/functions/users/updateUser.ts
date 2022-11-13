import { request } from '../request';
import { Endpoints, IRequestError, ISignUpBody, IUser, Methods } from '../request-types';

export async function updateUser(token: string, body: ISignUpBody, id: string): Promise<IUser | IRequestError> {
  const requestParams = {
    method: Methods.PUT,
    endpoint: Endpoints.USERS,
    token,
    id,
    body,
  };
  return (await request(requestParams)) as IUser | IRequestError;
}
