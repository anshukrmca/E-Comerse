import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

export const createUser = async (userData) => {
    try {
        let { name, email, password } = userData;

        // Check if the user already exists
        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            throw new Error("User already exist with is email", email)
        }
        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const user = await User.create({ name, email, password: hashedPassword })
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
} 

export const findUserById = async(userId)=>{
   try {
     const user = await User.findById({_id:userId})
     console.log("from service",user)
     if (!user) {
        throw new Error("User not found with id :",userId)
    }
    return user;
   } catch (error) {
    throw new Error(error.message);
   }
}

export const findUserByEmail = async(email)=>{
    try {
      const user = await User.findOne({email})
      if (!user) {
         throw new Error("User not found with with :",email)
     }
     return user;
    } catch (error) {
     throw new Error(error.message);
    }
 }

 export const getallUser = async()=>{
    try {
      const user = User.find()
      return user;
    } catch (error) {
     throw new Error(error.message);
    }
 }

