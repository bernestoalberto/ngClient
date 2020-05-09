import { Action } from '@ngrx/store';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserEffects } from './index';
import { UserActions } from '../actions';

describe('UserEffects', () => {
  let effects: UserEffects;
  const eventsMap: { [key: string]: any } = {};

  beforeAll(() => {
    document.addEventListener = jest.fn((event, cb) => {
      eventsMap[event] = cb;
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserEffects],
    });

    effects = TesBed.inject(UserEffects);
  });

  describe('idle$', () => {
    it(
      'should trigger idleTimeout action after 5 minutes',
      fakeAsync(() => {
        let action: Action | undefined;
        effects.idle$.subscribe(res => (action = res));

        // Initial action to trigger the effect
        const key = 'click';
        eventsMap[key]();

        tick(2 * 60 * 1000);
        expect(action).toBeUndefined();

        tick(3 * 60 * 1000);
        expect(action).toBeDefined();
        expect(action.type).toBe(UserActions.idleTimeout.type);
      })
    );

    it(
      'should reset timeout on user activity',
      fakeAsync(() => {
        let action: Action | undefined;
        effects.idle$.subscribe(res => (action = res));

        // Initial action to trigger the effect
        let key = 'keydown';
        eventsMap[key]();

        tick(4 * 60 * 1000);
        key = 'mousemove';
        eventsMap[key]();

        tick(4 * 60 * 1000);
        expect(action).toBeUndefined();

        tick(1 * 60 * 1000);
        expect(action).toBeDefined();
        expect(action.type).toBe(UserActions.idleTimeout.type);
      })
    );
  });
});
