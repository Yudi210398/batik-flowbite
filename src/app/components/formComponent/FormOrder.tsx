"use client";

import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import useHttp from "../util/http-hook";

export default function FormOrder() {
  const { sendReq, pesanVerify, setErrorValidate, errorValidate } = useHttp();
  const [databatik, setDataBatik] = useState([]);
  const [dataCustomer, setDataCustomer] = useState([]);
  const hasFetched = useRef(false);
  const hasFetchedcustomer = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetch = async () => {
      try {
        const getbatik = await sendReq(
          "http://localhost:3001/batiks/selectbatik?fields=id,typeBatik"
        );
        setDataBatik(getbatik || []);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetch();
  }, [sendReq]);

  useEffect(() => {
    if (hasFetchedcustomer.current) return;
    hasFetchedcustomer.current = true;
    const fetchCustomer = async () => {
      try {
        const getCustomer = await sendReq(
          "http://localhost:3001/customer?fields=id,namaCustomer"
        );

        setDataCustomer(getCustomer || []);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchCustomer();
  }, [sendReq]);
  const keyMap: Record<string, string> = { id: "key", namaCustomer: "value" };
  const keyMaps: Record<string, string> = { id: "key", typeBatik: "value" };
  const customerChageObjeProperties = dataCustomer.map((data) => {
    return Object.entries(data).reduce((obj, [key, value]) => {
      return { ...obj, [keyMap[key] || key]: value };
    }, {});
  });

  const batikChangeObjProperties = databatik.map((hasil) =>
    Object.entries(hasil).reduce((obj, [key, value]) => {
      return { ...obj, [keyMaps[key] || key]: value };
    }, {})
  );

  console.log(customerChageObjeProperties, `wer`, batikChangeObjProperties);

  return <></>;
}
