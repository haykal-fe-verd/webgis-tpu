import React from "react";
import { Head, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import GuestLayout from "@/layouts/guest-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
    // hooks
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    // events
    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            <div className="min-h-[calc(100vh-150px)] flex flex-col sm:justify-center items-center">
                <Card className={cn("w-full sm:max-w-md shadow-md")}>
                    <CardContent className={cn("p-6")}>
                        <h1 className="font-bold text-center text-2xl">
                            Lupa Password
                        </h1>

                        <form onSubmit={onSubmit} className="space-y-5 mt-5">
                            <div className="text-muted-foreground">
                                Lupa kata sandi? Tidak masalah. Cukup beri tahu
                                kami alamat email Anda dan kami akan mengirimkan
                                tautan untuk menyetel ulang kata sandi melalui
                                email yang akan memungkinkan Anda memilih kata
                                sandi baru.
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="flex items-center justify-between">
                                <Button
                                    disabled={processing}
                                    className="w-full inline-flex items-center justify-center gap-2"
                                >
                                    {processing && (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    )}
                                    <span>Kirim Link Reset Password</span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
