export interface TErrorFuncParams {
  from: string;
  errItself?: string;
}

export interface TError extends TErrorFuncParams {
  statusCode: number;
  name: string;
  msg: string;
}
