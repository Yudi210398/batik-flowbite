"use client";
import { io, Socket } from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import HttpError from "./http-error";
export const dynamic = "force-dynamic";
export default function useHttp(
  dataScoket: string = "",
  port: string = "3001",
  pagination?: { page: number; limit: number }
) {
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
          cache: "no-store",
          credentials: "include",
        });
        const respondata = await respone.json();
        if (!respone.ok || respone.status === 500 || respondata["error"])
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
    const socketBaru = io(`http://localhost:${port}`, {});
    setSocket(socketBaru);
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    socketBaru.emit(dataScoket, { limit, page });

    socketBaru.on(dataScoket, (data) => {
      setRealTimeData(data);
    });

    return () => {
      socketBaru.off(dataScoket);
      socketBaru.close();
    };
  }, [dataScoket, port, pagination?.page, pagination?.limit]);

  return {
    pesanVerify,
    errorValidate,
    sendReq,
    setErrorValidate,
    realTimeData,
  };
}
