import { ResponseError } from './responseError'

export interface MyError {
  response: { data: { message: ResponseError[] }; status: number }
}
