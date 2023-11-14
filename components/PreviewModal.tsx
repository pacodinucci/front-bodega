"use client";

import { MouseEventHandler, useEffect } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import Modal from "@/components/ui/Modal";
import { formatter } from "@/lib/utils";
import useCart from "@/hooks/use-cart";
import Button from "./ui/Button";
// import Gallery from "@/components/gallery";
// import Info from "@/components/Info";

const PreviewModal = () => {

    const PreviewModal = usePreviewModal();
    const product = usePreviewModal((state) => state.data);
    const cart = useCart();

    if (!product) {
        return null;
    };

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        cart.addItem(product);
        PreviewModal.onClose();
    }

    return (
        <Modal
            open={PreviewModal.isOpen}
            onClose={PreviewModal.onClose}
        >
            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                    {/* <Gallery images={product.images} /> */}
                    <Image
                        src={product?.images[0].url}
                        width={400}
                        height={0}
                        alt="Image"
                        className="aspect-square object-cover rounded-md"
                    />
                </div>
                <div className="sm:col-span-8 lg:col-span-7 flex flex-col justify-between h-full">
                    <div className="flex flex-col">
                        <div>
                            <h1 className="font-bold text-lg">{product.name}</h1>
                        </div>
                        <div className="flex justify-between mt-2">
                            <h3>{product.size.name}</h3>
                            <h2>{formatter.format(Number(product.price))}</h2>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Este vino encarna una rica paleta de sabores, con notas de roble y frutas maduras. Perfecto para cenas elegantes o como regalo, su cuerpo equilibrado y su acabado persistente deleitarán a cualquier amante del vino. Ideal para acompañar carnes y quesos curados.</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button className="flex gap-4 py-2 bg-green-500" onClick={onAddToCart}>
                            <p className="font-normal">Agregar al carrito</p>
                            <ShoppingCart />
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
};

export default PreviewModal;