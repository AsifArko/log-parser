import User from './User';
import Meta from './Meta';

export default interface Log {
  timestamp: string;
  loglevel: string;
  meta: Meta;
}
