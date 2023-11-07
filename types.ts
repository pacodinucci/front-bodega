export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
};

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
};

export interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    size: Size;
    variedad: Variedad;
    isFeatured: boolean;
    images: Image[];
    stock: Number;
    weight: Number;
}

export interface Image {
    id: string;
    url: string;
}

export interface Size {
    id: string;
    name: string;
    value: string;
}

export interface Variedad {
    id: string;
    name: string;
    value: string;
}

export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    mail: string;
    address: string;
    zip_code: Number;
    city: string;
    country: string;
    phone: string;
}