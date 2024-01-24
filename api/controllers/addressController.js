import Addresse from "../models/addressModel.js";
import User from "../models/userModel.js";
import { CreateAddress, findAddressById, findAddressByUserId } from "../service/addessServies.js";
import { getUserIdFromToken } from "../utils/JwtProvide.js";


export const CreateNewAddress = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const UserId = await getUserIdFromToken(token);
    const address = await CreateAddress({ UserId,...req.body });
    await User.findByIdAndUpdate(
      address.UserId,
      {
        $push: { Useraddress: address._id },
      },
      { new: true } // Use { new: true } to get the updated user document
    );
    res.status(200).json({ message: "Address successful Added !" });
  } catch (error) {
    // Handle errors
    next(error);
  }
};


// DeleteAddressById
export const DeleteAddressById = async (req, res, next) => {
  const { AddressId } = req.params;
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const UserId = await getUserIdFromToken(token);
    await Addresse.findByIdAndDelete(AddressId);
    await User.findByIdAndUpdate(
      UserId,
      {
        $pull: { Useraddress: AddressId },
      },
      { new: true }
    );
    res.status(200).json({ message: "Address successfully deleted!" });
  } catch (error) {
    // Handle errors
    next(error);
  }
};


// getAllAddressByAddressID
export const getAllAddressForUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    const UserId = await getUserIdFromToken(token);
    const address = await findAddressByUserId(UserId);
    res.status(200).json({ address });
  } catch (error) {
    next(error);
  }
};

// getAddressByAddressID
export const getAddressByAddressID = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const { AddressId } = req.params;

    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    else {
      const address = await findAddressById(AddressId);
      res.status(200).json({ address, message: "Address successfully retrieved!" });

    }
  } catch (error) {
    next(error);
  }
};




// update 
export const updateAddress = async (req, res, next) => {
  const { AddressId } = req.params;
  const token = req.cookies.token;
  try {

    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }
    const UserId = await getUserIdFromToken(token);
    const address = await findAddressById(AddressId);
    if (UserId == address.UserId && AddressId == address._id) {
      const updatedAddress = await Addresse.findOneAndUpdate(
        { _id: AddressId, UserId: UserId },
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({ updatedAddress, message: "Address Update Successfull !" });
    }

  } catch (error) {
    next(error);
  }
};