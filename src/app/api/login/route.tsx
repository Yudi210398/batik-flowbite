import { NextApiRequest, NextApiResponse } from "next";

export default async function LoginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const respone = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (respone.ok) {
        const data = await respone.json();

        res.status(200).json(data);
      } else res.status(401).json({ pesan: `gagal karena invalid credential` });
    } catch (err) {
      res.status(405).json({ pesan: "Error" });
    }
  } else res.status(405).json({ pesan: "Salah method" });
}
