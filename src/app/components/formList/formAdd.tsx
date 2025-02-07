"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../formik/FormikControl";
export default function FormAdd() {
  const initialValues = {
    typeBatik: "",
    stockBatikAwal: "",
    jenisBatik: "",
  };
  const validasiShema = Yup.object({
    typeBatik: Yup.string().required("Harus diIsi"),
    stockBatikAwal: Yup.number().required("Harus diIsi"),
  });

  const dropDownKatun = [
    { key: "", value: "Pilih Bahan" },
    { key: "katun", value: "Katun" },
    { key: "sutra", value: "Sutra" },
  ];

  const onsubmitcuy = async (values: any) => {
    console.log(values, `wkwkw`);
  };

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validasiShema}
        onSubmit={onsubmitcuy}
      >
        {(formik) => {
          return (
            <Form>
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
