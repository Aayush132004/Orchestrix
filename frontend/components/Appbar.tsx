"use client"
//as using onClick so use client
import React from 'react'
import LinkButton from './buttons/LinkButton'
import PrimaryButton from './buttons/PrimaryButton'
import { useRouter } from 'next/navigation'

const Appbar = () => {
    const router = useRouter();
    
    return (
        <div className="flex border-b border-slate-100 justify-between items-center px-6 py-2 bg-white sticky top-0 z-50 shadow-sm">
            {/* Logo Section */}
            <div className="text-xl font-bold tracking-tight text-slate-900 cursor-pointer" onClick={() => router.push('/')}>
                Orchestrix
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center gap-4">
                <LinkButton onClick={() => {}}>
                    {/* //here not passed anythin to onClick because not having sales page if yes than via function redirect */}
                    Contact Sales
                </LinkButton>
                
                <LinkButton onClick={() => {
                    router.push("/login")
                }}>
                    Login
                </LinkButton>
                
                <PrimaryButton onClick={() => {
                    router.push("/signup")
                }}>
                    Signup
                </PrimaryButton>
            </div>
        </div>
    )
}

export default Appbar