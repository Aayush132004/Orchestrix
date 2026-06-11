"use client"
import React, { useState, useEffect } from 'react'
import LinkButton from './buttons/LinkButton'
import PrimaryButton from './buttons/PrimaryButton'
import SecondaryButton from './buttons/SecondaryButton'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Appbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    return (
        <div className="w-full border-b border-[#e8e4df]/60 bg-[#faf9f6]/85 backdrop-blur-md sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
            <div className="max-w-5xl mx-auto w-full flex justify-between items-center px-6 py-3">
                {/* Logo Section */}
                <div className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900 cursor-pointer select-none group" onClick={() => router.push('/')}>
                    <Image 
                        src="/logo.png" 
                        alt="Orchestrix Logo" 
                        width={28} 
                        height={28} 
                        className="object-contain transition-transform group-hover:scale-105" 
                    />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-800">Orchestrix</span>
                </div>

                {/* Navigation Actions */}
                <div className="flex items-center gap-6">
                    {isLoggedIn ? (
                        <>
                            <LinkButton onClick={() => router.push('/dashboard')}>
                                Dashboard
                            </LinkButton>
                            <SecondaryButton onClick={handleLogout}>
                                Sign out
                            </SecondaryButton>
                        </>
                    ) : (
                        <>
                            <LinkButton onClick={() => router.push("/login")}>
                                Login
                            </LinkButton>
                            <PrimaryButton onClick={() => router.push("/signup")}>
                                Sign up
                            </PrimaryButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Appbar