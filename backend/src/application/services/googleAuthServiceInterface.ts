import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import configKeys from '../../config';

import passport from 'passport';

interface GoogleAuthService {
  authenticate(): void;
  // Add any other methods or properties required by the service
}

export const googleAuthServiceInterface: GoogleAuthService = {
  authenticate: () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: configKeys.GOOGLE_CLOUD_ID,
          clientSecret: configKeys.GOOGLE_KEY_SECRET,
          callbackURL: '/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
          done(null, profile);
        }
      )
    );
  },
};

export type GoogleAuthServiceInterface = typeof googleAuthServiceInterface;
