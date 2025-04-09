"use client";
import { Form, Formik, FormikValues } from "formik";
import useHttp from "../util/http-hook";
import * as Yup from "yup";
import PageErrorComponen from "../errorComponentWrongInput/ErrorComponrnt";
import FormikControl from "../formik/FormikControl";
import { useRouter } from "next/navigation";
interface BonDatas {
  bonData: string;
  slugs: number;
}

export default function FormEditBon(bonData: BonDatas) {
  const router = useRouter();
  const { sendReq, pesanVerify, setErrorValidate, errorValidate } = useHttp();

  const intisialNilai = {
    nomorBon: bonData.bonData,
  };

  const validasiShema = Yup.object({
    nomorBon: Yup.string().required("Harus diIsi"),
  });

  const onSubmitCuy = async (
    values: FormikValues,
    { resetForm, setSubmitting }: any
  ) => {
    const data = { nomorBon: values.nomorBon };
    try {
      setErrorValidate(false);
      const hasil = await sendReq(
        `http://localhost:3001/batiks/updatebon/edit/${bonData.slugs}`,
        "PATCH",
        {
          nomorBon: values.nomorBon,
        }
      );
      if (hasil) {
        alert("Data bon berhasil diedit");
        router.refresh();
        router.push("/fe-datapembelian");
      }
    } catch (err: any) {
      setErrorValidate(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {errorValidate && (
        <PageErrorComponen
          pesanVerify={pesanVerify}
          setErrorValidate={setErrorValidate}
        />
      )}

      <Formik
        initialValues={intisialNilai}
        validationSchema={validasiShema}
        onSubmit={onSubmitCuy}
      >
        {(formik) => {
          return (
            <Form>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="mb-5">
                    <FormikControl
                      name="nomorBon"
                      label="Nomor Bon"
                      type="text"
                      placeholder="masukan data"
                      control="input"
                      toucheds={formik.touched.nomorBon}
                      error={formik.errors.nomorBon}
                    />
                  </div>

                  <div className="mb-5">
                    <button
                      disabled={formik.isSubmitting}
                      type={"submit"}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      {formik.isSubmitting ? "Loading" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
