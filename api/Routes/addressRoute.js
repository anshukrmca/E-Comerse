import express from 'express';
import { CreateNewAddress, DeleteAddressById, getAddressByAddressID, getAllAddressForUser, updateAddress } from '../controllers/addressController.js';

const router = express.Router();

router.post('/newAddesss', CreateNewAddress);
router.delete('/deleteAddress/:AddressId', DeleteAddressById);
router.get('/allAddressbyUser', getAllAddressForUser);
router.get('/AddressbyId/:AddressId', getAddressByAddressID);
router.put('/update', updateAddress);

export default router;