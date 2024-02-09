import Razorpay from 'razorpay'
import dotenv from 'dotenv';
dotenv.config();


// fst acc 
// const APIKEY="rzp_test_7SlKATUBkPTt8I"
// const APISECRET="4oTPFo1SBeS3wBAKcvglk8zA"

export const razorpay = new Razorpay({
  key_id: process.env.APIKEY,
  key_secret: process.env.APISECRET,
});