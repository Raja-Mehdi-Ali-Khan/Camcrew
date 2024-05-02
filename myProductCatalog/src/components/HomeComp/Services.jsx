import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

const Service = () => {
  const services = [
    {
      icon: <TbTruckDelivery />,
      title: "Super fast and free delivery.",
    },
    {
      icon: <MdSecurity className="icon" />,
      title: "Non-contact Service .",
    },
    {
      icon: <GiReceiveMoney className="icon" />,
      title: "Money back guaranteed.",
    },
    {
      icon: <RiSecurePaymentLine className="icon" />,
      title: "Super secure payment system.",
    },
  ];

  return (
    <section className="py-18 my-20">
      <h1 class="my-6 pb-6 flex justify-center text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl ">
        Our Services{" "}
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 place-content-center mx-auto center md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div key={index} className=" mx-4 ">
              <div className=" bg-bgimage p-2 flex justify-center items-center  rounded-2xl">
                <div className="text-7xl  text-black  hover:text-white ">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold  text-black  hover:text-white mt-2">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
