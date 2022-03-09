import { JwtFromRequestFunction } from "passport-jwt";

export interface IPassportOption {
  jwtFromRequest: JwtFromRequestFunction;
  secretOrKey: string;
}
