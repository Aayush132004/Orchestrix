"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const Appbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    const isLanding = pathname === '/';

    return (
        <div className={`w-full sticky top-0 z-50 transition-all duration-500 ${
            isLanding
                ? scrolled
                    ? 'bg-[#0a0f0a]/90 backdrop-blur-xl border-b border-[rgba(163,230,53,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
                    : 'bg-transparent border-b border-transparent'
                : 'bg-[#0a0f0a]/90 backdrop-blur-xl border-b border-[rgba(163,230,53,0.12)]'
        }`}>
            <div className="max-w-6xl mx-auto w-full flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <div
                    className="flex items-center gap-2.5 cursor-pointer select-none group"
                    onClick={() => router.push('/')}
                >
                    {/* Actual site logo - no background block */}
                    <img
                        src="/logo.png"
                        alt="Orchestrix"
                        className="w-9 h-9 object-contain rounded-xl group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_rgba(163,230,53,0.5)] transition-all duration-300"
                    />
                    {/* Wordmark */}
                    <span className="text-[1.15rem] font-black tracking-[-0.02em] text-white group-hover:text-[#a3e635] transition-colors duration-300 leading-none">
                        Orchestrix
                    </span>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="text-sm font-medium text-[#9ca3a0] hover:text-white transition-colors duration-200"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-semibold px-4 py-2 rounded-xl border border-[rgba(163,230,53,0.2)] text-[#a3e635] hover:bg-[rgba(163,230,53,0.08)] transition-all duration-200"
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => router.push("/login")}
                                className="text-sm font-medium text-[#9ca3a0] hover:text-white transition-colors duration-200"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => router.push("/signup")}
                                className="btn-lime text-sm px-5 py-2.5"
                            >
                                Get Started
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Appbar