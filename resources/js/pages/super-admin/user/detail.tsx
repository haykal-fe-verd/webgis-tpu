import React from "react";
import { ChevronLeft } from "lucide-react";
import { Head, Link, usePage } from "@inertiajs/react";

import { PageProps, User } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface DetailProps extends PageProps {
    pengguna: User;
}

function Detail() {
    // hooks
    const { pengguna } = usePage<DetailProps>().props;

    return (
        <AuthLayout>
            <Head title="Tambah User" />

            <div className="space-y-5 ">
                <Link
                    href={route("user.index")}
                    className="flex items-center gap-2 text-muted-foreground"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Kembali</span>
                </Link>
                <h1 className="text-2xl font-bold md:text-4xl">
                    Detail User {pengguna.name}
                </h1>

                <div className="space-y-5 ">
                    <div className="border rounded-md">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Nama
                                    </TableCell>
                                    <TableCell>: {pengguna.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Email
                                    </TableCell>
                                    <TableCell>: {pengguna.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Role
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        : {pengguna.role}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        No HP
                                    </TableCell>
                                    <TableCell>: {pengguna.phone}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Kabupaten
                                    </TableCell>
                                    <TableCell>
                                        : {pengguna.nama_kabupaten}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="w-[300px]">
                                        Kecamatan
                                    </TableCell>
                                    <TableCell>
                                        : {pengguna.nama_kecamatan}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between gap-5">
                        <div className="w-full h-[400px]">
                            <img
                                src={`/avatars/${pengguna.image}`}
                                alt={`@${pengguna.name}`}
                                className="w-50 h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Detail;
