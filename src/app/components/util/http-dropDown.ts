import { useEffect, useState, useRef } from "react";
import useHttp from "./http-hook";

export default function useDropDown() {
  const { sendReq, pesanVerify } = useHttp();
  const [customer, setCustomer] = useState([]);
  const [batik, setBatik] = useState([]);
  const [errorValidatesssss, setErrorValidates] = useState(null);
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetch = async () => {
      try {
        const getBatik = await sendReq(
          `http://localhost:3001/batikd/selectbatik?fields=id,typeBatik`
        );
        setBatik(getBatik || []);
      } catch (err: any) {
        setErrorValidates(err.message);

        console.log(err.message);
      }
    };
    fetch();
  }, [sendReq]);
  console.log(pesanVerify, `lurs`);
  return {
    errorValidatesssss,
    batik,
  };
}
