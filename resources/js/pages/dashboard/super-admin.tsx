import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { PageProps } from "@/types";

import AuthLayout from "@/layouts/auth-layout";

interface SuperAdminProps extends PageProps {
    totalAdminTpu: number | null;
    totalTpuAcehBesar: number | null;
    totalTpuBandaAceh: number | null;
}
function SuperAdmin() {
    // hooks
    const { totalAdminTpu, totalTpuAcehBesar, totalTpuBandaAceh } =
        usePage<SuperAdminProps>().props;

    // states
    const dataDashboard: { title: string; desc: number | null }[] = [
        {
            title: "Total Admin TPU",
            desc: totalAdminTpu ?? 0,
        },
        {
            title: "Total TPU Aceh Besar",
            desc: totalTpuAcehBesar ?? 0,
        },
        {
            title: "Total TPU Banda Aceh",
            desc: totalTpuBandaAceh ?? 0,
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
                                center={[5.308, 95.584]}
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
                                <Marker position={[5.5293, 95.298]}>
                                    <Popup>
                                        <table className="w-[200px] text-[10px]">
                                            <tbody>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Kabupaten
                                                    </td>
                                                    <td>:</td>
                                                    <td>Kota Banda Aceh</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Luas Wilayah
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        56.17 KM<sup>2</sup>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Jumlah Kecamatan
                                                    </td>
                                                    <td>:</td>
                                                    <td>9</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Jumlah Desa
                                                    </td>
                                                    <td>:</td>
                                                    <td>90</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Jumlah TPU
                                                    </td>
                                                    <td>:</td>
                                                    <td>180</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Popup>
                                </Marker>
                                <Marker position={[5.4181, 95.4123]}>
                                    <Popup>
                                        <table className="w-[200px] text-[10px]">
                                            <tbody>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Kabupaten
                                                    </td>
                                                    <td>:</td>
                                                    <td>Aceh Besar</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Luas Wilayah
                                                    </td>
                                                    <td>:</td>
                                                    <td>
                                                        2902.56 KM<sup>2</sup>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Jumlah Kecamatan
                                                    </td>
                                                    <td>:</td>
                                                    <td>23</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Jumlah Desa
                                                    </td>
                                                    <td>:</td>
                                                    <td>604</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[100px]">
                                                        Jumlah TPU
                                                    </td>
                                                    <td>:</td>
                                                    <td>1.200</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default SuperAdmin;
