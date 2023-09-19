import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import JF from "jotform"

const JF = window.JF;

export const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e?.preventDefault()
        //JF.login(success, error) method takes two optional arguments
        //Both arguments should be function 
        //First argument will be called after successful login
        //Second argument will be called if authorization fails
        JF.login(
            function success() {
                JF.getForms(function (response) {
                    console.log("res:", response)
                    const apiKey = JF.getAPIKey();
                    JF.initialize( {apiKey: apiKey} ); 
                    localStorage.setItem("authenticated", true);
                    navigate("/");
                });
            },

            function error() {
                window.alert("Could not authorize user");
            }
        );

    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                            Sign in using your jotform account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Connect to Jotform</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Login;