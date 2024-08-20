import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hitungSisaPemakaman(kapasitas: number, terpakai: number) {
    return Math.max(0, kapasitas - terpakai);
}
