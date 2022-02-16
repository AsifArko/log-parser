import User from './User';

export default interface Meta {
  transactionId: string;
  details: string;
  user?: User;
  code?: number;
  err?: string;
}
