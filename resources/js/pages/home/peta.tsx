import React from "react";
import { Head } from "@inertiajs/react";

import GuestLayout from "@/layouts/guest-layout";

function Peta() {
    return (
        <GuestLayout>
            <Head title="Peta" />

            <section id="peta" className="py-5 space-y-5 container">
                <div>
                    <h1 className="text-2xl font-bold text-center">Peta</h1>
                </div>
            </section>
        </GuestLayout>
    );
}

export default Peta;
