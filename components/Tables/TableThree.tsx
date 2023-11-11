import axios from "axios";
import React, { useEffect, useState } from "react";

import { Listbox, Transition, Dialog } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
const TableThree = () => {
  const [openThanhCong, setOpenThanhCong] = useState(false);

  const [data, setData] = useState<any>([]);
  const [kham, setKham] = useState<any>();
  const url = "http://localhost:5000/api/datlichkham/all";
  const getData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      url
    );
    setData(res.data)
  }
  console.log(data);
  useEffect(() => {
    getData()
  }, [])
  
  function padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date: any) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }
  const getOld = (dob: any) => {
    const myOld = new Date(dob)
    const getY = myOld.getFullYear()
    const date = new Date()
    const nowYear = date.getFullYear()
    return nowYear - getY
  }
  console.log(data);
  const submitDatlich = async (id: number) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(
        "http://localhost:5000/api/datlichkham/capnhattrangthaikhambenh/" + id
      );
      getData()
      setOpenThanhCong(false)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="rounded-sm border1 border-slate-100 bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto"> 
        <table className="w-full table-auto border-collapse border border-slate-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="w-[10px] py-4 px-4 font-medium text-black border border-slate-300">
                STT
              </th>
              <th className="min-w-[250px] py-4 px-4 font-medium text-black border border-slate-300">
                Bệnh nhân
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black border border-slate-300">
                Giờ khám
              </th>
              <th className="py-4 px-4 font-medium text-black border border-slate-300">
                Phòng khám
              </th>
              <th className="py-4 px-4 font-medium text-black border border-slate-300">
                Khoa khám
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black border border-slate-300">
                triệu chứng
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black border border-slate-300">
                Xác nhận khám
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((packageItem: any, key: number) => (
              <tr key={key}>
                <td align="center" className="border-b border-[#eee] py-5 px-4 border border-slate-300">
                  <p className="text-black dark:text-white">
                    {key + 1}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 border border-slate-300">
                  <h5 className="font-medium text-black dark:text-white">
                    Số BHYT: {packageItem.theBHYT}
                  </h5>
                  <p className="text-black dark:text-white">{packageItem.hoten} </p>
                  <p className="text-black dark:text-white">{getOld(packageItem?.ngaysinh)} tuổi </p>
                  <p className="text-black dark:text-white">Địa chỉ: {packageItem.diachi}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 border border-slate-300">
                  <p className="text-black dark:text-white">
                    {packageItem.tenkhunggiokham}
                  </p>
                  <p className="text-black dark:text-white">
                  {formatDate(new Date(packageItem.ngaykham))}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 border border-slate-300">
                  <p className="text-black dark:text-white">
                    {packageItem.tenphongkham}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 border border-slate-300">
                  <p className="text-black dark:text-white">
                    {packageItem.tenchuyenkhoa}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 border border-slate-300">
                  <p className="text-black dark:text-white">
                    {packageItem.trieuchung}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 border border-slate-300">
                  <div className="flex items-center space-x-3.5">
                    {packageItem.trangthaikhambenh ===1 ?
                    <p className="text-teal-600 italic font-semibold">Đã khám bệnh</p>
                    :
                     <button
                      onClick={()=> {
                        setKham(packageItem)
                        setOpenThanhCong(true)
                      }}
                      className="px-2 py-3 font-normal bg-white text-indigo-600 border-2 border-indigo-600 rounded-md text-sm
                       hover:bg-indigo-600 hover:text-white focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                    >
                      Xác nhận
                    </button>
                    
                  }
                   

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Transition.Root show={openThanhCong}>
        <Dialog
          as="div"
          className="relative z-100 w-full"
          onClose={setOpenThanhCong}
        >
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative z-100 transform overflow-hidden rounded-lg bg-white
                 text-left shadow-xl transition-all sm:my-8 sm:w-full">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Dialog.Title
                      as="h2"
                      className="text-center text-lg text-base font-semibold leading-6 
                      text-teal-600 mb-4"
                    >
                      XÁC NHẬN KHÁM BỆNH
                    </Dialog.Title>

                    <p className="text-md text-gray-800">Xác nhận khám bệnh cho bệnh nhân <span className="text-md font-bold text-indigo-700">{kham?.hoten}</span></p>
                  </div>


                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-x-4">
                    <button
                      type="submit"
                      className="mt-3 inline-flex w-full justify-center rounded-md 
                        bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 
                        ring-inset ring-gray-200 sm:mt-0 sm:w-auto"
                      onClick={() => submitDatlich(kham?._id)}
                    >
                      Xác nhận
                    </button>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default TableThree;
