import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

function GuestFooter() {
    return (
        <footer className="flex flex-col items-center justify-center py-5 gap-5 mt-5 bg-primary text-primary-foreground">
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5 container">
                <div className="w-full flex items-center gap-3">
                    <Phone className="w-10 h-10" />
                    <div className="flex items-start flex-col">
                        <h1>Hubungi Kami</h1>
                        <h2>081212121212</h2>
                    </div>
                </div>
                <div className=" w-full flex items-center gap-3 lg:justify-center">
                    <MapPin className="w-10 h-10" />
                    <div className="flex items-start flex-col">
                        <h1>Alamat</h1>
                        <h2>Jln. Test No. 123, Aceh</h2>
                    </div>
                </div>
                <div className="w-full flex items-center gap-3 lg:justify-end">
                    <Mail className="w-10 h-10" />
                    <div className="flex items-start flex-col">
                        <h1>Email</h1>
                        <h2>test@example.com</h2>
                    </div>
                </div>
            </div>
            <Separator />
            <p className="text-sm">
                Copyright &copy; {new Date().getFullYear()}. All rights reserved
            </p>
        </footer>
    );
}

export default GuestFooter;
