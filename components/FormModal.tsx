import { ChangeEventHandler, FormEventHandler } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";

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

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    customerData: CustomerData;
    inputChange: ChangeEventHandler<HTMLInputElement>;
    onSubmit: FormEventHandler<HTMLFormElement>;
}
    

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, customerData, inputChange, onSubmit }) => {
    return (

        <Modal open={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-6 w-full">
                <h2 className="w-full">Por favor, completá los datos para cotizar el envío:</h2>
                <form className="w-full flex flex-col items-center gap-6" onSubmit={onSubmit}>
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
                    <Button type="submit" className="mt-8 w-1/3 p-1 rounded-sm bg-blue-500">
                        Enviar
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

export default FormModal;

