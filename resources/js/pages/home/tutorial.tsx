import { Head } from "@inertiajs/react";

import GuestLayout from "@/layouts/guest-layout";

function Tutorial() {
    return (
        <GuestLayout>
            <Head title="Tutorial" />

            <section id="tutorial" className="py-5 space-y-5 container">
                <div className="flex flex-col gap-5 lg:gap-16">
                    <h1 className="text-2xl font-bold text-center">
                        Panduan Penggunaan WebGIS
                    </h1>

                    {/* menu peta */}
                    <div className="border border-primary p-4 rounded">
                        <h1 className="font-bold uppercase mb-5">MENU PETA</h1>
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="w-full border">
                                <img
                                    src="/images/peta.png"
                                    alt="@peta"
                                    className="h-[330px] w-full"
                                />
                            </div>
                            <div className="p-2 rounded border w-full">
                                <ol className="list-decimal list-inside space-y-2">
                                    <li>
                                        Klik icon Lokasi yang berwarna biru
                                        untuk memilih Lokasi peta yang
                                        diinginkan
                                    </li>
                                    <li>
                                        Muncul pop up terkait informasi lokasi
                                        tpu yang telah dipilih
                                    </li>
                                    <li>
                                        Klik “Lihat” di halaman pop up untuk
                                        melihat detail informasi tentang tpu
                                        tersebut
                                    </li>
                                    <li>
                                        Klik “Booking Tpu” jika ingin membooking
                                        tpu di lokasi tersebut
                                    </li>
                                    <li>
                                        Kemudian, isi data dan klik “daftar p3f
                                        gampong”
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* menu katalog */}
                    <div className="border border-primary p-4 rounded">
                        <h1 className="font-bold uppercase mb-5">
                            MENU KATALOG
                        </h1>
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="w-full border">
                                <img
                                    src="/images/katalog.png"
                                    alt="@katalog"
                                    className="h-[330px] w-full"
                                />
                            </div>
                            <div className="p-2 rounded border w-full">
                                <ol className="list-decimal list-inside space-y-2">
                                    <li>
                                        Klik dropdown “Kabupaten/Kota” dan pilih
                                        kabupaten atau kota yang diinginkan
                                    </li>
                                    <li>
                                        Klik dropdown “Kecamatan” dan pilih
                                        Kecamatan yang diinginkan
                                    </li>
                                    <li>
                                        Klik dropdown “Gampong” dan pilih
                                        Gampong yang diinginkan
                                    </li>
                                    <li>
                                        Kemudian setelah muncul lokasi yang
                                        diinginkan, klik “lihat detail” untuk
                                        melihat informasi lengkap tentang lokasi
                                        tersebut
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* menu daftar */}
                    <div className="border border-primary p-4 rounded">
                        <h1 className="font-bold uppercase mb-5">
                            MENU DAFTAR
                        </h1>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col lg:flex-row gap-5">
                                <div className="w-full border">
                                    <img
                                        src="/images/daftar.png"
                                        alt="@daftar"
                                        className="h-[330px] w-full"
                                    />
                                </div>
                                <div className="p-2 rounded border w-full">
                                    <ol className="list-decimal list-inside space-y-2">
                                        <li>
                                            Klik dropdown “Kabupaten/Kota” dan
                                            pilih kabupaten atau kota yang
                                            diinginkan
                                        </li>
                                        <li>
                                            Klik dropdown “Kecamatan” dan pilih
                                            Kecamatan yang diinginkan
                                        </li>
                                        <li>
                                            Klik dropdown “Gampong” dan pilih
                                            Gampong yang diinginkan
                                        </li>
                                        <li>
                                            Kemudian setelah muncul lokasi yang
                                            diinginkan, klik “daftar sekarang”
                                            untuk mendaftar tpu tersebut
                                        </li>
                                    </ol>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-5">
                                <div className="w-full border">
                                    <img
                                        src="/images/booking.png"
                                        alt="@booking"
                                        className="h-[330px] w-full"
                                    />
                                </div>
                                <div className="p-2 rounded border w-full">
                                    <ol className="list-decimal list-inside space-y-2">
                                        <li>
                                            Klik dropdown “Daftar Sebagai” untuk
                                            memilih pendaftar sebagai warga dan
                                            non warga. Untuk non warga
                                            pendaftaran akan dibatasi
                                        </li>
                                        <li>Masukkan NIK Pendaftar</li>
                                        <li>Masukkan Nama Pendaftar</li>
                                        <li>Masukkan Email Pendaftar</li>
                                        <li>
                                            Masukkan No HP Pendaftar, No Hp
                                            Pendaftar akan digunakan untuk
                                            konfirmasi pendaftaran melalui
                                            WhatsApp
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* menu tutorial */}
                    <div className="border border-primary p-4 rounded">
                        <h1 className="font-bold uppercase mb-5">
                            MENU TUTORIAL
                        </h1>
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="w-full border">
                                <img
                                    src="/images/tutorial.png"
                                    alt="@tutorial"
                                    className="h-[330px] w-full"
                                />
                            </div>
                            <div className="p-2 rounded border w-full flex items-center justify-center">
                                <p className="text-center">
                                    Halaman ini menampilkan bagaimana cara
                                    menggunakan <br />
                                    <strong>WebGIS Pemakaman Umum</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

export default Tutorial;
