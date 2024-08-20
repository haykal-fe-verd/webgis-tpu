import React from "react";
import { Head } from "@inertiajs/react";

import GuestLayout from "@/layouts/guest-layout";

function Tutorial() {
    return (
        <GuestLayout>
            <Head title="Tutorial" />

            <section id="tutorial" className="py-5 space-y-5 container">
                <div>
                    <h1 className="text-2xl font-bold text-center">
                        Panduan Penggunaan WebGIS
                    </h1>
                </div>
            </section>
        </GuestLayout>
    );
}

export default Tutorial;
