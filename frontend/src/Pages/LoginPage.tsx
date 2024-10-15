import { useState } from "react";

interface LoginPageProps {
  username: string;
  password: string;
}

function LoginPage() {


  const [loginDate, setLoginDate] = useState<LoginPageProps>({
    username: "",
    password: "",
  })

  const [loginValidationTestResult, setLoginValidationTestResult] = useState<number>(0);
  // 0: not tested
  // 1: valid
  // 2: email not valid
  // 3: password not valid

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginValidationTestResult(2);

    //TODO:check if the user is valid

  }

  return (
    <div>
      <h1 className="text-center text-6xl ">Login</h1>
      <div className="flex justify-center mt-10 min-w-[50%]">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => { handleSubmit(e) }}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={loginDate.username}
                onChange={(e) => setLoginDate({ ...loginDate, username: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="password"
                value={loginDate.password}
                onChange={(e) => setLoginDate({ ...loginDate, password: e.target.value })}
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

  )
}

export default LoginPage
