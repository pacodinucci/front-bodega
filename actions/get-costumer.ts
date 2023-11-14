import { Client } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/clients`;

const getCostumer= async (mail: string): Promise<Client> => {
    const res = await fetch(`${URL}/${mail}`);
    const data = await res.json();
    
    return data.costumer;
}

export default getCostumer;