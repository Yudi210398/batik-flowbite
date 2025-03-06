"use client";

import { useEffect, useState, useRef } from "react";
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
          "http://localhost:3001/batiks/getDataBatik"
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
        const getCustomer = await sendReq("http://localhost:3001/customer");

        setDataCustomer(getCustomer || []);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchCustomer();
  }, [sendReq]);
  console.log(dataCustomer, databatik);
  return <></>;
}
