"use client";

import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from '../../config/firebase-config'
import { useRouter } from 'next/navigation'
import FileItem from '@/components/bot_settings/FileItem';
import SideBar from '@/components/navbars/SideBar';
import TopBar from '@/components/navbars/TopBar';

function page() {
    const [email, setEmail] = useState('');

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setEmail(user.email);
          } else {
            setEmail(null);
            router.push('/login')
          }
        });
    
        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    
      }, []); 

      const signOut = async () => {
        try {
            await auth.signOut();
            router.push('/login');
        } catch (error) {
            // An error happened.
            console.error("Error signing out:", error);
        }
    }

    return (
        <div>
            <TopBar />
            <SideBar />
            <div className='fixed top-16 left-56 flex-1 bg-slate-200 p-6 mid-dashboard-h mid-dashboard-w'>
                <h1>Welcome {email}</h1>
                <FileItem />
                <button onClick={signOut}>Sign Out</button>
            </div>
        </div>
    )
}

export default page