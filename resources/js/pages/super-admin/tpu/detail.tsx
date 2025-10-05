import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { PageProps, Pemakaman } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { hitungSisaPemakaman } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface DetailProps extends PageProps {
    tpu: Pemakaman;
}

function Detail() {
    // hooks
    const { tpu } = usePage<DetailProps>().props;

    return (
        <AuthLayout>
            <Head title="Detail TPU" />

            <div className="space-y-5">
                <Link
                    href={route("tpu.index")}
                    className="flex items-center gap-2 text-muted-foreground"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Kembali</span>
                </Link>

                <h1 className="text-2xl font-bold md:text-4xl">
                    Detail TPU {tpu.nama_pemakaman}
                </h1>

                <div className="space-y-5 ">
                    <div className="flex items-center justify-between gap-5">
                        <div className="w-full h-[400px]">
                            <img
                                src={`/tpu-images/${tpu.image}`}
                                alt={`@${tpu.nama_pemakaman}`}
                                className="w-full h-full"
                            />
                        </div>

                        <div className="w-full h-[400px]">
                            <MapContainer
                                center={[
                                    parseFloat(tpu.latitude),
                                    parseFloat(tpu.longitude),
                                ]}
                                zoom={9}
                                scrollWheelZoom={false}
                                style={{
                                    height: "400px",
                                    width: "100%",
                                    zIndex: 0,
                                }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker
                                    position={[
                                        parseFloat(tpu.latitude),
                                        parseFloat(tpu.longitude),
                                    ]}
                                >
                                    <Popup>{tpu.nama_pemakaman}</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                    <div className="border rounded-md">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Nama TPU
                                    </TableCell>
                                    <TableCell>
                                        : {tpu.nama_pemakaman}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Kabupaten
                                    </TableCell>
                                    <TableCell>
                                        : {tpu.nama_kabupaten}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Kecamatan
                                    </TableCell>
                                    <TableCell>
                                        : {tpu.nama_kecamatan}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Gampong
                                    </TableCell>
                                    <TableCell>: {tpu.nama_gampong}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Luas
                                    </TableCell>
                                    <TableCell>
                                        : {tpu.luas} m<sup>2</sup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Kapasitas
                                    </TableCell>
                                    <TableCell>: {tpu.kapasitas}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Total Tersedia
                                    </TableCell>
                                    <TableCell>
                                        :{" "}
                                        {hitungSisaPemakaman(
                                            tpu.kapasitas,
                                            tpu.terpakai
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Keterangan
                                    </TableCell>
                                    <TableCell>: {tpu.keterangan}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Status
                                    </TableCell>
                                    <TableCell>
                                        :{" "}
                                        <Badge
                                            className="capitalize"
                                            variant={
                                                tpu.is_approved === "disetujui"
                                                    ? "default"
                                                    : tpu.is_approved ===
                                                      "belum disetujui"
                                                    ? "warning"
                                                    : "destructive"
                                            }
                                        >
                                            {tpu.is_approved}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Detail;
