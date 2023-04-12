import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { google } from 'googleapis';
import 'dotenv/config.js';
import { differenceInYears } from 'date-fns';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_PASSWD,
      callbackURL: 'http://localhost:3000/login/google',
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
      email: profile.emails[0].value,
      password: profile.id,
      name: profile.displayName,
      age: age,
    };
  }
}
