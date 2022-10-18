import React from "react"
import Image from "next/image"
import { MenuIcon, SearchCircleIcon, ShoppingCartIcon } from "@heroicons/react/outline"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSelector } from "react-redux"
import { selectItems } from '../slices/basketSlice'

function Header() {
    const { data } = useSession()
    const router = useRouter()
    const items = useSelector(selectItems).length

    return (
        <header className="sticky top-0 z-50">
            {/* top nav */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                {/* logo div */}
                <div onClick={() => router.push('/')} className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image src="https://links.papareact.com/f90" width={150} height={40} objectFit="contain" className="cursor-pointer"
                    />
                </div>
                {/* search div */}
                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
                    <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
                    <SearchCircleIcon className="h-12 p-4" />
                </div>

                {/* right */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-narrow">

                    <div onClick={!data ? signIn : signOut} className="link">
                        <p className="hover:underline">Hello {data?.user?.name.toUpperCase() ?? 'Sign In'}</p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>
                    <div className="link">
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <div onClick={() => router.push('/checkout')} className="link flex items-center">
                        <span className="absolute top-2 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{items}</span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
                    </div>

                </div>
            </div>

            {/* bottom nav */}
            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p className="link flex items-center">
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Buisness</p>
                <p className="link">Today's Deals</p>
                <p className="link hidden lg:inline-flex">Electronics</p>

                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Buy Again</p>
                <p className="link hidden lg:inline-flex">Health & Personal Care</p>
            </div>

        </header>
    )
}

export default Header