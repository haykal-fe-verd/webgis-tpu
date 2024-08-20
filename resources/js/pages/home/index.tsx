import React from "react";
import { Head, Link } from "@inertiajs/react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import GuestLayout from "@/layouts/guest-layout";
import { Button } from "@/components/ui/button";

function Home() {
    return (
        <GuestLayout>
            <Head title="Home" />

            <div className="min-h-[calc(100vh-60px)] space-y-5">
                <div className="relative w-full h-full">
                    <div className="bg-black/40 absolute inset-0" />
                    <img
                        src="/images/hero.png"
                        alt="hero"
                        className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="flex flex-col items-center justify-center mx-auto absolute top-0 leading-relaxed text-white text-center left-0 right-0 bottom-0 container ">
                        <h1 className="font-bold lg:text-6xl text-sm">
                            Selamat Datang di WebGIS Pemakaman Umum
                        </h1>
                        <h2 className="lg:text-3xl mt-3 text-xs">
                            WebGIS Pemakaman Umum hadir untuk memudahkan
                            masyarakat dalam mencari dan memesan Tempat
                            Pemakaman Umum (TPU) sesuai dengan lokasi yang
                            diinginkan
                        </h2>
                        <div className="flex gap-5 items-center mt-2 lg:mt-10">
                            <Button
                                asChild
                                variant="outline"
                                className="bg-transparent"
                            >
                                <Link href={route("peta")}>Lihat Peta</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="bg-transparent"
                            >
                                <Link href={route("daftar-tpu")}>
                                    Lihat TPU
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="container space-y-5">
                    <h1 className="font-bold text-sm lg:text-2xl text-center">
                        Apa Fungsi WebGIS TPU ?
                    </h1>

                    <div className="flex items-center justify-between w-full leading-relaxed gap-10">
                        <div className="w-full">
                            <p className="text-sm lg:text-xl text-justify">
                                Webgis ini bertujuan untuk menyediakan informasi
                                lengkap tentang lokasi pemakaman umum di kota
                                banda aceh serta fitur pemesanan lahan secara
                                online
                            </p>
                            <Button className="mt-10">Lihat Detail</Button>
                        </div>

                        <div className="w-full">
                            <MapContainer
                                center={[5.308, 95.584]}
                                zoom={9}
                                scrollWheelZoom={true}
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
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

export default Home;
