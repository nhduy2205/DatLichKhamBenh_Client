import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "./../../app/globals.css";
import axios from "axios";
import Header from "@/components/Heaser";
import Footer from "@/components/footer";
import { useForm } from "react-hook-form";
import DatePicker from "react-date-picker";
export default function DatLichKham() {
  const [open, setOpen] = useState(false);
  const [khunggiokham, setKhunggiokham] = useState(0);
  const [khunggiokhamErrors, setKhunggiokhamErrors] = useState('');
  const refDropzone = React.useRef<any>()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const onSubmit = async (values: any) => {
    const data = {
      ...values,
      khunggiokham: khunggiokham,
      hinhthucthanhtoan: 'CK',
      trangthaixacthuc: true
    }
    if (khunggiokham > 0) {
      setKhunggiokhamErrors('')
    } else {
      setKhunggiokhamErrors('Vui lòng chọn khung giờ khám')
    }
    console.log('>>>>>>>>>>>>data', data);

    // const values = {
    //   ...data,
    //   gioitinh: data.gioitinh === 'true' ? true : false,
    //   ngaysinh: new Date(data.ngaysinh)
    // }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(data);
      console.log(body);
      const res = await axios.post(
        "http://localhost:5000/api/datlichkham/654265c4c98064960cd65e0b",
        body,
        config
      );
      //refDropzone.current.getData()
      console.log("Thong tin đặt lịch",res);
      setOpen(false)
    } catch (err) {
      console.log(err);
    }

  }
  const cancelButtonRef = useRef(null);
  const url = "http://localhost:5000/api/thongtinbenhnhan/654265c4c98064960cd65e0b";
  const urlChuyenKhoa = "http://localhost:5000/api/chuyenkhoa/";
  const urlKhungGioKham = "http://localhost:5000/api/phongkham/laykhunggiokham";
  const [thongTinHoSo, setThongTinHoSo] = useState([]);
  const [chuyenkhoa, setDataChuyenKhoa] = useState<any>([]);
  const [khungGioKhamServer, setKhungGioKham] = useState<any>([])
  const [giadadat, setGioDaDat] = useState<any>([]);


  const fetchInfo = () => {
    return axios.get(url).then((res) => setThongTinHoSo(res.data));
  };
  const fetchChuyenKhoa = () => {
    return axios.get(urlChuyenKhoa).then((res) => setDataChuyenKhoa(res.data));
  };
  const fetchKhungGioKham = () => {
    return axios.get(urlKhungGioKham).then((res) => setKhungGioKham(res.data));
  };

  useEffect(() => {
    fetchInfo();
    fetchChuyenKhoa();
    fetchKhungGioKham();
  }, []);

  useEffect(() => {
    setValue("chuyenkhoa", chuyenkhoa[0]?._id);
    setValue("ngaykham", new Date());
  }, [chuyenkhoa]);
  useEffect(() => {
    console.log('>>>>>>>>khunggiokham', khunggiokham);

  }, [khunggiokham]);
  // console.log(thongTinKhamBenh);
  // console.log(chuyenkhoa);
  const getCurrentDateInput = () => {

    const dateObj = new Date();

    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };

  return (
    <div className="bg-white">
      <Header />
      <main className="w-full">
        <div className="bg-gray-200">
          <section className="cover bg-gray-200 relative bg-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Chọn khoa khám
                </label>
                <div>
                  <select id="countries"
                    {...register("chuyenkhoa", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                     focus:border-blue-500 block w-full p-2.5">
                    {chuyenkhoa?.map((item: any) =>
                      <option value={item?._id}>{item?.tenchuyenkhoa}</option>
                    )}

                  </select>

                  {errors.chuyenkhoa && errors.chuyenkhoa.type === "required" && (
                    <p className="text-red-700 text-sm">
                      Vui lòng chọn khoa khám bệnh
                    </p>
                  )}
                </div>


              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">

                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Chọn Ngày khám
                </label>
                <div>
                  <input
                    data-date-format="DD MMMM YYYY"
                    type="date"
                    data-date=""
                    placeholder="dd/mm/yyyy"
                    id="username"
                    defaultValue={getCurrentDateInput()}
                    pattern="\d{2}/\d{2}/\d{4}"
                    {...register("ngaykham", { required: true })}
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                             focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.ngaykham && errors.ngaykham.type === "required" && (
                    <p className="text-red-700 text-sm">
                      Vui lòng chọn ngày khám
                    </p>
                  )}
                </div>


              </div>
              <div className="grid grid-cols-4 gap-x-1 gap-y-4 mb-4">

                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Chọnh khám
                </label>
                <div className="col-span-2">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {khungGioKhamServer?.map((item: any) => 
                      <div className={"box-border p-4 border-2 border-indigo-600 text-sm hover:cursor-pointer rounded" +
                      (item?.giatri === khunggiokham ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ") + "hover:bg-indigo-500 hover:text-white hover:font-semibold flex align-center justify-center"}
                      onClick={() => setKhunggiokham(item?.giatri)}
                    >
                      {item?.khunggiokham}
                    </div>
                    )}
                    
                    {/* <div className={"box-border p-4 border-2 border-indigo-600 text-sm hover:cursor-pointer rounded" +
                      (khunggiokham === 2 ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ") + "hover:bg-indigo-500 hover:text-white hover:font-semibold flex align-center justify-center"}
                      onClick={() => setKhunggiokham(2)}
                    >
                      8h - 9h
                    </div>
                    <div className={"box-border p-4 border-2 border-indigo-600 text-sm hover:cursor-pointer rounded" +
                      (khunggiokham === 3 ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ") + "hover:bg-indigo-500 hover:text-white hover:font-semibold flex align-center justify-center"}
                      onClick={() => setKhunggiokham(3)}
                    >
                      9h - 10h
                    </div>
                    <div className={"box-border p-4 border-2 border-indigo-600 text-sm hover:cursor-pointer rounded" +
                      (khunggiokham === 4 ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ") + "hover:bg-indigo-500 hover:text-white hover:font-semibold flex align-center justify-center"}
                      onClick={() => setKhunggiokham(4)}
                    >
                      10h - 11h
                    </div>
                    <div className={"box-border p-4 border-2 border-indigo-600 text-sm hover:cursor-pointer rounded" +
                      (khunggiokham === 5 ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ") + "hover:bg-indigo-500 hover:text-white hover:font-semibold flex align-center justify-center"}
                      onClick={() => setKhunggiokham(5)}
                    >
                      13h - 14h
                    </div>
                    <div className={"box-border p-4 border-2 border-indigo-600 text-sm hover:cursor-pointer rounded" +
                      (khunggiokham === 6 ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ") + "hover:bg-indigo-500 hover:text-white hover:font-semibold flex align-center justify-center"}
                      onClick={() => setKhunggiokham(6)}
                    >
                      14h - 15h
                    </div>
                    <div className={"box-border p-4 border-2 border-indigo-600 text-sm hover:cursor-pointer rounded" +
                      (khunggiokham === 7 ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ") + "hover:bg-indigo-500 hover:text-white hover:font-semibold flex align-center justify-center"}
                      onClick={() => setKhunggiokham(7)}
                    >
                      15h - 16h
                    </div>
                    <div className={"box-border p-4 border-2 border-indigo-600 text-sm hover:cursor-pointer rounded" +
                      (khunggiokham === 8 ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ") + "hover:bg-indigo-500 hover:text-white hover:font-semibold flex align-center justify-center"}
                      onClick={() => setKhunggiokham(8)}
                    >
                      16h - 17h
                    </div> */}
                  </div>
                  {khunggiokhamErrors?.length > 0 && (
                    <p className="text-red-700 text-sm">
                      {khunggiokhamErrors}
                    </p>
                  )}
                </div>


              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">

                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Triệu chứng
                </label>
                <div className="col-span-2">
                  <textarea id="w3review" rows={4} cols={50}
                    {...register("trieuchung", { required: true })}
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                   focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  
                  {errors.trieuchung && errors.trieuchung.type === "required" && (
                    <p className="text-red-700 text-sm">
                      Vui lòng chọn ngày khám
                    </p>
                  )}
                </div>


              </div>
              <div className="grid grid-cols-4 gap-x-1 gap-y-4 mb-4">
                <div className="col-start-2 bg-white py-3 sm:flex sm:flex-row gap-x-4">
                  <button
                    type="submit"
                    disabled={khunggiokham === 0 ? true : false}
                    className={"mt-3 inline-flex w-full justify-center rounded-md" +
                      (khunggiokham === 0 ? " bg-gray-400 cursor-not-allowed " : " bg-indigo-600 ")
                      + "px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-200 sm:mt-0 sm:w-auto"}
                  >
                    Đặt lịch khám
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 
                        text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-400 
                        hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Hủy bỏ
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
