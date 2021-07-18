import axios, { AxiosRequestConfig } from 'axios';
import { Currencie } from '../types/ocurrencie';

const config: AxiosRequestConfig = {
  headers: {
    'app_id': `${process.env.APP_ID}`,
  },
}

export class OpenExchangeService {

  async getCurrencie(): Promise<string[]> {
    try {
      const currencies: Currencie[] = (await axios.get('https://openexchangerates.org/api/currencies.json', config)).data;
      const keys: string[] = Object.keys(currencies);
      return keys;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getConversion(from: string, to: string, amount: string): Promise<number> {
    try {
      const value: number = (await axios.get(`https://open.er-api.com/v6/latest/${from}`)).data.rates[to];
      const result = Number(amount) * value;
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}