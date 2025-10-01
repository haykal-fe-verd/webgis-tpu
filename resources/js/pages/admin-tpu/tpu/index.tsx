import React from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Eye, Pencil, PlusCircle, Trash2 } from "lucide-react";

import { PageProps, PemakamanResponse } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import PerpageSearch from "@/components/perpage-search";
import Pagination from "@/components/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface KelolaTpuProps extends PageProps {
    tpu: PemakamanResponse;
}

function KelolaTpu() {
    // hooks
    const { tpu } = usePage<KelolaTpuProps>().props;

    // states
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // events
    const handleDetail = (id: number) => {
        router.get(route("kelola-tpu.detail", id));
    };

    const handleEdit = (id: number) => {
        router.get(route("kelola-tpu.edit", id));
    };

    const handleDelete = (id: number) => {
        router.delete(route("kelola-tpu.destroy", id));
    };

    // table
    const columns = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama Pemakaman", className: "" },
        { name: "Luas", className: "" },
        { name: "Kapasitas", className: "" },
        { name: "Alamat", className: "" },
        { name: "Status", className: "" },
        { name: "@", className: "w-20 text-center" },
    ];

    return (
        <AuthLayout>
            <Head title="Kelola TPU" />

            <div className="space-y-5">
                <h1 className="text-2xl font-bold md:text-4xl">Kelola TPU</h1>

                <div className="space-y-5">
                    <Button
                        asChild
                        className="w-fit inline-flex items-center gap-2"
                    >
                        <Link href={route("kelola-tpu.create")}>
                            <PlusCircle className="w-5 h-5" />
                            <span>Ajukan Penambahan TPU</span>
                        </Link>
                    </Button>
                    <PerpageSearch
                        setIsLoading={setIsLoading}
                        link="kelola-tpu.index"
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
                                                {item.luas} m<sup>2</sup>
                                            </TableCell>
                                            <TableCell className="">
                                                {item.kapasitas}
                                            </TableCell>
                                            <TableCell className="text-nowrap">
                                                {item.alamat}
                                            </TableCell>
                                            <TableCell className="">
                                                <Badge
                                                    className="capitalize"
                                                    variant={
                                                        item.is_approved ===
                                                        "disetujui"
                                                            ? "default"
                                                            : item.is_approved ===
                                                              "belum disetujui"
                                                            ? "warning"
                                                            : "destructive"
                                                    }
                                                >
                                                    {item.is_approved}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <DotsHorizontalIcon className="h-5 w-5" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="flex flex-col">
                                                        <DropdownMenuItem
                                                            className="inline-flex items-center gap-2 w-full"
                                                            onClick={() =>
                                                                handleDetail(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            <span>Detail</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleEdit(
                                                                    item.id
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-2 w-full"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                            <span>Edit</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleDelete(
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

export default KelolaTpu;
