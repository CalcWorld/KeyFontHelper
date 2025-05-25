export class Response_ {
  static html(data) {
    return new Response(data, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
      },
    });
  }

  static json(data) {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    return new Response(data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  }

  static jsonSuccess(data) {
    return this.json({
      code: 'success',
      ...data
    });
  }

  static jsonError(data) {
    return this.json({
      code: 'error',
      ...data
    });
  }
}
