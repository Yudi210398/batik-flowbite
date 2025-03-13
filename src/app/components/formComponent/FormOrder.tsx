"use client";

import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import useHttp from "../util/http-hook";
import useDropDown from "../util/http-dropDown";
import { Formik, FormikValues } from "formik";

export default function FormOrder() {
  const { sendReq } = useHttp();

  const { batik, errorDropDown, customer } = useDropDown();
  const initialValues = {
    batikId: "",
    customerId: "",
    quantity: "",
  };
  const validasiShema = Yup.object({
    batikId: Yup.number().required("Harus diIsi"),
    customerId: Yup.number().required("Harus diIsi"),
    quantity: Yup.number().required("Harus diIsi"),
  });

  const submitFungsi = async (values: FormikValues, { resetForm }: any) => {};

  const keyMap: Record<string, string> = { id: "key", namaCustomer: "value" };
  const keyMaps: Record<string, string> = { id: "key", typeBatik: "value" };
  const customerChageObjeProperties = customer.map((data) => {
    return Object.entries(data).reduce((obj, [key, value]) => {
      return { ...obj, [keyMap[key] || key]: value };
    }, {});
  });

  const batikChangeObjProperties = batik.map((hasil) =>
    Object.entries(hasil).reduce((obj, [key, value]) => {
      return { ...obj, [keyMaps[key] || key]: value };
    }, {})
  );
  console.log(customerChageObjeProperties, `wer`, batikChangeObjProperties);

  return (
    <div className="">
      {errorDropDown && (
        <div
          id="alert-2"
          className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">
            Not Responding / Not Found
          </div>
        </div>
      )}

      {!errorDropDown && (
        <Formik
          i={initialValues}
          validationSchema={validasiShema}
          onSubmit={submitFungsi}
        ></Formik>
      )}
    </div>
  );
}
