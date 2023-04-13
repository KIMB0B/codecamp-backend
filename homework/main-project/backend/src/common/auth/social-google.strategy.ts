import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { google } from 'googleapis';
import { differenceInYears } from 'date-fns';
import 'dotenv/config.js';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/login/google',
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/user.birthday.read',
      ],
    });
  }

  async validate(accessToken, refreshToken, profile) {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const people = google.people({
      version: 'v1',
      auth: auth,
    });

    const { data } = await people.people.get({
      resourceName: 'people/me',
      personFields: 'birthdays',
    });

    const birthdayData = data.birthdays?.find((b) => b.metadata.primary);

    const birthday = birthdayData
      ? new Date(
          `${birthdayData.date.year}-${birthdayData.date.month}-${birthdayData.date.day}`,
        )
      : null;

    const age = birthday ? differenceInYears(new Date(), birthday) + 1 : null;

    return {
      EMAIL: profile.emails[0].value,
      PASSWORD: profile.id,
      NAME: profile.displayName,
      AGE: age,
    };
  }
}
