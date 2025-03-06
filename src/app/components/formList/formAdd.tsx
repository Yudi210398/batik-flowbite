"use client";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import FormikControl from "../formik/FormikControl";
import useHttp from "../util/http-hook";
import { useRouter } from "next/navigation";
export default function FormAdd({ batik = true }) {
  const router = useRouter();
  const { sendReq, pesanVerify, setErrorValidate, errorValidate } = useHttp();

  let initialValues = batik
    ? {
        typeBatik: "",
        stockBatikAwal: "",
        jenisBatik: "",
      }
    : { namaCustomer: "", nomorTelp: "" };

  let validasiShema = batik
    ? Yup.object({
        typeBatik: Yup.string().required("Harus diIsi"),
        stockBatikAwal: Yup.number().required("Harus diIsi"),
        jenisBatik: Yup.string().required("Harus diIsi"),
      })
    : Yup.object({
        namaCustomer: Yup.string().required("Harus diIsi"),
        nomorTelp: Yup.string().required("Harus diIsi"),
      });

  const dropDownKatun = [
    { key: "katun", value: "Katun" },
    { key: "sutra", value: "Sutra" },
  ];

  const onsubmitcuy = async (values: FormikValues, { resetForm }: any) => {
    let objBatikTambah = batik
      ? {
          typeBatik: values.typeBatik,
          stockBatikAwal: values.stockBatikAwal,
          jenisBatik: values.jenisBatik,
        }
      : {
          namaCustomer: values.namaCustomer,
          nomorTelp: values.nomorTelp,
        };
    let url = batik ? "batiks/tambahbatik" : `customer/add`;
    try {
      setErrorValidate(false);
      const hasil = await sendReq(
        `http://localhost:3001/${url}`,
        "POST",
        objBatikTambah
      );
      if (hasil) {
        alert("Data Berhasi di Add");
        router.refresh();
        router.push(batik ? "/fe-batik/" : "/fe-customer");
      }
    } catch (err: any) {
      setErrorValidate(true);
    }
  };

  return (
    <div className="">
      {errorValidate && (
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
          <div className="ms-3 text-sm font-medium">{pesanVerify}</div>
          <button
            type="button"
            onClick={() => setErrorValidate(false)}
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-2"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validasiShema}
        onSubmit={onsubmitcuy}
      >
        {(formik) => {
          return (
            <Form>
              {batik ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-5">
                    <FormikControl
                      name="typeBatik"
                      label="Type Batik"
                      type="text"
                      placeholder="masukan data"
                      control="input"
                      toucheds={formik.touched.typeBatik}
                      error={formik.errors.typeBatik}
                    />
                  </div>

                  <div className="mb-5">
                    <FormikControl
                      name="stockBatikAwal"
                      label="Stock Batik Awal"
                      placeholder="masukan data"
                      control="input"
                      type="number"
                      toucheds={formik.touched.stockBatikAwal}
                      error={formik.errors.stockBatikAwal}
                    />
                  </div>

                  <div className="mb-5">
                    <FormikControl
                      name="jenisBatik"
                      label="Jenis Batik"
                      option={dropDownKatun}
                      control="select"
                      toucheds={formik.touched.jenisBatik}
                      error={formik.errors.jenisBatik}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-5">
                    <FormikControl
                      name="namaCustomer"
                      label="Nama Customer"
                      type="text"
                      placeholder="masukan data"
                      control="input"
                      toucheds={formik.touched.namaCustomer}
                      error={formik.errors.namaCustomer}
                    />
                  </div>

                  <div className="mb-5">
                    <FormikControl
                      name="nomorTelp"
                      label="Nomor Handphone / Telephone"
                      type="text"
                      placeholder="masukan data"
                      control="input"
                      toucheds={formik.touched.nomorTelp}
                      error={formik.errors.nomorTelp}
                    />
                  </div>
                </div>
              )}
              <div className="mb-5">
                <button
                  type={"submit"}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
