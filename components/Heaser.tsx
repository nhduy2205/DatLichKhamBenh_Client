import Link from "next/link";

export default function Header() {
  return (
    <div
      className="relative w-full z-5 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 bg-white bg-indigo-500 
      border-b-2 border-indigo-200"
    >
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
                  Giới thiệu</a>
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
              {/* <li className="md:ml-6 mt-3 md:mt-0">
                <Link
                  className="inline-block font-semibold px-4 py-2 text-blue-600 bg-blue-600 md:bg-transparent md:text-blue-600 border border-blue-600 rounded"
                  href="/dang-ky-dang-nhap"
                >
                  Đặt lịch khám
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
