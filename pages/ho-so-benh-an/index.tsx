import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "./../../app/globals.css";
import axios from "axios";
import Header from "@/components/Heaser";
import Footer from "@/components/footer";

export default function DatLichKham() {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);
  return (
    <div className="bg-white">
      <Header />
      {/* <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="block rounded-lg bg-white p-4 flex flex-col justify-center items-center">
                      <img src="/hoso.png" alt="" className="w-24 h-24" />
                      <div className="text-center">
                        <p className="text-blue-700 font-normal text-lg mt-4">
                          Bạn đã từng khám tại
                        </p>
                        <p className="text-blue-700 font-normal text-lg mt-0">
                          bệnh viện trường Đại học Y Dược Cần Thơ ?
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <button
                        type="button"
                        className="grow w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        Đã từng khám, chọn hồ sơ
                      </button>
                      <button
                        type="button"
                        className="grow mt-3 w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        Chưa từng khám, Tạo hồ sơ mới
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root> */}
      <main className="w-full">
        <div className="bg-gray-100">
          <section
            className="cover bg-blue-teal-gradient relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex
      items-center justify-center min-h-screen"
          >
            <div className="h-full absolute top-0 left-0 z-0">
              <img
                src="/cover-bg.jpg"
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
            </div>

            <div className="z-10">
              <div>
                <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
                  Đặt lịch khám bệnh trực tuyến
                </h2>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="w-full my-4 px-4 py-3 text-xl font-bold text-white bg-orange-600 rounded-md border-solid border-2 border-orange-600"
                >
                  Đặt lịch khám online
                </button>
                <div className="grid grid-cols-3 gap-4 mt-4 ">
                  <div className="block rounded-lg bg-white p-4 flex flex-col justify-center items-center">
                    <img src="/phieu.png" alt="" className="w-20 h-20" />
                    <div>
                      <h2 className="text-blue-700 font-bold text-lg mt-4">
                        Phiếu khám bệnh
                      </h2>
                    </div>
                  </div>
                  <div className="block rounded-lg bg-white p-4 flex flex-col justify-center items-center">
                    <img src="/lich.png" alt="" className="w-20 h-20" />
                    <div>
                      <h2 className="text-blue-700 font-bold text-lg mt-4">
                        Lịch tái khám
                      </h2>
                    </div>
                  </div>
                  <div className="block rounded-lg bg-white p-4 flex flex-col justify-center items-center">
                    <img src="/card.png" alt="" className="w-20 h-20" />
                    <div>
                      <h2 className="text-blue-700 font-bold text-lg mt-4">
                        Thanh toán viện phí nội trú
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
