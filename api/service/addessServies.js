import Addresse from "../models/addressModel.js"


export const CreateAddress = async(AddressDate)=>{
    try {
        const NewAddress = await Addresse.create(AddressDate);
        return NewAddress;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const findAddressByUserId =async(UserId)=>{
    try {
        const address = await Addresse.find({UserId});
        if(!address){
            throw new Error("Address not found for this user",UserId);
        }
        return address;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const findAddressById =async(AddressId)=>{
    try {
        const address = await Addresse.findById(AddressId);
        if(!address){
            throw new Error("Address not found ",AddressId);
        }
        return address;
    } catch (error) {
        throw new Error(error.message)
    }
}


export const getAddressByIdAndUserId = async (userId, addressId) => {
    try {
      const address = await Addresse.findOne({ _id: addressId, UserId: userId });
      if (!address) {
        throw new Error("Address not found or doesn't belong to the user");
      }
      return address;
    } catch (error) {
      throw error;
    }
  };