import { request } from '../request';
import { Endpoints, IRequestError, ISignUpBody, IUser, Methods } from '../request-types';

export async function signUp(body: ISignUpBody): Promise<IUser | IRequestError> {
  const requestParams = {
    method: Methods.POST,
    endpoint: Endpoints.SIGNUP,
    body,
  };
  return (await request(requestParams)) as IUser | IRequestError;
}
