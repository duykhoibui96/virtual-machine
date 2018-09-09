import { TOKEN, API_URL } from "../config";
import BPromise from "bluebird";
import request from "request";

const requestAsync = BPromise.promisify(request, { multiArgs: true });

class Api {
  constructor() {
    this._token = TOKEN;
    this._baseUrl = API_URL;
  }

  async send(url, method, data) {
    const [{ statusCode }, response] = await requestAsync({
      url: `${this._baseUrl}${url}`,
      method,
      json: true,
      body: data,
      headers: {
        Authorization: `Bearer ${this._token}`
      }
    });

    if (statusCode >= 300) {
      throw new Error(`Non-success response from API: ${statusCode}`);
    }

    return response;
  }
}

export default new Api();
