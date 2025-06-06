"use client";
import { Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import FormikControl from "../formik/FormikControl";
import useHttp from "../util/http-hook";
import { useRouter } from "next/navigation";
import PageErrorComponen from "../errorComponentWrongInput/ErrorComponrnt";
export default function FormAdd({ batik = true }) {
  const router = useRouter();
  const { sendReq, pesanVerify, setErrorValidate, errorValidate } = useHttp();

  const initialValues = batik
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

  const onsubmitcuy = async (
    values: FormikValues,
    { resetForm, setSubmitting }: any
  ) => {
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      {errorValidate && (
        <PageErrorComponen
          pesanVerify={pesanVerify}
          setErrorValidate={setErrorValidate}
        />
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
                  disabled={formik.isSubmitting}
                  type={"submit"}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  {formik.isSubmitting ? "Loading" : "Submit"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
