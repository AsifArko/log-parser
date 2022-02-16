interface ErrorLog {
  timestamp: number;
  loglevel: string;
  transactionId: string;
  err: string;
}
export default ErrorLog;
