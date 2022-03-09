// import { Strategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();
import pkg, { StrategyOptions } from "passport-jwt";
import passport from "passport";
const { Strategy, ExtractJwt } = pkg;
import User from "../models/user";
// import { IPassportOption } from "../interfaces/passport";

export default function () {
  // let opts: StrategyOptions = null;
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  // opts.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async function (_payload, done) {
        console.log("_payload", _payload);
        let uid;
        // if (_payload.user) {
        //   uid = _payload.user._id;
        // }

        if (_payload.id) {
          uid = _payload.id;
        }
        try {
          const user = await User.findOne({ _id: uid });

          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (err) {
          return done(err, false);
        }

        /* User.findOne({ _id: uid }, function (err, user) {
        if (err) {
          return done(err, false);
        } else {
          if (!user) {
            done(null, false);
          } else {
            done(null, user);
          }
        }
      }); */
      }
    )
  );
}
