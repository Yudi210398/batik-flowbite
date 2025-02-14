class HttpError extends Error {
  public statusCode: number;
  constructor(public message: string, public errorCode: number) {
    super(message);
    this.statusCode = errorCode ?? 404;
  }
}

export default HttpError;
