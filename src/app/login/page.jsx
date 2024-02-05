"use client";

import { useState, useEffect } from 'react';
import {auth, googleProvider} from '../../config/firebase-config'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword , signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth'
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            router.push('/dashboard')
          }
        });
    
        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    
      }, []); 

    const signIn = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard')
        } catch (err ) {
            console.log('error')
        }
    };

    const googleSignIn = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
            router.push('/dashboard')
        } catch (err) {
            console.log('error');
        }
    };

    return (
        <div className='flex w-screen min-h-screen justify-center items-center bg-white py-10 text-sm sm:text-base'>
            <div className='flex flex-col items-center sm:w-96 w-80 min-h-[500px] rounded-xl border-black border-2 p-6'>
                <h1 className='self-start text-xl font-bold'>Sign In</h1>
                <input 
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-black border-2 w-full h-12 px-3 mt-4 focus:outline-none'
                />
                <input 
                    placeholder='Password'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='border-black border-2 w-full h-12 px-3 mt-4 focus:outline-none'
                />
                <button 
                    className='w-full h-12 bg-black text-white mt-4'
                    onClick={signIn}
                > 
                    Sign In
                </button>
                <div className='flex justify-between w-full underline underline-offset-2 mt-6'>
                    <button>
                        Forgot Password?
                    </button>
                    <Link href='/register'>
                        Sign Up
                    </Link>
                </div>
                <p className='mt-6'>or sign in with</p>
                <button 
                    className='flex justify-center items-center h-10 w-10 border-black border-2 rounded-full mt-6'
                    onClick={googleSignIn}
                >
                    <FaGoogle />
                </button>
            </div>
        </div>
    )
}

export default page