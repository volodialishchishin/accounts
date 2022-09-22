export class HTTPError extends Error {
  statusCode:number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }

  static badRequest() {
    return new HTTPError(400, 'badRequest');
  }

  static internal() {
    return new HTTPError(500, 'internal');
  }

  static forbidden() {
    return new HTTPError(403, 'authorization error');
  }

  static NoName() {
    return new HTTPError(421, 'No name');
  }

  static NoAccounts() {
    return new HTTPError(404, 'No accounts');
  }
}
