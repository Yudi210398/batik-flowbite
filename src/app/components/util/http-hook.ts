"use client";

import { useCallback, useState } from "react";

export default function useHttp() {
  const [errorValidate, setErrorValidate] = useState(false);
  const [errorPesan, setErorrPesan] = useState("");
  const [pesanVerify, setPesanVerify] = useState("");

  const sendReq = useCallback(
    async (url: string, method = "GET", body = null, headers = {}) => {
      try {
        const respone = await fetch(url, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers,
          credentials: "include",
        });
        const respondata = await respone.json();
        if (!respone.ok || respone.status === 500)
          throw new Error(respondata?.error?.pesan);

        return respondata;
      } catch (err: any) {
        throw setPesanVerify(err?.message);
      }
    },
    []
  );
  return {
    pesanVerify,
    errorValidate,
    sendReq,
    setErrorValidate,
    errorPesan,
    setErorrPesan,
  };
}
