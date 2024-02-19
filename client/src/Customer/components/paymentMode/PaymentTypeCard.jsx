import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const PaymentTypeCard = ({ tittle, icon,setpaymentMethod}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <div className='flex gap-3 mt-4 shadow-lg mb-2 p-3  items-center' style={{backgroundColor:`${colors.primary[400]}`}}>
        <input
          type="radio"
          name="paymentSubMode"
          onClick={(e) =>{setpaymentMethod(tittle)}}
          className='appearance-none cursor-pointer focus:outline-none border-2 border-gray-400 rounded-full w-4 h-4 checked:bg-[#34d399] checked:border-transparent'
        />
        <p className='text-[14px] font-semibold'>{tittle}</p>
        {icon}
      </div>
    </>
  )
}

export default PaymentTypeCard