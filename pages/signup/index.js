import { useState,useRef, } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { userAgent } from 'next/server';
import axios from 'axios';

const Signup= ()=>{
    const router = useRouter();
    const [credentials,setCredentials] = useState({
        username:'',
        email:'',
        password:''
    })

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const res = await axios.post('http://localhost:3000/api/signup',credentials)
        console.log(res.data);
        if(res.status===200){
            alert('user signed up Successfully');
            router.push(`/profile/${username}`);
        }
        else {
            alert('user signup Failed');
            router.push('/signup');
        }
        await setCredentials({
            username:'',
            email:'',
            password:''
        })
    }
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
          <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800"
              >
                username
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={(e) => setCredentials((prevState) => ({ ...prevState, username: e.target.value }))}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
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
                onChange={(e) => setCredentials((prevState) => ({ ...prevState, email: e.target.value }))}
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
                onChange={(e) => setCredentials((prevState) => ({ ...prevState, password: e.target.value }))}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-2">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                signup
              </button>
            </div>
          </form>
  
          <p className="mt-4 text-sm t  ext-center text-gray-700">
           already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              login
            </Link>
          </p>
        </div>
      </div>
    );
  }
  

export default Signup;