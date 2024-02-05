"use client";

import { useState } from 'react';
import {auth, googleProvider} from '../../config/firebase-config'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword , signInWithPopup, signOut} from 'firebase/auth'
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [match, setMatch] = useState(false);

    const router = useRouter();

    const signUp = async () => {
        try{
            if (password === confirm){
                await createUserWithEmailAndPassword(auth, email, password);
                router.push('/dashboard')
            } else {
                setMatch(false)
            }
        } catch (err) {
            console.error(err.message)
        }
    };

    const googleSignUp = async () => {
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
                <h1 className='self-start text-xl font-bold'>Sign Up</h1>
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
                <input 
                    placeholder='Confirm Password'
                    type='password'
                    onChange={(e) => setConfirm(e.target.value)}
                    className='border-black border-2 w-full h-12 px-3 mt-4 focus:outline-none'
                />
                <button 
                    onClick={signUp}
                    className='w-full h-12 bg-black text-white mt-4'> 
                    Sign Up
                </button>
                <div className='flex justify-center w-full mt-6 gap-2'>
                    <p>Have an account?</p>
                    <Link href='/login' className='underline underline-offset-2'>
                        Sign In
                    </Link>
                </div>
                <p className='mt-4'>or sign up with</p>
                <button 
                className='flex justify-center items-center h-10 w-10 border-black border-2 rounded-full mt-4'
                onClick={googleSignUp}>
                    <FaGoogle />
                </button>
            </div>
        </div>
    )
}

export default page