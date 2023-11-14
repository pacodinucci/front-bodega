"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'USD'
});

interface CurrencyProps {
    value?: string | number;
    disabled?: boolean;
}

const Currency: React.FC<CurrencyProps> = ({
    value,
    disabled
}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    };

    if (disabled) {
        return (
            <div className="font-medium text-gray-400">
                {formatter.format(Number(value))}
            </div>
        )
    }

    return (
        <div className="font-semibold">
            {formatter.format(Number(value))}
        </div>
    );
}

export default Currency;