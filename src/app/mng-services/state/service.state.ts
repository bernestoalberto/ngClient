import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface State {
  id: number;
  availability: string;
  description: string;
  price: number;
  currency: string;
  sku: string;
  name: string;
  link: string;
  quantity: number;
  category: string;
}

export enum Availability {
  Up = 'UP',
  Down = 'DOWN',
  Sufficient = 'Sufficient',
}

const defaultServices = {
  id: 21,
  name: 'pixel buds',
  availability: 'UP',
  description: 'pixel buds',
  price: 160, currency: 'USD', created_at: '2019 - 09 - 04T04: 00: 00.000Z',
  sku: null,
  quantity: 0,
  category: 'NOTARY SIGNING AGENT',
  link: 'gbuds.jpg', service_id: 1
};

// Entity adapter
export const serviceAdapter = createEntityAdapter<State>();
export interface State extends EntityState<State> {
}

export const initialState = serviceAdapter.getInitialState(defaultServices);



// Default data / initial state



