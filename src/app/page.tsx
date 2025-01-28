"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface FormDatas {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [error, setEror] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDatas>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    setEror(null);
    e.preventDefault();
    const respone = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await respone.json();
    if (respone.ok) {
      router.push("/fe-customer");
    } else {
      console.log(data);
      setEror(data.message);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen grid bg-slate-200/25">
        <div className="m-auto">
          <h1 className="text-center"> LOGIN PAGE</h1>
          {error && (
            <h3 className="text-center text-red-500 uppercase">{error}</h3>
          )}
          <br />
          <form
            onSubmit={handleSubmit}
            className="border p-16 bg-white/30 rounded-lg shadow-md"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 uppercase"
              >
                email
              </label>

              <input
                id="email"
                name="email"
                type={"email"}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="email"
              />
            </div>
            <br />
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 uppercase"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                required
                value={formData.password}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="password"
              />
            </div>

            <button
              className={
                "uppercase text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              }
              style={{ marginTop: "20px" }}
              type={"submit"}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
