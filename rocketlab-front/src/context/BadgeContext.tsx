import { createContext, useState, ReactNode } from "react";
import { cartLength } from "../services/CartServices";

type BadgeContextType = {
    badgeCount: number;
    incrementBadge: () => void;
    decrementBadge: () => void;
    restartBadge: () => void;
};

const defaultValue: BadgeContextType = {
    badgeCount: cartLength(),
    incrementBadge: () => {},
    decrementBadge: () => {},
    restartBadge: () => {}
};

type BadgeProviderProps = {
    children: ReactNode;
};

export const BadgeContext = createContext<BadgeContextType>(defaultValue);

export const BadgeProvider = ({ children }: BadgeProviderProps) => {
    const [badgeCount, setBadgeCount] = useState(cartLength);

    const incrementBadge = () => {
        setBadgeCount(prevBadge => prevBadge + 1);
    }

    const decrementBadge = () => {
        setBadgeCount(prevBadge => prevBadge - 1);
    }

    const restartBadge = () => {
        setBadgeCount(0);
    }

    return (
        <BadgeContext.Provider value={{ badgeCount, incrementBadge, decrementBadge, restartBadge }}>
            {children}
        </BadgeContext.Provider>
    );
};