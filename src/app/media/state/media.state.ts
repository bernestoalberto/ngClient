import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface State {
  id: number;
  name: string;
  description: string;
  path: string;
  serviceId: number;
}

const defaultMedia = {
  id: 3,
  name: 'pixel buds',
  description: 'pixel buds from Google',
  path: '/uploads/pixel_buds.jpg',
  serviceId: 21
};

// Entity adapter
export const mediaAdapter = createEntityAdapter<State>();
export interface State extends EntityState<State> { }

export const initialState = mediaAdapter.getInitialState(defaultMedia);





// Default data / initial state



