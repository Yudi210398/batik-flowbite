"use client";

import { useCallback, useState } from "react";
import HttpError from "./http-error";

export default function useHttp() {
  const [errorValidate, setErrorValidate] = useState<boolean>(false);
  // const [errorPesan, setErorrPesan] = useState("");
  const [pesanVerify, setPesanVerify] = useState("");

  const sendReq = useCallback(
    async (
      url: string,
      method = "GET",
      body: Record<string, any> | null = null,
      headers = {}
    ) => {
      try {
        const respone = await fetch(url, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers: {
            "Content-Type": "application/json", // Tambahkan header jika ada body
            ...headers, // Gabungkan dengan headers tambahan
          },
          credentials: "include",
        });
        const respondata = await respone.json();
        if (!respone.ok || respone.status === 500)
          throw new HttpError(respondata.message, respondata.statusCode);

        return respondata;
      } catch (err: any) {
        console.log(err.message, `koja`);
        setErrorValidate(true);
        setPesanVerify(err.message);
      }
    },
    []
  );
  return {
    pesanVerify,
    errorValidate,
    sendReq,
    setErrorValidate,
  };
}
