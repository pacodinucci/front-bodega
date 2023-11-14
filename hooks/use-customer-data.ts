import { create } from 'zustand';

interface CustomerData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: number;
}

interface CustomerDataModalStore {
    isOpen: boolean;
    data: CustomerData;
    onOpen: () => void;
    onClose: () => void;
    updateData: (data: CustomerData) => void;
}

const useCustomerDataModal = create<CustomerDataModalStore>((set) => ({
    isOpen: false,
    data: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: 0,
    },
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    updateData: (data: CustomerData) => set({ data }),
}));

export default useCustomerDataModal;