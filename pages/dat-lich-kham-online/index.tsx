import Link from "next/link";
import React, {useState} from "react";
import "./../../app/globals.css";
import axios from "axios";

export default function DatLichKham() {
  const [formData, setFormData] = useState({
    sodienthoai: ''
  });

  const {sodienthoai} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
  const onSubmit = async e => {
    e.preventDefault();
    if(sodienthoai === null || sodienthoai === ""){
      console.log('sodienthoai is null');
    }else{
      const loginUser = {sodienthoai}
      try {
        const config = {
          headers: {
             'Content-Type': 'application/json'
          }
        }
        const body = JSON.stringify(loginUser);
        console.log(body);
        const res = await axios.post('http://localhost:5000/api/benhnhan/dangnhap', body, config);
        console.log(res.data);
        
      } catch (err) {
        console.log(err);
      }
    }
    
  }
  return (
    <div className="bg-white">
      <div className="absolute top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 bg-white">
        <div className="flex flex-wrap items-center justify-between py-3">
          <div className="w-1/2 md:w-auto">
            <a href="/" className="text-blue-600 font-bold text-2xl">
              <img
                src="/logo.png"
                className="h-16 max-w-full rounded-lg"
                alt=""
              />
            </a>
          </div>

          <label className="pointer-cursor md:hidden block">
            <svg
              className="fill-current text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>

          <input className="hidden" type="checkbox" id="menu-toggle" />

          <div className="hidden md:block w-full md:w-auto" id="menu">
            <nav className="w-full bg-white md:bg-transparent rounded shadow-lg px-6 py-4 mt-4 text-center md:p-0 md:mt-0 md:shadow-none">
              <ul className="md:flex items-center">
                <li>
                  <a
                    className="py-2 inline-block md:text-blue-600 md:hidden lg:block font-semibold"
                    href="#"
                  >
                    Giới thiệu
                  </a>
                </li>
                <li className="md:ml-4">
                  <a
                    className="py-2 inline-block md:text-blue-600 md:px-2 font-semibold"
                    href="#"
                  >
                    Tin tức
                  </a>
                </li>
                <li className="md:ml-4 md:hidden lg:block">
                  <a
                    className="py-2 inline-block md:text-blue-600 md:px-2 font-semibold"
                    href="#"
                  >
                    Blog
                  </a>
                </li>
                <li className="md:ml-4">
                  <a
                    className="py-2 inline-block md:text-blue-600 md:px-2 font-semibold"
                    href="#"
                  >
                    Liên hệ
                  </a>
                </li>
                <li className="md:ml-6 mt-3 md:mt-0">
                  <Link
                    className="inline-block font-semibold px-4 py-2 text-blue-600 bg-blue-600 md:bg-transparent md:text-blue-600 border border-blue-600 rounded"
                    href="/dat-lich-kham-online"
                  >
                    Đặt lịch khám
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="relative border border-indigo-600 grid grid-cols-2 gap-4  py-12 md:container md:mx-auto bg-white">
        <img src="/datlich.jpg" alt="" className="w-full h-full object-cover" />
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Đăng nhập bằng số điện thoại</h1>
          </div>
          <div className="flex justify-center items-center">
            <form className="mt-8 space-y-6" onSubmit={e => onSubmit(e)}>
              <div>
                <label
                  htmlFor="Số điện thoại"
                  className="block font-bold text-gray-700"
                >
                 Số điện thoại
                </label>
                <input
                  type="text"
                  name='sodienthoai'
                  placeholder="Nhập số điện thoại"
                  onChange={e => onChange(e)}
                  className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="relative bg-gray-900 text-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-6 lg:py-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-full lg:w-2/6 lg:mx-4 lg:pr-8">
            <img
              src="/logo.png"
              className="h-16 max-w-full rounded-lg"
              alt=""
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
