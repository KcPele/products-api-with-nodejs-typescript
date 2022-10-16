
require('dotenv').config();
import { Model, Schema, HydratedDocument, model } from 'mongoose';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

const privateKey = "change"

export interface IUser {
  email: string;
  password: string;
}

export interface IUserCreated extends IUser {
    token: string
}

interface UserModel extends Model<IUserCreated> {
  createNewUser(email: string, password: string): Promise<HydratedDocument<IUserCreated>> | {error: string};
  loginUser(email: string, password: string): Promise<HydratedDocument<IUserCreated>> |{error: string};
}

const schema = new Schema<IUser, UserModel>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

schema.static('createNewUser', async function createNewUser(email: string, password: string) {
    //were to use bycript an jsonwebtokek
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    try {
      
      const user  = await User.create({ email, password: hashPassword });
      const token = jwt.sign({id: user._id}, "privateKey", {expiresIn:  (60 * 60) * 48})
      return  {...user, token }
    } catch (error) {
      return {error: "email already taken"}
    }
});

schema.static('loginUser', async function loginUser(email: string, password: string) {
    //were to use bycript an jsonwebtokek
  const user  = await User.findOne({ email })
  if(!user) {
    return {error: "Wrong credentials please try again"}
  } else {
    const comparedPass = await bcrypt.compare(password, user.password)
    if(!comparedPass){
      return {error: "wrong credentials, please try again"}
    } else {
      
      const token = jwt.sign({id: user._id}, privateKey, {expiresIn:  (60 * 60) * 48})
      return  {...user, token }
    }
    
  }
});


const User =  model<IUser, UserModel>('User', schema);

export default User


