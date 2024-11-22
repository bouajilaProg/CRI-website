import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginPageProps>({
    email: "",
    password: "",
  });

  const [loginValidationTestResult, setLoginValidationTestResult] = useState<
    number
  >(0);
  // 0: not tested
  // 1: valid
  // 2: email not valid
  // 3: password not valid

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //security check

    if (
      loginData.email.indexOf('"') !== -1 ||
      loginData.email.indexOf("'") !== -1 ||
      loginData.password.indexOf('"') !== -1 ||
      loginData.password.indexOf("'") !== -1
    ) {
      alert(
        "if you see this message, you are a hacker and you are not welcome here",
      );
      return;
    }

    //TODO:check if the user is valid
    let data;
    axios.post("http://localhost:4000/users/Login", {
      email: loginData.email,
      password: loginData.password,
    }).then((res) => {
      if (res.status === 200) {
        data = res.data;
        localStorage.setItem("user_id", data);
        setLoginValidationTestResult(1);
        navigate("/Profile", { replace: true });
      }
    }).catch((err) => {
      if (err.status === 401) {
        console.log("email not found");
        setLoginValidationTestResult(2);
      }
      if (err.status === 404) {
        setLoginValidationTestResult(3);
      }
    });
  }

  return (
    <div className="min-h-screen flex justify-center flex-col">
      <h1 className="text-center text-6xl ">Login</h1>
      <div className="flex justify-center mt-10 min-w-[50%]">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                email
              </label>
              <input
                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" +
                  (loginValidationTestResult == 3 ? " border-red-500" : "")}
                id="username"
                type="text"
                placeholder="Username"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" +
                  (loginValidationTestResult > 1 ? " border-red-500" : "")}
                id="password"
                type="password"
                placeholder="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none w-full focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
