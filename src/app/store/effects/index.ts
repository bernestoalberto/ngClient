import { UserEffects } from './user.effects';
import { RouterEffects } from './router.effects';
import { AppEffects } from './app.effects';
import {  AuthEffects } from './auth.effects';

export   const effects: any[] = [ AuthEffects, AppEffects, RouterEffects, UserEffects ];

// export * from './';
