
const PaymentTypeCard = ({ tittle, icon,setpaymentMethod}) => {
  return (
    <>
      <div className='flex gap-3 mt-4 bg-white shadow-lg mb-2 p-3 dark:bg-gray-800 items-center'>
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