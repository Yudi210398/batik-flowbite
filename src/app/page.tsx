"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FormDatas {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
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
    setError(null);
    e.preventDefault();
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) router.push("/fe-customer");
    else {
      console.log(data);
      setError(data.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login illustration"
            width={3000}
            height={3000}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          {/* <div className="flex justify-center mb-4">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite logo"
              className="w-10 h-10"
            />
          </div> */}
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Sign in to platform
          </h2>

          {error && (
            <p className="text-center text-red-500 uppercase mt-2">{error}</p>
          )}

          <form className="mt-6" onSubmit={handleSubmit}>
            <label className="block text-gray-700">Your email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="name@company.com"
            />

            <label className="block mt-4 text-gray-700">Your password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="****"
            />

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
