"use client";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic untuk submit form
    console.log("Login data:", { username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-[url('https://images.unsplash.com/photo-1602524811161-51c3f4d8e9c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')]">
      <div className="m-auto">
        <div className="w-full max-w-lg p-16 space-y-10 space-x-8 bg-white rounded shadow-md">
          <h2 className="uppercase text-center text-lg font-mono">
            Login page
          </h2>
          <form className="max-w-sm mx-auto">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font font-medium text-blue-900 uppercase"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="username"
              />
            </div>
            <br />

            <div>
              <label
                htmlFor="Password"
                className="block text-sm font font-medium text-blue-900 uppercase"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="password"
              />
            </div>
            <br />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  rounded-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
