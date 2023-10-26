import React, { useState } from "react";
import "./../../app/globals.css";
import axios from "axios";
import Header from "@/components/Heaser";
import Footer from "@/components/footer";
import { Alert } from "flowbite-react";

export default function DatLichKham() {
  const [sodienthoai, setSoDienThoai] = useState("");
  const [errorInput, setErrorInput] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const phoneNumberFormat = /^0[0-9]{9}$/;
    if (phoneNumberFormat.test(sodienthoai)) {
      const loginUser = { sodienthoai };
      setErrorInput("");
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(loginUser);
        console.log(body);
        const res = await axios.post(
          "http://localhost:5000/api/benhnhan/dangnhap",
          body,
          config
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    } else setErrorInput("Số điện thoại có 10 số và bắt đầu bằng số 0");
  };
  return (
    <div className="bg-white">
      <Header />

      <div className="relative border border-indigo-600 grid grid-cols-2 gap-4  content-center md:container md:mx-auto bg-white">
        <img src="/datlich.jpg" alt="" className="w-full h-full object-cover" />
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-blue-700 my-2 text-center">
              Đăng nhập bằng số điện thoại
            </h1>
          </div>
          <Alert color="info">Alert!</Alert>;

          <form className="mt-8 space-y-6" onSubmit={(e) => onSubmit(e)}>
            <div>
              <label
                htmlFor="Số điện thoại"
                className="block font-bold text-gray-700"
              >
                Số điện thoại
              </label>
              <div>
                <input
                  type="tel"
                  name="sodienthoai"
                  onKeyPress={(event) => {
                    if (
                      !/[0-9]/.test(event.key) ||
                      event.currentTarget.value.length >= 10
                    ) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="Nhập số điện thoại"
                  onChange={(evt) => {
                    console.log(">>>>>evt", evt.currentTarget.value);
                    setErrorInput("");
                    setSoDienThoai(evt.currentTarget.value);
                  }}
                  className="w-full px-4 py-3 mt-1 text-black border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-indigo-200"
                  required
                />

                <p className="text-base text-red-600 mt-1">{errorInput}</p>
              </div>
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

      <Footer />
    </div>
  );
}
