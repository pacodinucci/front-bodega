"use client";

import { MouseEventHandler } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "@/types";
import { formatter } from "@/lib/utils";
import usePreviewModal from "@/hooks/use-preview-modal";

interface ProductCard {
    data: Product;
}

const ProductCard: React.FC<ProductCard> = ({
    data
}) => {
    const previewModal = usePreviewModal();
    const router = useRouter();
    // console.log(data)

    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    const onPreview: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();

        previewModal.onOpen(data);
    }

    return (
        <div onClick={onPreview} className="w-full h-[60vh] px-6 py-4 botttom-5 border-2 rounded-sm cursor-pointer transition-all duration-500 hover:border-4 hover:shadow-lg">
            <div>
                <Image 
                    src={data?.images[0].url}
                    width={400}
                    height={0}
                    alt="Image"
                    className="aspect-square object-cover rounded-md transition-transform duration-500 hover:scale-105"
                />
            </div>
            <div className="py-4">
                <p className="font-semibold text-lg">
                    {data.name}
                </p>
                <p className="text-sm text-gray-500">
                    {data.category?.name}
                </p>
                <p className="text-md font-semibold mt-2">
                    {formatter.format(Number(data.price))}
                </p>
            </div>
        </div>
    )
}

export default ProductCard;