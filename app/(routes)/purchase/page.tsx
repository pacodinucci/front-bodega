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
    const [countdown, setCountdown] = useState(10);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Pago completado.")
            removeAll();
        }
    }, [])

    useEffect(() => {
        // Si countdown llega a 0, activar la redirección y detener el temporizador
        if (countdown === 0) {
            setRedirect(true);
            return;
        }

        // Temporizador para disminuir el contador cada segundo
        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        // Limpieza del temporizador
        return () => clearTimeout(timer);
    }, [countdown]);

    // Redirigir cuando redirect es true
    useEffect(() => {
        if (redirect) {
            window.location.href = '/'; // Cambia esto por tu ruta de inicio
        }
    }, [redirect]);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="bg-white">
            <Container>
                <div className="absolute left-0 top-0 flex w-screen h-screen bg-purchase bg-cover">
                    <div className="flex flex-col gap-12 justify-center items-center rounded-md px-4 py-16 bg-black bg-opacity-50 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-12">
                            <Image
                                src="/logogaviotas.svg"
                                alt="Logo gaviotas"
                                width={150}
                                height={0}
                            />
                            <h1 className="text-3xl font-bold text-white">Gracias por tu compra!</h1>
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Recibirás un mail con todos los detalles de tu orden.</h3>
                        <p className="text-white">Serás redirigido en {countdown} segundos...</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default PurchasePage;