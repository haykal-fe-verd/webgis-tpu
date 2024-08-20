import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
    // hooks
    const { post, processing } = useForm({});

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            <div className="min-h-[calc(100vh-150px)] flex flex-col sm:justify-center items-center">
                <Card className={cn("w-full sm:max-w-md shadow-md")}>
                    <CardContent className={cn("p-6")}>
                        <h1 className="font-bold text-center text-2xl">
                            Verifikasi Email
                        </h1>

                        <form onSubmit={onSubmit} className="space-y-5 mt-5">
                            <div className="text-muted-foreground">
                                Terima kasih telah mendaftar! Sebelum memulai,
                                dapatkah Anda memverifikasi alamat email Anda
                                dengan mengeklik tautan yang baru saja kami
                                kirimkan kepada Anda? Jika Anda tidak menerima
                                email tersebut, kami akan dengan senang hati
                                mengirimkan email lain kepada Anda.
                            </div>
                            <div className="flex items-center justify-between">
                                <Button
                                    disabled={processing}
                                    className="w-full inline-flex items-center justify-center gap-2"
                                >
                                    {processing && (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    )}
                                    <span>Kirim Ulang Email Verifikasi</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="text-sm mt-5 text-red-500"
                >
                    Logout
                </Link>
            </div>
        </GuestLayout>
    );
}
