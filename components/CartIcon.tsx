"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

import useCart from "@/hooks/use-cart";

const CartIcon = () => {

    const [isMounted, setIsMounted] = useState(false);

    const cart = useCart();
    const itemsCount = cart.items.length;

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    };

    return (
        itemsCount > 0 ? (
            <div className="fixed bottom-5 right-5 bg-transparent text-green-600 rounded-full opacity-70 hover:opacity-100 hover:cursor-pointer">
                <div className="px-4 pt-4">
                    <ShoppingCart size={40} />
                    <span className="relative bottom-8 left-5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 bg-green-700 rounded-full">{itemsCount}</span>
                </div>
            </div>
        ) : null
    )
}

export default CartIcon;