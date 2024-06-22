import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { Registration } from './entities/register';
import databaseconnection from './datasource/datasource'; 
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_SECRET_ID!,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile: Profile, done) => {
    try {
      if (!profile.emails || !profile.emails.length) {
        return done(new Error("No email found in the profile"));
      }

      const email = profile.emails[0].value;
      const registrationRepo = databaseconnection.getRepository(Registration);
      let user = await registrationRepo.findOne({ where: { email: email } });

      if (!user) {
        user = new Registration();
        user.firstname = profile.name?.givenName || "";
        user.lastname = profile.name?.familyName || "";
        user.email = email;
        user.password = "password@1";
        user.phonenumber = ""; 
        user.dateofbirth = ""; 
        user.country = "";
        user = await registrationRepo.save(user);
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const registrationRepo = databaseconnection.getRepository(Registration);
    const user = await registrationRepo.findOne({ where: { id: id } });
    done(null, user || false);
  } catch (err) {
    done(err, null);
  }
});
