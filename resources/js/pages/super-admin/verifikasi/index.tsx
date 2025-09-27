import React from "react";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Check, Eye, Trash2 } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { PageProps, PemakamanResponse } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import PerpageSearch from "@/components/perpage-search";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VerifikasiProps extends PageProps {
    tpu: PemakamanResponse;
}

function Verifikasi() {
    // hooks
    const { tpu } = usePage<VerifikasiProps>().props;
    const { post, delete: destroy } = useForm();

    // states
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // events
    const onSetujui = (id: number) => {
        post(route("verifikasi.post", id));
    };

    const handleDetail = (id: number) => {
        router.get(route("verifikasi.detail", id));
    };

    const handleDestroy = (id: number) => {
        destroy(route("verifikasi.destroy", id));
    };

    // table
    const columns = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama TPU", className: "" },
        { name: "Nama PJ", className: "" },
        { name: "Email PJ", className: "" },
        { name: "No Hp PJ", className: "" },
        { name: "Kabupaten", className: "" },
        { name: "Kecamatan", className: "" },
        { name: "Gampong", className: "" },
        { name: "Status", className: "text-center" },
        { name: "@", className: "w-20 text-center" },
    ];

    return (
        <AuthLayout>
            <Head title="Verifikasi TPU" />

            <div className="space-y-5">
                <h1 className="text-2xl font-bold md:text-4xl">
                    Verifikasi TPU
                </h1>

                <div className="space-y-5">
                    <PerpageSearch
                        setIsLoading={setIsLoading}
                        link="verifikasi.index"
                        perpages={tpu.per_page.toString()}
                    />

                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableHead
                                            key={column.name}
                                            className={column.className}
                                        >
                                            {column.name}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="text-center"
                                        >
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : tpu.data.length <= 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="text-center"
                                        >
                                            Tidak ada data untuk ditampilkan.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tpu.data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-center">
                                                {tpu.from + index}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.nama_pemakaman}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.user?.name}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.user?.email}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.user?.phone}
                                            </TableCell>
                                            <TableCell className="">
                                                {item?.nama_kabupaten}
                                            </TableCell>
                                            <TableCell className="">
                                                {item?.nama_kecamatan}
                                            </TableCell>
                                            <TableCell className="">
                                                {item?.nama_gampong}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant={
                                                        item.is_approved
                                                            ? "default"
                                                            : "destructive"
                                                    }
                                                >
                                                    {item.is_approved
                                                        ? "Disetujui"
                                                        : "Belum Disetujui"}
                                                </Badge>
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <DotsHorizontalIcon className="h-5 w-5" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="flex flex-col">
                                                        {item.is_approved ? null : (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    onSetujui(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="inline-flex items-center gap-2 w-full"
                                                            >
                                                                <Check className="h-4 w-4" />
                                                                <span>
                                                                    Setujui
                                                                </span>
                                                            </DropdownMenuItem>
                                                        )}

                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleDetail(
                                                                    item.id
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-2 w-full"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            <span>Detail</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleDestroy(
                                                                    item.id
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-2 w-full"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span>Hapus</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <Pagination
                        current_page={tpu.current_page}
                        first_page_url={tpu.first_page_url}
                        from={tpu.from}
                        last_page={tpu.last_page}
                        last_page_url={tpu.last_page_url}
                        path={tpu.path}
                        per_page={tpu.per_page}
                        prev_page_url={tpu.prev_page_url}
                        to={tpu.to}
                        total={tpu.total}
                        links={tpu.links}
                    />
                </div>
            </div>
        </AuthLayout>
    );
}

export default Verifikasi;
