import {Link, useNavigate} from "react-router-dom";
import {MdCastForEducation} from "react-icons/md";

import { useState } from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function Login() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData, 
      [name]: value,
    })
  }

  const loginUser = async (e) => {
  
    e.preventDefault();
    
    try {
      dispatch(signInStart());
      const response = await axios.post(`http://localhost:5001/api/auth/login`, formData);
      const user = response.data;
      if(user){
        dispatch(signInSuccess(user));
        navigate('/');
      } 
      } catch (error) {
        dispatch(signInFailure(error.response.data.message));
      }
  }
  return (
    <section className="">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <Link
      to="/"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white gap-1"
    >
      <MdCastForEducation/>
      <span>Online Learning Platform</span>
      
    </Link>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Login to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={loginUser}>
          <div>
           {error && <p className="text-white text-center p-3 bg-red-500 rounded-lg text-sm">{error}</p>}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <Link
              to="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </Link>
          </div>
          <button
          disabled={loading}
            type="submit"
            className="uppercase w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Register
            </Link>
          </p>
          <OAuth/>
        </form>
      </div>
    </div>
  </div>
</section>

  )
}

export default Login