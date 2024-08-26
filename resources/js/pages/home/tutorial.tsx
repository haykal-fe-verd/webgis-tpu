import React from "react";
import { Head, usePage } from "@inertiajs/react";

import { Isi, PageProps } from "@/types";

import GuestLayout from "@/layouts/guest-layout";

interface TutorialProps extends PageProps {
    isi: Isi;
}
function Tutorial() {
    // hooks
    const { isi } = usePage<TutorialProps>().props;

    return (
        <GuestLayout>
            <Head title="Tutorial" />

            <section id="tutorial" className="py-5 space-y-5 container">
                <div>
                    <h1 className="text-2xl font-bold text-center">
                        Panduan Penggunaan WebGIS
                    </h1>

                    <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: isi?.isi }}
                    />
                </div>
            </section>
        </GuestLayout>
    );
}

export default Tutorial;
