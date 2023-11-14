"use client";

import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";

import Currency from "@/components/ui/Currency";
import useCustomerDataModal from "@/hooks/use-customer-data";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Separator } from "@radix-ui/react-separator";
import getCostumer from "@/actions/get-costumer";
import getShipnowPrice from "@/actions/get-shipnow";

const Summary = () => {
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);
    const [totalAmount, setTotalAmount] = useState(0);
    const [shipnowPrice, setShipnowPrice] = useState(0);
    const [selectedOption, setSelectedOption] = useState("Shipnow");
    const [shipmentValue, setShipmentValue] = useState(shipnowPrice);
    const customerDataModal = useCustomerDataModal();

    const [customerData, setCustomerData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        zipCode: ''
    })

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price);
    }, 0)

    const inputChange = (e: any) => {
        setCustomerData({
            ...customerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // console.log(customerData)

        try {
            // Paso 1: Verificar si ya existe un cliente con ese email
            const response = await getCostumer(customerData.email)
            // console.log(response)

            if (response) {
                // El cliente ya existe
                console.log("Cliente ya existe: ", response);
                customerDataModal.onClose();
            } else {
                // Paso 2: Crear un nuevo cliente
                const createResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(customerData)
                });

                const newClient = await createResponse.json();
                console.log("Nuevo cliente creado: ", newClient);
                customerDataModal.onClose();
            }
        } catch (error) {
            console.error("Error al manejar el formulario:", error);
        }
    }

    useEffect(() => {
        async function fetchShipnowPrice() {
            try {
                const totalWeight = items.reduce((accumulator, item) => accumulator + item.weight.valueOf(), 0);
                const zipCode = Number(customerData.zipCode);
                const result = await getShipnowPrice(totalWeight, zipCode);
                console.log("Shipnow Price: ", result);
                setShipnowPrice(result);

                const calculatedShipmentValue = Number(result);
                setShipmentValue(calculatedShipmentValue);

                const calculatedTotalAmount = Number(totalPrice) + Number(result);
                setTotalAmount(calculatedTotalAmount);
                console.log(totalAmount)
            } catch (error) {
                console.error("Error while requesting Shipnow price", error);
            }
        }

        if(customerData.zipCode) {
            fetchShipnowPrice();
        }
    }, [shipnowPrice, customerData])

    useEffect(() => {
        const result = Number(totalPrice) + Number(shipmentValue);
        setTotalAmount(result);
    }, [totalPrice, shipmentValue]);

    return (
        <>
            <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                <h1 className="text-lg font-semibold text-gray-900 pb-2">
                    Resumen de orden
                </h1>
                <Separator />
                {customerData.zipCode ? (
                    <>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4 my-4">
                            <div className="text-lg font-large text-gray-900">
                                Subtotal
                            </div>
                            <Currency value={totalPrice} />
                        </div>
                        <div className="flex flex-col justify-between border-t border-gray-200 pt-4">
                            <div className="text-lg font-medium text-gray-900">
                                Envío
                            </div>
                            <div className="flex flex-col justify-between pt-4">
                                <div className="flex justify-between w-full">
                                    <div className="text-base font-medium text-gray-900">
                                        <label className="flex gap-2 items-center">
                                            <input
                                                type="radio"
                                                value="Shipnow"
                                                checked={selectedOption === "Shipnow"}
                                                onChange={() => {
                                                    setSelectedOption('Shipnow');
                                                    setShipmentValue(shipnowPrice);
                                                }} />
                                            Shipnow
                                        </label>
                                    </div>
                                    <Currency value={shipnowPrice} disabled={selectedOption !== "Shipnow"} />
                                </div>
                                <p className={`text-sm mt-4 ${selectedOption === 'Shipnow' ? 'text-gray-400' : 'text-gray-200'}`}>{`Shipnow entregará en ${customerData.address}, ${customerData.city}`}</p>
                            </div>
                            <div className="flex flex-col justify-between items-center pt-4">
                                <div className="flex justify-between w-full">
                                    <div className="text-base font-medium text-gray-900">
                                        <label className="flex gap-2 items-center">
                                            <input
                                                type="radio"
                                                value="Pick-up"
                                                checked={selectedOption === "Pick-up"}
                                                onChange={() => {
                                                    setSelectedOption('Pick-up');
                                                    setShipmentValue(0)
                                                }} />
                                            Pick-Up
                                        </label>
                                    </div>
                                    <Currency value='0' disabled={selectedOption !== "Pick-up"} />
                                </div>
                                <p className={`text-sm mt-4 ${selectedOption === 'Pick-up' ? 'text-gray-400' : 'text-gray-200'}`}>Se retira por Roque Perez 4263, barrio Saavedra, Capital Federal.</p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 border-t py-4">
                            <h1 className="text-xl font-large text-gray-900">
                                Total a pagar
                            </h1>
                            <Currency value={totalAmount} />
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="mb-4">
                            Para poder ver los detalles de la orden y continuar con la compra, por favor completar los
                            <a className="text-blue-500 cursor-pointer" onClick={customerDataModal.onOpen}> datos de entrega.</a>
                        </h1>
                        <Separator />
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <div className="text-lg font-large text-gray-900">
                                Subtotal
                            </div>
                            <Currency value={totalPrice} />
                        </div>
                    </>

                )}
            </div>
            <Modal open={customerDataModal.isOpen} onClose={customerDataModal.onClose}>
                <div className="flex flex-col gap-6 w-full">
                    <h2 className="w-full">Por favor, completá los datos para cotizar el envío:</h2>
                    <form className="w-full flex flex-col items-center gap-6" onSubmit={handleSubmit}>
                        <div className="flex w-full gap-12 justify-center">
                            <div className="flex flex-col">
                                <input type="text" name="firstName" className="text-lg border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none" autoFocus onChange={inputChange} />
                                <label className="text-gray-400 text-sm">Nombre</label>
                            </div>
                            <div className="flex flex-col">
                                <input type="text" name="lastName" className="text-lg border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none" onChange={inputChange} />
                                <label className="text-gray-400 text-sm">Apellido</label>
                            </div>
                        </div>
                        <div className="flex w-full gap-12 justify-center">
                            <div className="flex flex-col">
                                <input type="email" name="email" className="text-lg border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none" autoFocus onChange={inputChange} />
                                <label className="text-gray-400 text-sm">Email</label>
                            </div>
                            <div className="flex flex-col">
                                <input type="text" name="phone" className="text-lg border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none" onChange={inputChange} />
                                <label className="text-gray-400 text-sm">Teléfono</label>
                            </div>
                        </div>
                        <div className="flex w-full gap-12 justify-center">
                            <div className="flex flex-col">
                                <input type="text" name="address" className="text-lg border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none" onChange={inputChange} />
                                <label className="text-gray-400 text-sm">Dirección</label>
                            </div>
                            <div className="flex flex-col">
                                <input type="text" name="city" className="text-lg border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none" onChange={inputChange} />
                                <label className="text-gray-400 text-sm">Ciudad</label>
                            </div>
                        </div>
                        <div className="flex gap-12 justify-center" >
                            <div className="flex flex-col">
                                <input type="text" name="zipCode" className="text-lg border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none" onChange={inputChange} />
                                <label className="text-gray-400 text-sm">Código Postal</label>
                            </div>
                            <div className="flex flex-col">
                                <input type="text" name="country" className="text-lg border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none" onChange={inputChange} />
                                <label className="text-gray-400 text-sm">País</label>
                            </div>
                        </div>
                        <Button type="submit" className="mt-8 w-1/3 p-1">
                            Enviar
                        </Button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default Summary;