import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { PageProps, Pemakaman } from "@/types";

import GuestLayout from "@/layouts/guest-layout";
import { latitude, longitude } from "@/data/center";

interface PetaProps extends PageProps {
    tpu: Pemakaman[];
}
function Peta() {
    // hooks
    const { tpu } = usePage<PetaProps>().props;

    return (
        <GuestLayout>
            <Head title="Peta" />

            <section id="peta" className="py-5 space-y-5 container">
                <div>
                    <h1 className="text-2xl font-bold text-center">Peta</h1>
                </div>

                <div className="w-full h-full">
                    <MapContainer
                        center={[latitude, longitude]}
                        zoom={10}
                        scrollWheelZoom={false}
                        style={{
                            height: "calc(100vh - 200px)",
                            width: "100%",
                            zIndex: 0,
                        }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {tpu.map((pemakaman) => (
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
                                                    {pemakaman.nama_kabupaten}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-[100px]">
                                                    Kecamatan
                                                </td>
                                                <td>:</td>
                                                <td>
                                                    {pemakaman.nama_kecamatan}
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
                                            <tr>
                                                <td className="w-[100px]">
                                                    Detail
                                                </td>
                                                <td>:</td>
                                                <td>
                                                    <Link
                                                        href={route(
                                                            "daftar-tpu-detail",
                                                            pemakaman.id
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
            </section>
        </GuestLayout>
    );
}

export default Peta;
