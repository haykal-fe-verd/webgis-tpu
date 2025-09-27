import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { PageProps, Pemakaman } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import { latitude, longitude } from "@/data/center";

interface AdminTpuProps extends PageProps {
    totalTpu: number | null;
    totalKapasitas: number | null;
    tpu: Pemakaman[];
}

function AdminTpu() {
    // hooks
    const { totalTpu, totalKapasitas, tpu } = usePage<AdminTpuProps>().props;

    // states
    const dataDashboard: { title: string; desc: number | null }[] = [
        {
            title: "Total TPU",
            desc: totalTpu,
        },
        {
            title: "Kapasitas Jumlah TPU",
            desc: totalKapasitas,
        },
    ];

    return (
        <AuthLayout>
            <Head title="Dashboard" />

            <div className="space-y-5">
                <h1 className="text-2xl font-bold md:text-4xl">Dashboard</h1>

                <div className="space-y-5">
                    <div className="grid grid-cols-3 gap-5">
                        {dataDashboard.map((item, index) => (
                            <div
                                key={index}
                                className="text-nowrap col-span-3 p-5 bg-card text-card-foreground rounded-md shadow lg:col-span-1 border border-border"
                            >
                                <h1 className="text-xl font-semibold">
                                    {item.title}
                                </h1>
                                <p className="mt-5 text-4xl font-bold">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full">
                        <h2 className="text-xl md:text-2xl mb-5">
                            Peta Persebaran TPU
                        </h2>

                        <div className="w-full rounded-lg overflow-hidden">
                            <MapContainer
                                center={[latitude, longitude]}
                                zoom={9.5}
                                scrollWheelZoom={true}
                                style={{
                                    height: "500px",
                                    width: "100%",
                                    zIndex: 0,
                                }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {tpu.map((item) => (
                                    <Marker
                                        key={item.id}
                                        position={[
                                            parseFloat(item.latitude),
                                            parseFloat(item.longitude),
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
                                                                item.nama_kabupaten
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
                                                                item.nama_kecamatan
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-[100px]">
                                                            Alamat
                                                        </td>
                                                        <td>:</td>
                                                        <td>{item.alamat}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-[100px]">
                                                            Luas
                                                        </td>
                                                        <td>:</td>
                                                        <td>
                                                            {item.luas} m
                                                            <sup>2</sup>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="w-[100px]">
                                                            Detail
                                                        </td>
                                                        <td>:</td>
                                                        <td>
                                                            <Link
                                                                href={route(
                                                                    "kelola-tpu.detail",
                                                                    item.id
                                                                )}
                                                                className="text-blue-500 underline"
                                                            >
                                                                Lihat
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default AdminTpu;
