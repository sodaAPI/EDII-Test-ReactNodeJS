import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const Confirm = async (e) => {
    e.preventDefault();
    try {
      if (password === passwordConfirm) {
        const response = await axios.post(
          "http://localhost:5000/api/user/register",
          { email, password, passwordConfirm }
        );
        if (response.data.success) {
          toast.success("Register Success");
          navigate("/login");
        } else {
          toast.success(response.data.msg);
          navigate("/login");
        }
      } else {
        toast.error("Password didn't Match");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An error occurred.");
      }
    }
  };

  return (
    <>
      <section class="bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-white">
            EDII Applicant Management
          </a>
          <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Register account
              </h1>
              <form
                onSubmit={Confirm}
                class="space-y-4 md:space-y-6"
                action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="your@email.com"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-white">
                    Password
                  </label>
                  <input
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-white">
                    Confirm Password
                  </label>
                  <input
                    value={passwordConfirm}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-[#85a236] hover:bg-[#9ec040] p-3 rounded-[16px] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center">
                  Register
                </button>
                <p class="text-sm font-light text-gray-500">
                  Already have an account? {""}
                  <a
                    href="/"
                    class="font-medium text-primary-600 hover:underline">
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
