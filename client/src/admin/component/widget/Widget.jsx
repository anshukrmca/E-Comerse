import { MdKeyboardArrowUp, MdBalance } from 'react-icons/md';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { SiFuturelearn } from 'react-icons/si';

const Widget = () => {

  //temporary
  const amount = 103420;
  const diff = 35;

  const data = [
    {
      title: "PRODUCT",
      isMoney: false,
      link: "See all patients",
      icon: <AiOutlineUser size={25}  style={{padding:"5px", color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)",borderRadius:'50%' }} />
    },
    {
      title: "USERS",
      isMoney: false,
      link: "See all users",
      icon: <AiOutlineUser size={25}  style={{padding:"5px", color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)",borderRadius:'50%'  }} />
    }, {
      title: "ORDERS",
      isMoney: false,
      link: "View all orders",
      icon: <AiOutlineShoppingCart size={25}  style={{padding:"5px", backgroundColor: "rgba(218, 165, 32, 0.2)", color: "goldenrod",borderRadius:'50%'  }} />
    },
     {
      title: "APPOINTMENT",
      isMoney: false,
      link: "View all appointment",
      icon: <AiOutlineShoppingCart size={25}  style={{padding:"5px", backgroundColor: "rgba(218, 165, 32, 0.2)", color: "goldenrod", borderRadius:'50%' }} />
    }, {
      title: "BALANCE",
      isMoney: true,
      link: "See details",
      icon: <MdBalance size={25}  style={{padding:"5px", backgroundColor: "rgba(128, 0, 128, 0.2)", color: "purple",borderRadius:'50%'  }} />
    },
     {
      title: "EARNINGS",
      isMoney: true,
      link: "View net earnings",
      icon: <SiFuturelearn size={25}  style={{padding:"5px", backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" ,borderRadius:'50%' }} />
    }
  ]

  return (
    <>
      <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`p-3 flex justify-between cursor-pointer hover:h-150 transition duration-300 ease-in-out shadow-md border border-gray-300 rounded-md`}
          >
            <div className="flex flex-col justify-between">
              <span className="font-bold text-base text-gray-500">{item.title}</span>
              <span className="text-xl font-light">{item.isMoney && "$"} {amount}</span>
              <span className="text-[10px] underline cursor-pointer">{item.link}</span>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                <MdKeyboardArrowUp className="text-xl" />
                {diff} %
              </div>
              <div className="icon text-xl px-2 rounded-full self-end">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default Widget;

