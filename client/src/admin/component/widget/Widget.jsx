import { MdKeyboardArrowUp, MdBalance } from 'react-icons/md';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { SiFuturelearn } from 'react-icons/si';
import { RiLuggageCartLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Widget = ({ DashoBoardData }) => {
 
  const diff = 35;

  const iconUser = <AiOutlineUser size={30} style={{ padding: "5px", color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)", borderRadius: '50%' }} />
  const iconProduct = <AiOutlineShoppingCart size={30} style={{ padding: "5px", backgroundColor: "rgba(218, 165, 32, 0.2)", color: "goldenrod", borderRadius: '50%' }} />
  const iconOrder = <RiLuggageCartLine size={30} style={{ padding: "5px", backgroundColor: "rgba(218, 165, 32, 0.2)", color: "green", borderRadius: '50%' }} />
  const iconEarning = <MdBalance size={30} style={{ padding: "5px", backgroundColor: "rgba(128, 0, 128, 0.2)", color: "purple", borderRadius: '50%' }} />

  const LinkUser = "/admin/user"
  const LinkProduct = "/admin/product"
  const LinkOrder = "/admin/order"
  const LinkEarning = "/admin/product"

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {DashoBoardData && DashoBoardData.map((item, index) => (
          <div
            key={index}
            className={`p-3 flex justify-between cursor-pointer hover:h-150 transition duration-300 ease-in-out shadow-md border border-gray-300 rounded-md`}
          >
            <div className="flex flex-col justify-between">
              <span className="font-bold text-base text-gray-500">{item.title}</span>
              <span className="text-xl font-light">{item.total}</span>
              <span className="text-[10px] underline cursor-pointer">
                <Link to={
                  item.title == "Product" ?
                    LinkProduct :
                    item.title == "User" ?
                      LinkUser :
                      item.title == "Order" ?
                        LinkOrder :
                        item.title == "Earning" ?
                          LinkEarning
                          : ""
                }>view all {item.title}</Link></span>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                <MdKeyboardArrowUp className="text-xl text-green-700" />
                {diff} %
              </div>
              <div className="icon text-xl px-2 rounded-full self-end">

                {item.title == "Product" ?
                  iconProduct :
                  item.title == "User" ?
                    iconUser :
                    item.title == "Order" ?
                      iconOrder :
                      item.title == "Earning" ?
                        iconEarning
                        : ""
                }

              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default Widget;

