import React from "react"
import Image from "next/image"
import { useSelector } from "react-redux"
import Currency from "react-currency-formatter"
import { signIn, signOut, useSession } from 'next-auth/react'
import Header from "../components/Header"
import { selectItems, getTotal } from "../slices/basketSlice"
import CheckoutProduct from "../components/CheckoutProduct"

function Checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(getTotal)
    const { data } = useSession()
    console.log('da', data, !data)

    return (
        <div className="bg-gray-100">
            <Header />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0 ? "Your Basket is Empty" : "Shopping Cart"}
                        </h1>
                        {items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                rating={item.rating}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </div>
                {/* Right */}
                <div>
                    {items.length > 0 && (
                        <>
                            <h2>Subtotal ({items.length} items):
                                <span className="font-bold">
                                    <Currency quantity={Number(total)} currency="GBP" />
                                </span>
                            </h2>
                            <button disabled={!data} className={`button mt-2 ${!data && 'from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed'}`}>
                                {!data ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout