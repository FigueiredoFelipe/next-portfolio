import { forwardRef } from "react";
import { FaMapMarkedAlt, FaMailBulk } from "react-icons/fa";

function Contact(_: any, ref: React.Ref<HTMLDivElement>) {
  return (
    <section className="py-16" ref={ref}>
      <div className="container mx-auto justify-center w-full">
        <div className="flex flex-col mx-w-full justify-center items-center md:items-start">
          <div className="container mx-auto max-w-full flex flex-col w-full md:w-8/12 px-4">
            <h1 className="text-blue-500 font-extrabold text-lg">CONTACT</h1>
            <h2 className="font-bold text-2xl">Don&apos;t be shy! Hit me up! 👇</h2>
            <div className="flex flex-wrap py-6">
              <div className="flex items-center w-full md:w-auto ">
                <FaMapMarkedAlt className="fill-blue-500 text-3xl" />
                <div className="ml-2">
                  <h3 className="font-bold text-lg">Location</h3>
                  <p className="cursor-pointer hover:text-blue-500">
                    Belo Horizonte, Brazil
                  </p>
                </div>
              </div>
              <div className="flex items-center w-full md:w-auto p-0 md:p-4">
                <FaMailBulk className="fill-blue-500 text-3xl" />
                <div className="ml-2">
                  <h3 className="font-bold text-base">Mail</h3>
                  <a
                    href="mailto:felipenegreirosadv@gmail.com"
                    className="hover:text-blue-500"
                  >
                    felipenegreirosadv@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default forwardRef(Contact);
