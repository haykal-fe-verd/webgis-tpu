import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { PageProps, Pemakaman } from "@/types";

import GuestLayout from "@/layouts/guest-layout";
import { Button } from "@/components/ui/button";
import { hitungSisaPemakaman } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

interface DaftarTpuDetailProps extends PageProps {
    pemakaman: Pemakaman;
}

function DaftarTpuDetail() {
    // hooks
    const { pemakaman } = usePage<DaftarTpuDetailProps>().props;

    return (
        <GuestLayout>
            <Head title="Daftar TPU Detail" />

            <section
                id="daftar-tpu-detail"
                className="container my-5 min-h-[calc(100vh-60px)] space-y-5"
            >
                <div>
                    <Link
                        href={route("daftar-tpu")}
                        className="flex items-center gap-2 text-muted-foreground"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Kembali</span>
                    </Link>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-5">
                    <div className="flex flex-col gap-5 w-full">
                        <h1 className="text-2xl font-bold">Detail TPU</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="w-[200px]">Nama TPU</td>
                                    <td>:</td>
                                    <td>{pemakaman.nama_pemakaman}</td>
                                </tr>
                                <tr>
                                    <td className="w-[200px]">Alamat</td>
                                    <td>:</td>
                                    <td>{pemakaman.alamat}</td>
                                </tr>
                                <tr>
                                    <td className="w-[200px]">Nama PJ</td>
                                    <td>:</td>
                                    <td>{pemakaman.user?.name}</td>
                                </tr>
                                <tr>
                                    <td className="w-[200px]">No HP Admin</td>
                                    <td>:</td>
                                    <td>{pemakaman.user?.phone}</td>
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
                                        Sisa Pemakaman
                                    </td>
                                    <td>:</td>
                                    <td>
                                        {hitungSisaPemakaman(
                                            pemakaman.kapasitas,
                                            pemakaman.terpakai
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Button
                            disabled={
                                hitungSisaPemakaman(
                                    pemakaman.kapasitas,
                                    pemakaman.terpakai
                                ) === 0
                            }
                            className="w-fit"
                            asChild
                        >
                            <Link
                                href={route("booking-tpu", pemakaman.id)}
                                disabled={
                                    hitungSisaPemakaman(
                                        pemakaman.kapasitas,
                                        pemakaman.terpakai
                                    ) === 0
                                }
                            >
                                Booking TPU
                            </Link>
                        </Button>
                    </div>

                    <div className="w-full flex flex-col gap-5">
                        <img
                            src={`/tpu-images/${pemakaman.image}`}
                            alt={`@${pemakaman.nama_pemakaman}`}
                            className=" w-full h-[300px] object-cover rounded-lg"
                        />

                        <div className="w-full rounded-lg overflow-hidden">
                            <MapContainer
                                center={[
                                    parseFloat(pemakaman.latitude),
                                    parseFloat(pemakaman.longitude),
                                ]}
                                zoom={12}
                                scrollWheelZoom={false}
                                style={{
                                    height: "300px",
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
                                        parseFloat(pemakaman.latitude),
                                        parseFloat(pemakaman.longitude),
                                    ]}
                                >
                                    <Popup>
                                        <table className="w-[200px] text-[10px]">
                                            <tbody>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Kabupaten
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        {
                                                            pemakaman.nama_kabupaten
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Kecamatan
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        {
                                                            pemakaman.nama_kecamatan
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Alamat
                                                    </td>
                                                    <td>:</td>
                                                    <td>{pemakaman.alamat}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Luas
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        {pemakaman.luas} m
                                                        <sup>2</sup>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

export default DaftarTpuDetail;
