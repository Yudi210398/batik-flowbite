"use client";
import { io, Socket } from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import HttpError from "./http-error";

export default function useHttp() {
  const [errorValidate, setErrorValidate] = useState<boolean>(false);
  // const [errorPesan, setErorrPesan] = useState("");
  const [pesanVerify, setPesanVerify] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [realTimeData, setRealTimeData] = useState<any[]>([]);

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
        setErrorValidate(true);
        setPesanVerify(err.message);
      }
    },
    []
  );

  useEffect(() => {
    const socketBaru = io("http://localhost:3001");
    setSocket(socketBaru);
    socketBaru.emit("update");
    socketBaru.on("batik_update", (data) => {
      setRealTimeData(data);
    });
    console.log(socket, `cuy`);
    return () => {
      socketBaru.off("batik_update");
      console.log(`kocak,close`);
      socketBaru.close();
    };
  }, []);

  return {
    pesanVerify,
    errorValidate,
    sendReq,
    setErrorValidate,
    realTimeData,
  };
}
