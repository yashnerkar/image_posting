import { useState,useRef } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { userAgent } from 'next/server';
import axios from 'axios';

const Login = ()=>{ 
    const router = useRouter();
    const [credentials,setCredentials] = useState({
        email:'',
        password:''
    })
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const res = await axios.post('http://localhost:3000/api/login',credentials)
        console.log(res)
        const username = res.data.userData.username;
        console.log(username)
        if(res.status===200){
            alert('Login Success');
            router.push(`/profile/${username}`);
        }
        else {
            alert('Login Failed');
            router.push('/login');
        }
    }
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={(e)=>setCredentials({...credentials,email:e.target.value})}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={(e)=>setCredentials({...credentials,password:e.target.value})}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <Link
              href="/forget"
              className="text-xs text-blue-600 hover:underline"
            >
              Forget Password?
            </Link>
            <div className="mt-2">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Login
              </button>
            </div>
          </form>
  
          <p className="mt-4 text-sm t  ext-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }
  

export default Login;