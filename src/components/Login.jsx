import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef("");
  const password = useRef("pass");
  let navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://chy-5cjs.onrender.com/api/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      let userInfo = JSON.stringify(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", userInfo);
      navigate("/");
    } else {
      alert("wrong credentials");
    }
  };
  return (
    <div>
      {" "}
      <form onSubmit={submit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="sm:col-span-4">
              <label
                htmlFor="Email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    ref={email}
                    type="text"
                    name="Email"
                    id="Email"
                    autoComplete="Email"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="sm:col-span-4">
              <label
                htmlFor="Password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    ref={password}
                    type="text"
                    name="Password"
                    id="Password"
                    autoComplete="Password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
