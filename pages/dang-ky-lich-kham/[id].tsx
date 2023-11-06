import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "./../../app/globals.css";
import axios from "axios";
import Header from "@/components/Heaser";
import Footer from "@/components/footer";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function DatLichKham() {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [khunggiokham, setKhunggiokham] = useState(0);
  const [khunggiokhamErrors, setKhunggiokhamErrors] = useState('');
  const cancelButtonRef = useRef(null);
  const url = "http://localhost:5000/api/thongtinbenhnhan/" + router.query.id;
  const urlChuyenKhoa = "http://localhost:5000/api/chuyenkhoa/";
  const urlKhungGioKham = "http://localhost:5000/api/phongkham/laykhunggiokham";
  const UrlKhungGioKhamTheoNgay = "http://localhost:5000/api/thongtinbenhnhan/laytheongay";
  const [thongTinHoSo, setThongTinHoSo] = useState<any>([]);
  const [chuyenkhoa, setDataChuyenKhoa] = useState<any>([]);
  const [khungGioKhamServer, setKhungGioKham] = useState<any>([])
  const [ngaykham, setNgaykham] = useState<any>(new Date());
  const [khungGioKhamTheoNgay, setKhungGioKhamTheoNgay] = useState<any>([]);
  const [khoakhamid, setkhoakhamid] = useState<any>('');
  const refDropzone = React.useRef<any>()
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

  const onSubmit = async (values: any) => {
    const data = {
      ...values,
      chuyenkhoa: khoakhamid,
      khunggiokham: khunggiokham,
      hinhthucthanhtoan: 'CK',
      trangthaixacthuc: true
    }
    if (khunggiokham > 0) {
      setKhunggiokhamErrors('')
    } else {
      setKhunggiokhamErrors('Vui lòng chọn khung giờ khám')
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(data);
      console.log(body);
      const res = await axios.post(
        "http://localhost:5000/api/datlichkham/" + router.query.id,
        body,
        config
      );
      console.log("Thong tin đặt lịch", res?.data);
      router.push('chi-tiet-lich-kham/' + res?.data)
      setOpen(false)
    } catch (err) {
      console.log(err);
    }

  }


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
    if (router.query.id) {
      fetchInfo();
      fetchChuyenKhoa();
      fetchKhungGioKham();
    }
  }, [router.query.id]);

  useEffect(() => {
    setkhoakhamid(chuyenkhoa[0]?._id);
    setValue("ngaykham", new Date());
  }, [chuyenkhoa]);


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
  const getCurrentDateInput = (dateObj: Date) => {

    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };

  const getKhungGioKhamTheoNgay = async (khoakhamid: string, ngaykham) => {
    const ngaykhamParam = {
      ngaykham: getCurrentDateInput(ngaykham),
      chuyenkhoa: khoakhamid
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        UrlKhungGioKhamTheoNgay,
        JSON.stringify(ngaykhamParam),
        config
      );
      console.log('>>lay ds theo ngay: ', res?.data?.datlich);
      setKhungGioKhamTheoNgay(res?.data?.datlich)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    console.log('>>>>chuyenkhaid', khoakhamid);

    if (khoakhamid?.length > 0) {

      getKhungGioKhamTheoNgay(khoakhamid, ngaykham)
    }
  }, [khoakhamid, ngaykham])
  const checktime = (lichdat: number) => {
    const currentDate = new Date();

    // Get the current hour (0-23)
    const currentHour = currentDate.getHours();
    if (currentHour < lichdat) {
      return true
    } else { return false }
  }
 console.log('>>>>>>>>>>>> checktime(7)',  checktime(23));
 
  return (
    <div className="bg-white">
      <Header />
      <main className="w-full">
        <div className="bg-gray-200">
          <section className="cover bg-gray-200 relative bg-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-4">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <text className="block text-sm font-medium leading-6 text-gray-900">Họ tên: </text>
              <text className="block text-sm font-medium leading-6 text-gray-900">{
                thongTinHoSo?.hoten
              }</text>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <text className="block text-sm font-medium leading-6 text-gray-900">Giới tính: </text>
              <text className="block text-sm font-medium leading-6 text-gray-900">{
                thongTinHoSo?.gioitinh ? 'Nam' : "Nữ"
              }</text>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <text className="block text-sm font-medium leading-6 text-gray-900">Ngày sinh: </text>
              <text className="block text-sm font-medium leading-6 text-gray-900">{
                formatDate(new Date(thongTinHoSo?.ngaysinh))
              }</text>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <text className="block text-sm font-medium leading-6 text-gray-900">Địa chỉ: </text>
              <text className="block text-sm font-medium leading-6 text-gray-900">{
                thongTinHoSo?.diachi
              }</text>
            </div>
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
                    value={khoakhamid}
                    onChange={(event: any) => setkhoakhamid(event.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                     focus:border-blue-500 block w-full p-2.5">
                    {chuyenkhoa?.map((item: any) =>
                      <option value={item?._id}>{item?.tenchuyenkhoa}</option>
                    )}

                  </select>

                  {khoakhamid && khoakhamid?.lengnth === 0 && (
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      defaultValue={dayjs(getCurrentDateInput(ngaykham))}
                      format="DD/MM/YYYY"
                      onChange={(value: any) => {
                        setNgaykham(value?.$d)
                        console.log('>>>>DatePicker', value?.$d);

                      }}
                    />
                  </LocalizationProvider>

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
                      <div className={"box-border p-4 border-2 text-sm" +  (checktime(23) === true ? (khungGioKhamTheoNgay?.findIndex((kg: any) => kg?.khunggiokham === item?.giatri) > -1 ? " border-emerald-600 hover:cursor-not-allowed rounded " : " border-indigo-600 hover:cursor-pointer rounded hover:font-semibold ") : " bg-gray-400 hover:cursor-not-allowed rounded ") +
                        (checktime(23) === true ? (khungGioKhamTheoNgay?.findIndex((kg: any) => kg?.khunggiokham === item?.giatri) > -1 ? " bg-emerald-600 text-white" : (item?.giatri === khunggiokham ? " bg-indigo-500 text-white font-semibold " : " bg-white text-indigo-600 ")) : 'bg-gray-400 text-white') +
                        "hover:bg-indigo-500 hover:text-white flex align-center justify-center"}
                        onClick={() => setKhunggiokham(item?.giatri)}
                      >
                        {item?.khunggiokham}
                      </div>
                    )}
                  </div>
                  {khunggiokhamErrors?.length > 0 && (
                    <p className="text-red-700 text-sm">
                      {khunggiokhamErrors}
                    </p>
                  )}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex">
                      <div className="h-8 w-8 bg-emerald-600 mr-3"></div>
                      <div className="block text-sm font-medium leading-6 text-gray-700">Đã đặt</div>
                    </div>
                    <div className="flex">
                      <div className="h-8 w-8 bg-gray-400 mr-3"></div>
                      <div className="block text-sm font-medium leading-6 text-gray-700">Đã quá giờ</div>
                    </div>
                    <div className="flex">
                      <div className="h-8 w-8 bg-indigo-500 mr-3"></div>
                      <div className="block text-sm font-medium leading-6 text-gray-700">Còn trống lịch</div>
                    </div>

                  </div>
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
