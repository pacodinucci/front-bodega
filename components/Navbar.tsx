"use client";

import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {

    const router = useRouter();

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
                <ShoppingCart size={20} className="mr-12 cursor-pointer text-white hover:scale-110 transition-transform" onClick={() => router.push("/cart")} />
            </div>
        </nav>
    )
};

export default Navbar;