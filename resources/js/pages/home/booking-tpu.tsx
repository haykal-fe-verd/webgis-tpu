import React from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

import { PageProps, Pemakaman } from "@/types";

import GuestLayout from "@/layouts/guest-layout";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { hitungSisaPemakaman } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BookingTpuProps extends PageProps {
    pemakaman: Pemakaman;
}

function BookingTpu() {
    // hooks
    const { pemakaman } = usePage<BookingTpuProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        hp: "",
        sebagai: "",
        nik: "",
        id_pemakaman: pemakaman.id,
    });

    // events
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("booking-tpu.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Booking TPU" />

            <section
                id="booking-tpu"
                className="container my-5 min-h-[calc(100vh-60px)] space-y-5"
            >
                <div>
                    <Link
                        href={route("daftar")}
                        className="flex items-center gap-2 text-muted-foreground"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Kembali</span>
                    </Link>
                </div>

                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-bold">
                        Pemesanan TPU {pemakaman.nama_pemakaman}
                    </h1>
                    <Separator />

                    <div className="flex flex-col lg:flex-row justify-between gap-5">
                        <Card className="w-full rounded-md">
                            <CardContent className="p-5">
                                <form onSubmit={onSubmit} className="space-y-5">
                                    <div>
                                        <Label htmlFor="sebagai">
                                            Daftar Sebagai
                                        </Label>
                                        <Select
                                            value={data.sebagai}
                                            onValueChange={(e) =>
                                                setData("sebagai", e)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Daftar Sebagai..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="warga">
                                                        Warga
                                                    </SelectItem>
                                                    <SelectItem value="non warga">
                                                        Non Warga
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        <InputError message={errors.sebagai} />
                                    </div>

                                    <div>
                                        <Label htmlFor="nik">NIK</Label>
                                        <Input
                                            type="text"
                                            id="nik"
                                            name="nik"
                                            placeholder="NIK"
                                            value={data.nik}
                                            onChange={(e) =>
                                                setData("nik", e.target.value)
                                            }
                                            autoFocus
                                        />
                                        <InputError message={errors.nik} />
                                    </div>

                                    <div>
                                        <Label htmlFor="name">Nama</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Jhon Doe"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="jhondoe@example.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div>
                                        <Label htmlFor="hp">No HP</Label>
                                        <Input
                                            type="text"
                                            id="hp"
                                            name="hp"
                                            placeholder="08xxxxxxx"
                                            value={data.hp}
                                            onChange={(e) =>
                                                setData("hp", e.target.value)
                                            }
                                        />
                                        <InputError message={errors.hp} />
                                    </div>

                                    <p className="text-sm">
                                        <span className="text-destructive">
                                            *Note
                                        </span>{" "}
                                        : Untuk booking lahan TPU wajib
                                        mendaftar ke P3F Gampong
                                    </p>

                                    <Button
                                        disabled={processing}
                                        className="inline-flex gap-2 items-center w-fit"
                                    >
                                        {processing && (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        )}
                                        <span>
                                            Daftar P3F Untuk Memesan Lahan
                                        </span>
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-5">
                            <img
                                src={`/tpu-images/${pemakaman.image}`}
                                alt={`@${pemakaman.nama_pemakaman}`}
                                className="w-full h-[330px] object-cover border border-border rounded-md"
                            />

                            <div className="flex flex-col gap-5 w-full">
                                <h1 className="text-2xl font-bold">
                                    Detail TPU
                                </h1>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="w-[200px]">
                                                Nama TPU
                                            </td>
                                            <td>:</td>
                                            <td>{pemakaman.nama_pemakaman}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-[200px]">
                                                Alamat
                                            </td>
                                            <td>:</td>
                                            <td>{pemakaman.alamat}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-[200px]">Luas</td>
                                            <td>:</td>
                                            <td>
                                                {pemakaman.luas} m<sup>2</sup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-[200px]">
                                                Kapasitas
                                            </td>
                                            <td>:</td>
                                            <td>{pemakaman.kapasitas} Jiwa</td>
                                        </tr>
                                        <tr>
                                            <td className="w-[200px]">
                                                Tersedia
                                            </td>
                                            <td>:</td>
                                            <td>
                                                {hitungSisaPemakaman(
                                                    pemakaman.kapasitas,
                                                    pemakaman.terpakai
                                                )}{" "}
                                                Jiwa
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="w-[200px]">
                                                Keterangan
                                            </td>
                                            <td>:</td>
                                            <td>
                                                {pemakaman.keterangan ?? "-"}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="w-[200px]">
                                                Nama Penanggung Jawab
                                            </td>
                                            <td>:</td>
                                            <td>{pemakaman.user?.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-[200px]">No HP</td>
                                            <td>:</td>
                                            <td>{pemakaman.user?.phone}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

export default BookingTpu;
