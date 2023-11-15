"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import Container from "@/components/ui/Container";
import useCart from "@/hooks/use-cart";
import Image from "next/image";

const PurchasePage = () => {

    const searchParams = useSearchParams();
    const removeAll = useCart((state) => state.removeAll);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if(searchParams.get("success")) {
            toast.success("Pago completado.")
            removeAll();
        }
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <Image
                        src="/logogaviotas.svg"
                        alt="Logo gaviotas"
                        width={150}
                        height={0}
                    />
                    <h1 className="text-3xl font-bold text-black">Gracias por tu compra!</h1>
                </div>
            </Container>
        </div>
    )
}

export default PurchasePage;