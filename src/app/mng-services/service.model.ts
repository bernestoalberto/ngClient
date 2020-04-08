export class Service {
  id: number;
  name: string;
  description: string;
  price: number;
  link?: string;
  currency: string;
  category: string;
  sku?: string;

}

export interface ServiceResponse {
  response: {
    command: string,
    fields: {}[];
    rows: [];
  };
}
