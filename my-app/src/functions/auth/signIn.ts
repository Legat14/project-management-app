import { request } from '../request';
import { Endpoints, IRequestError, ISignInBody, IToken, Methods } from '../request-types';

export async function signIn(body: ISignInBody): Promise<IToken | IRequestError> {
  const requestParams = {
    method: Methods.POST,
    endpoint: Endpoints.SIGNIN,
    body,
  };
  return (await request(requestParams)) as IToken | IRequestError;
}
