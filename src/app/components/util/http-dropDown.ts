import { useEffect, useState, useRef } from "react";
import useHttp from "./http-hook";
import { tree } from "next/dist/build/templates/app-page";

export default function useDropDown() {
  const { sendReq, errorValidate } = useHttp();
  const [customer, setCustomer] = useState([]);
  const [batik, setBatik] = useState([]);
  const hasFetched = useRef(false);
  const hasFetchedCustomer = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetch = async () => {
      try {
        const getBatik = await sendReq(
          `http://localhost:3001/batiks/selectbatik?fields=id,typeBatik`
        );
        setBatik(getBatik || []);
      } catch (err: any) {
        console.log(err.message, `caks`);
      }
    };
    fetch();
  }, [sendReq]);

  useEffect(() => {
    if (hasFetchedCustomer.current) return;
    hasFetchedCustomer.current = true;

    const fetch = async () => {
      try {
        const getBatik = await sendReq(
          `http://localhost:3001/customer?fields=id,namaCustomer`
        );
        setCustomer(getBatik || []);
      } catch (err: any) {
        console.log(err.message, `caks`);
      }
    };
    fetch();
  }, [sendReq]);

  let errorDropDown = errorValidate;
  return {
    customer,
    batik,
    errorDropDown,
  };
}
