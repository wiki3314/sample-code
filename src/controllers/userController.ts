import User from "../models/user";
import { ILogin } from "../interfaces/login";
import { IRegister } from "../interfaces/register";

import { generateAccessToken } from "../middlewares/token";

export default {
  /*
   * Implement the register functionality along with its route.
   * The function should throw an error `email required` if
   * email is not passed to it. The return value should be the user object
   * that has been registered
   */
  async registerUser(userInfo: IRegister) {
    const {
      email,
      password,
      gender,
      phoneNumber,
      birthdate,
      username,
      title,
      picture,
      location,
    } = userInfo;
    const user = await User.findOne({ email });
    console.log("user exits: ", user);

    if (user) {
      console.log("user exits: ", user);
      return null;
    }
    const newUser = await User.create({
      email,
      password,
      gender,
      phoneNumber,
      birthdate,
      username,
      title,
      picture,
      location,
    });
    console.log("user not exits: ", newUser);

    return newUser;
  },

  /*
    Implement the login functionality along with its route. It should return a
    jwt token as well as the information of user who logged in.
  */

  async login(loginInfo: ILogin) {
    // Write your logic here
    const { email, password } = loginInfo;
    const user = await User.findOne({ email, password });
    console.log("user: ", user);
    if (!user) {
      console.log("user does not exists");
      return null;
    } else {
      let time = 60 * 60 * 24;
      user.token = await generateAccessToken(user, time);
      return user;
    }
  },

  /* Return the db of birth of all users
   *  this function should return an array containing
   *  date of birth of the users in db
   * Example: [1234555, 456789,56767890]
   */
  async getAllUsersBirthday() {
    //your logic here
    const users = await User.find({}, "birthdate");
    const birthday = await users.map((user) => user.birthdate);
    return birthday;
  },

  /* Complete the function below that soft deletes (mark delete flag as true)
   * all the female users. Note: This function should also return
   *  all the female users that were deleted
   */

  async softDeleteFemaleUsers() {
    // Your logic here
    const users = await User.updateMany(
      { gender: "female" },
      { $set: { isDeleted: true } },
      { new: true }
    );
    const females = await User.find({ gender: "female", isDeleted: true });
    return females;
  },

  /* Given a target string, check which two strings 
  in a given array combine to form the target string. 
  Return the index of those two strings with in a sorted array. Return 0 in case of edge cases;
  */
  async matchFinder(target: string, seedArray: []) {
    //Your logic here
    const indexArr = [];
    let first;
    let second;
    for (let i = 0; i < seedArray.length; i++) {
      first = seedArray[i];
      for (let j = i + 1; j < seedArray.length; j++) {
        second = seedArray[j];
        if (target === `${first}${second}`) {
          indexArr.push(i);
          indexArr.push(j);
        }
      }
    }
    if (indexArr.length === 0) {
      return 0;
    } else {
      return indexArr;
    }
  },

  /* Given the data in students array, calculate the age of the students in days
   * Your code shoud return an array of objects with name as key and age in days as value
   * Example:
   * [{"fayaz": 12345, "kaleem": 7543}]
   */
  async birthYear() {
    const students = [
      {
        name: "Ali",
        dateOfBirth: "March 6, 1990",
      },
      {
        name: "Usman",
        dateOfBirth: "August 4, 2004",
      },
      {
        name: "Zoya",
        dateOfBirth: "February 1, 1980",
      },
    ];

    // Your logic here
    const studentAges = await students.map((student) => {
      let today: string | Date = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = `${mm}/${dd}/${yyyy}`;
      let date1 = new Date(student.dateOfBirth);
      let date2 = new Date(today);

      let time = date2.getTime() - date1.getTime();
      let days = time / (1000 * 3600 * 24);
      return {
        [student.name]: days,
      };
    });
    return studentAges;
  },
};
