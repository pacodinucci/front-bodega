"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "@/types";

interface ProductCard {
    data: Product;
}

const ProductCard: React.FC<ProductCard> = ({
    data
}) => {
    const router = useRouter();
    // console.log(data)

    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    }

    return (
        <div onClick={handleClick} className="w-full h-[60vh] px-6 py-4 botttom-5 border-2">
            <div>
                <Image 
                    src={data?.images[0].url}
                    width={400}
                    height={0}
                    alt="Image"
                    className="aspect-square object-cover rounded-md"
                />
            </div>
            <div className="py-4">
                <p className="font-semibold text-lg">
                    {data.name}
                </p>
                <p className="text-sm text-gray-500">
                    {data.category?.name}
                </p>
            </div>
        </div>
    )
}

export default ProductCard;