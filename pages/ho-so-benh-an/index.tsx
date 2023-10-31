import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "./../../app/globals.css";
import axios from "axios";
import Header from "@/components/Heaser";
import Footer from "@/components/footer";
import { useForm } from "react-hook-form";

export default function DatLichKham() {
  const [open, setOpen] = useState(true);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const cancelButtonRef = useRef(null);
  return (
    <div className="bg-white">
      <Header />
      <Transition.Root show={open} as={Fragment}>
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
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Hồ sơ bệnh nhân
                      </Dialog.Title>
                      <div className="grid grid-flow-col grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Họ tên
                          </label>
                          
                          <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="username"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                           Ngày sinh
                          </label>
                          <input
                            type="date"
                            name="date"
                            id="username"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4"></div>

                            <div className="col-span-full">
                              <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                About
                              </label>
                              <div className="mt-2">
                                <textarea
                                  id="about"
                                  name="about"
                                  rows={3}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  defaultValue={""}
                                />
                              </div>
                              <p className="mt-3 text-sm leading-6 text-gray-600">
                                Write a few sentences about yourself.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Personal Information
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use a permanent address where you can receive mail.
                          </p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                First name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="first-name"
                                  id="first-name"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Last name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="last-name"
                                  id="last-name"
                                  autoComplete="family-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  autoComplete="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Country
                              </label>
                              <div className="mt-2">
                                <select
                                  id="country"
                                  name="country"
                                  autoComplete="country-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>United States</option>
                                  <option>Canada</option>
                                  <option>Mexico</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="street-address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="street-address"
                                  id="street-address"
                                  autoComplete="street-address"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="city"
                                  id="city"
                                  autoComplete="address-level2"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="region"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="region"
                                  id="region"
                                  autoComplete="address-level1"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="postal-code"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="postal-code"
                                  id="postal-code"
                                  autoComplete="postal-code"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Notifications
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            We'll always let you know about important changes,
                            but you pick what else you want to hear about.
                          </p>

                          <div className="mt-10 space-y-10">
                            <fieldset>
                              <legend className="text-sm font-semibold leading-6 text-gray-900">
                                By Email
                              </legend>
                              <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                  <div className="flex h-6 items-center">
                                    <input
                                      id="comments"
                                      name="comments"
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                  </div>
                                  <div className="text-sm leading-6">
                                    <label
                                      htmlFor="comments"
                                      className="font-medium text-gray-900"
                                    >
                                      Comments
                                    </label>
                                    <p className="text-gray-500">
                                      Get notified when someones posts a comment
                                      on a posting.
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                  <div className="flex h-6 items-center">
                                    <input
                                      id="candidates"
                                      name="candidates"
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                  </div>
                                  <div className="text-sm leading-6">
                                    <label
                                      htmlFor="candidates"
                                      className="font-medium text-gray-900"
                                    >
                                      Candidates
                                    </label>
                                    <p className="text-gray-500">
                                      Get notified when a candidate applies for
                                      a job.
                                    </p>
                                  </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                  <div className="flex h-6 items-center">
                                    <input
                                      id="offers"
                                      name="offers"
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                  </div>
                                  <div className="text-sm leading-6">
                                    <label
                                      htmlFor="offers"
                                      className="font-medium text-gray-900"
                                    >
                                      Offers
                                    </label>
                                    <p className="text-gray-500">
                                      Get notified when a candidate accepts or
                                      rejects an offer.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                            <fieldset>
                              <legend className="text-sm font-semibold leading-6 text-gray-900">
                                Push Notifications
                              </legend>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                These are delivered via SMS to your mobile
                                phone.
                              </p>
                              <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                  <input
                                    id="push-everything"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                  <label
                                    htmlFor="push-everything"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Everything
                                  </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                  <input
                                    id="push-email"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                  <label
                                    htmlFor="push-email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Same as email
                                  </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                  <input
                                    id="push-nothing"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                  <label
                                    htmlFor="push-nothing"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    No push notifications
                                  </label>
                                </div>
                              </div>
                            </fieldset>
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
                        onClick={() => setOpen(false)}
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
      </Transition.Root>
      <main className="w-full">
        <div className="bg-gray-100">
          <section className="cover relative bg-white px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-4">
            <button
              className="my-4 px-4 py-3 text-md font-bold text-white bg-orange-600 rounded-md border-solid 
            border-2 border-orange-600"
              onClick={() => {
                setOpen(true);
              }}
            >
              Tạo hồ sơ mới
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
