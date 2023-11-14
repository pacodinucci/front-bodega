import axios from "axios";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import Currency from "@/components/ui/Currency";
import { Separator } from "./ui/Separator";
import { SiMercadopago } from "react-icons/si"
import Button from "./ui/Button";

interface CustomerData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
}

interface Item {
    id: string;
    name: string;
    price: string;
}

interface OrderConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
    shipmentValue: number;
    customerData: CustomerData;
    selectedOption: string;
    items: Item[];
}


const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ isOpen, onClose, totalAmount, shipmentValue, customerData, selectedOption, items }) => {

    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id),
            shipmentValue
        });
        console.log(response.data)
        window.location = response.data.url;
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div>

                <div className="flex flex-col gap-6 w-full text-slate-900">
                    <h2 className="w-full text-xl">Detalles de la Orden</h2>
                    <Separator className="bg-slate-400 py-1/2" />
                    <div>Nombre: {customerData.firstName} {customerData.lastName}</div>
                    <Separator className="bg-slate-400 py-1/2" />
                    {items.map((item, index) => (
                        <div className="flex justify-between">
                            <div>
                                <h2>{item.name}</h2>
                                <p className="text-gray-500 text-sm">Caja x 6 botellas.</p>
                            </div>
                            <div>
                                <Currency value={Number(item.price)} />
                            </div>
                        </div>
                    ))}
                    {/* <Separator className="bg-slate-400 py-1/2" /> */}
                    <div className="flex flex-col justify-between gap-2">
                        <h3>Método de envío:</h3>
                        <div className="flex">
                            <p className="text-sm">
                                {selectedOption === 'Shipnow' ?
                                `Entrega Shipnow (servicio externo de logística) en ${customerData.address}, ${customerData.city}.` :
                                'Retira el comprador por Roque Pérez 4263, timbre C7, Saavedra, Capital Federal.'}
                            </p>
                            <Currency value={shipmentValue} />
                        </div>
                    </div>
                    <Separator className="bg-slate-400 py-1/2" />
                    <div className="flex justify-between">Total a Pagar: <Currency value={totalAmount} /></div>
                </div>
                <div className="mt-6 flex justify-between">
                    <Button onClick={onCheckout} className="rounded-sm px-2 flex gap-2 items-center font-thin bg-blue-600">Ir a pagar con MercadoPago <SiMercadopago size={30} /></Button>
                    <Button className="rounded-sm font-thin bg-slate-800" disabled={selectedOption === 'Shipnow'}>Pagar en efectivo</Button>
                </div>
            </div>
        </Modal>
    );
};

export default OrderConfirmationModal;