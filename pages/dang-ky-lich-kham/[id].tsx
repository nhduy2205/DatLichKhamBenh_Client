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
      khunggiokham: khunggiokham
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
    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const body = JSON.stringify(values);
    //   console.log(body);
    //   if (typeof window !== 'undefined') {
    //     const item: any = JSON.parse(localStorage.getItem('benhnhan')) || ''
    //     const res = await axios.get(
    //       `http://localhost:5000/api/thongtinbenhnhan/${item?.id}`);
    //     setOpen(false)
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

  }
  const cancelButtonRef = useRef(null);
  const url = "http://localhost:5000/api/thongtinbenhnhan/654265c4c98064960cd65e0b";
  const urlChuyenKhoa = "http://localhost:5000/api/chuyenkhoa/";
  const [thongTinHoSo, setThongTinHoSo] = useState([]);
  const [chuyenkhoa, setDataChuyenKhoa] = useState<any>([])


  const fetchInfo = () => {
    return axios.get(url).then((res) => setThongTinHoSo(res.data));
  };
  const fetchChuyenKhoa = () => {
    return axios.get(urlChuyenKhoa).then((res) => setDataChuyenKhoa(res.data));
  };

  useEffect(() => {
    fetchInfo();
    fetchChuyenKhoa();
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

      {/* <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-100 w-1/2"
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

          <div className="fixed inset-0 z-100 w-screen overflow-y-auto">
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
                <Dialog.Panel
                  className="relative z-100 transform overflow-hidden rounded-lg bg-white
                 text-left shadow-xl transition-all sm:my-8 sm:w-1/2"
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <Dialog.Title
                        as="h2"
                        className=" text-lg text-base font-semibold leading-6 text-indigo-600"
                      >
                        Hồ sơ bệnh nhân
                      </Dialog.Title>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Họ tên
                          </label>

                          <input
                            type="text"
                            id="username"
                            autoComplete="username"
                            {...register("hoten", { required: true, minLength: 3, maxLength: 50 })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                            sm:text-sm sm:leading-6"
                          />
                          {errors.hoten && errors.hoten.type === "minLength" && (
                            <p className="text-red-700 text-sm">
                              Họ và tên phải lớn hơn 3 ký tự
                            </p>
                          )}
                          {errors.hoten && errors.hoten.type === "maxLength" && (
                            <p className="text-red-700 text-sm">
                              Họ và tên phải nhỏ hơn 50 ký tự
                            </p>
                          )}
                          {errors.hoten && errors.hoten.type === "required" && (
                            <p className="text-red-700 text-sm">
                              Họ và tên phải bắt buộc nhập
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Số bảo hiểm y tế
                          </label>

                          <input
                            type="text"
                            id="soBHYT"
                            {...register("soBHYT", { minLength: 15, maxLength: 15 })}
                            autoComplete="soBHYT"
                            className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.soBHYT && errors.soBHYT.type === "minLength" && (
                            <p className="text-red-700 text-sm">
                              Số thẻ bảo hiểm y tế có 15 ký tự
                            </p>
                          )}
                          {errors.soBHYT && errors.soBHYT.type === "maxLength" && (
                            <p className="text-red-700 text-sm">
                              Số thẻ bảo hiểm y tế có 15 ký tự
                            </p>
                          )}

                        </div>
                        <div>
                          <label
                            htmlFor="date"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Ngày sinh
                          </label>
                          <input
                            data-date-format="DD MMMM YYYY"
                            type="date"
                            data-date=""
                            placeholder="dd/mm/yyyy"
                            id="username"
                            pattern="\d{2}/\d{2}/\d{4}"
                            {...register("ngaysinh")}
                            className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                             focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="sex"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Giới tính
                          </label>
                          <div className="flex justify-start">

                            <div className="mb-2 block min-h-2 pl-2 mr-4">
                              <input
                                className="relative float-left -ml-2 mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                id="radioDefault01"
                                value={"true"}
                                {...register("gioitinh")}
                              />
                              <label
                                className="mt-px text-black inline-block pl-2 hover:cursor-pointer"
                                htmlFor="radioDefault01"
                              >
                                Nam
                              </label>
                            </div>
                            <div className="mb-2 block min-h-2 pl-2">
                              <input
                                className="relative float-left -ml-2 mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="radio"
                                id="radioDefault02"
                                value={"false"}
                                {...register("gioitinh")}
                              />
                              <label
                                className="mt-px  text-black inline-block pl-2 hover:cursor-pointer"
                                htmlFor="radioDefault02"
                              >
                                Nữ
                              </label>
                            </div>
                          </div>

                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="username"
                            className="block pl-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Nghề nghiệp
                          </label>

                          <input
                            type="text"
                            id="nghenghiep"
                            {...register("nghenghiep")}
                            autoComplete="nghenghiep"
                            className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="about"
                            className="block pl-2 text-sm font-medium leading-6 text-gray-900"
                          >
                            Địa chỉ
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="diachi"
                              rows={3}
                              {...register("diachi")}
                              className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={""}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-x-4">
                      <button
                        type="submit"
                        className="mt-3 inline-flex w-full justify-center rounded-md 
                        bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 
                        ring-inset ring-gray-200 sm:mt-0 sm:w-auto"
                        ref={cancelButtonRef}
                      >
                        Thêm hồ sơ
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
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root> */}
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
                    <div className={"box-border p-4 border-2 border-indigo-600 text-sm hover:cursor-pointer rounded" +
                      (khunggiokham === 1 ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ") + "hover:bg-indigo-500 hover:text-white hover:font-semibold flex align-center justify-center"}
                      onClick={() => setKhunggiokham(1)}
                    >
                      7h - 8h
                    </div>
                    <div className={"box-border p-4 border-2 border-indigo-600 text-sm hover:cursor-pointer rounded" +
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
                    </div>
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
