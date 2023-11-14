"use client";

import useCart from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar: React.FC = () => {

    const router = useRouter();
    const cart = useCart();

    const [isMounted, setIsMounted] = useState(false);
    const [cartItemsCount, setCartItemsCount] = useState(cart.items.length);

    useEffect(() => {
        setIsMounted(true);
        setCartItemsCount(cart.items.length);
    }, [cart])

    if (!isMounted) {
        return null;
    };

    return (
        <nav className='absolute w-full z-50 flex items-center justify-between pt-4 px-6'>
            <img src="logogaviotas.svg" alt="logo" className='h-[10vh] w-[10vw]' />
            <div>
                <ul className='flex text-white gap-12 mr-24 py-4 px-4 border-b border-white oswald.classname'>
                    <li className="cursor-pointer p-2 hover:bg-slate-200 hover:bg-opacity-10 hover:rounded-sm">LOS VINOS</li>
                    <li className="cursor-pointer p-2 hover:bg-slate-200 hover:bg-opacity-10 hover:rounded-sm">LA BODEGA</li>
                    <li className="cursor-pointer p-2 hover:bg-slate-200 hover:bg-opacity-10 hover:rounded-sm">BARRICA PROPIA</li>
                    <li className="cursor-pointer p-2 hover:bg-slate-200 hover:bg-opacity-10 hover:rounded-sm">EVENTOS</li>
                    <li className="cursor-pointer p-2 hover:bg-slate-200 hover:bg-opacity-10 hover:rounded-sm">CONTACTO</li>
                </ul>
            </div>
            <div>
                <ShoppingCart size={22} className="mr-12 cursor-pointer text-white hover:scale-125 hover:transition-transform" onClick={() => router.push("/cart")} />
                <span className="relative bottom-3 left-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-700 rounded-full">
                    {cartItemsCount}
                </span>
            </div>
        </nav>
    )
};

export default Navbar;