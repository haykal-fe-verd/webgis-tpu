import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

import {
    GampongResponse,
    KecamatanResponse,
    PageProps,
    PemakamanResponse,
} from "@/types";

import { hitungSisaPemakaman } from "@/lib/utils";
import GuestLayout from "@/layouts/guest-layout";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@/components/pagination";

interface DaftarTpuProps extends PageProps {
    pemakaman: PemakamanResponse;
}

function DaftarTpu() {
    // hooks
    const { get } = useForm();

    const { pemakaman } = usePage<DaftarTpuProps>().props;

    // states
    const [idKabupaten, setIdKabupaten] = React.useState<string>("");
    const [idKecamatan, setIdKecamatan] = React.useState<string>("");
    const [kecamatan, setKecamatan] = React.useState<KecamatanResponse[]>([]);
    const [idGampong, setIdGampong] = React.useState<string>("");
    const [gampong, setGampong] = React.useState<GampongResponse[]>([]);

    // events
    const onChangeKabupaten = async (e: string) => {
        setIdKabupaten(e);
        await getKecamatan(e);
    };

    const onChangeKecamatan = async (e: string) => {
        setIdKecamatan(e);
        await getGampong(e);
    };

    const onChangeGampong = async (e: string) => {
        setIdGampong(e);
    };

    const onCari = async () => {
        await get(
            route("daftar-tpu", {
                kabupaten: idKabupaten,
                kecamatan: idKecamatan,
                gampong: idGampong,
            })
        );
    };

    const getKecamatan = async (id: string) => {
        await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`
        )
            .then((response) => response.json())
            .then((districts: KecamatanResponse[]) => setKecamatan(districts));
    };

    const getGampong = async (id: string) => {
        await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`
        )
            .then((response) => response.json())
            .then((villages: GampongResponse[]) => setGampong(villages));
    };

    return (
        <GuestLayout>
            <Head title="Daftar TPU" />

            <section id="daftar-tpu" className="container my-5">
                <div className="space-y-5">
                    <h1 className="text-2xl font-bold text-center">
                        Daftar TPU
                    </h1>

                    <div className="w-full flex gap-5">
                        <Select onValueChange={onChangeKabupaten}>
                            <SelectTrigger className="w-1/4">
                                <SelectValue placeholder="Kabupaten / Kota" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1171">
                                    KOTA BANDA ACEH
                                </SelectItem>
                                <SelectItem value="1108">
                                    KABUPATEN ACEH BESAR
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={onChangeKecamatan}>
                            <SelectTrigger
                                className="w-1/4"
                                disabled={!idKabupaten || kecamatan.length <= 0}
                            >
                                <SelectValue placeholder="Kecamatan" />
                            </SelectTrigger>
                            <SelectContent>
                                <ScrollArea className="h-60">
                                    {kecamatan?.map((item, index) => (
                                        <SelectItem key={index} value={item.id}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>

                        <Select onValueChange={onChangeGampong}>
                            <SelectTrigger
                                className="w-1/4"
                                disabled={!idKecamatan || gampong.length <= 0}
                            >
                                <SelectValue placeholder="Gampong" />
                            </SelectTrigger>
                            <SelectContent>
                                <ScrollArea className="h-60">
                                    {gampong?.map((item, index) => (
                                        <SelectItem key={index} value={item.id}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>

                        <Button
                            type="button"
                            disabled={
                                !idKabupaten || !idKecamatan || !idGampong
                            }
                            onClick={onCari}
                        >
                            Cari
                        </Button>
                    </div>

                    <div className="w-full grid grid-cols-4 gap-5">
                        {pemakaman?.data?.length <= 0 ? (
                            <p className="col-span-4 font-semibold text-center">
                                Data tidak ditemukan.
                            </p>
                        ) : (
                            pemakaman?.data?.map((item, index) => (
                                <div
                                    key={index}
                                    className="col-span-4 lg:col-span-1"
                                >
                                    <Card className="rounded w-full h-full ">
                                        <CardContent className="p-5 ">
                                            <div className="flex flex-col gap-5">
                                                <img
                                                    src={`/tpu-images/${item.image}`}
                                                    alt={`@${item.nama_pemakaman}`}
                                                    className="w-full h-[200px] border"
                                                />

                                                <div className="leading-none">
                                                    <h1 className="font-bold line-clamp-1">
                                                        {item.nama_pemakaman}
                                                    </h1>
                                                    <h2 className="text-xs text-muted-foreground line-clamp-1 mt-2">
                                                        {item.alamat}
                                                    </h2>
                                                    <h3 className="text-xs text-muted-foreground">
                                                        {`${item.nama_kabupaten}, ${item.nama_kecamatan}, ${item.nama_gampong}`}
                                                    </h3>
                                                </div>

                                                <Button
                                                    className="w-full"
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            "daftar-tpu-detail",
                                                            item.id
                                                        )}
                                                    >
                                                        Lihat Detail
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))
                        )}
                    </div>

                    <Pagination
                        current_page={pemakaman.current_page}
                        first_page_url={pemakaman.first_page_url}
                        from={pemakaman.from}
                        last_page={pemakaman.last_page}
                        last_page_url={pemakaman.last_page_url}
                        path={pemakaman.path}
                        per_page={pemakaman.per_page}
                        prev_page_url={pemakaman.prev_page_url}
                        to={pemakaman.to}
                        total={pemakaman.total}
                        links={pemakaman.links}
                    />
                </div>
            </section>
        </GuestLayout>
    );
}

export default DaftarTpu;
