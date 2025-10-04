import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import moment from "moment";

import { BookingResponse, PageProps } from "@/types";

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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BookingProps extends PageProps {
    pemesanan: BookingResponse;
}

function Booking() {
    // hooks
    const { pemesanan } = usePage<BookingProps>().props;

    // states
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // events
    const handleChangeStatus = (
        id: number,
        nextStatus: string,
        currentStatus: string
    ) => {
        if (nextStatus === currentStatus) return; // tidak perlu request kalau sama

        router.put(
            route("booking.update", id),
            { status: nextStatus },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };
    // table
    const columns = [
        { name: "#", className: "w-10 text-center" },
        { name: "Status", className: "" },
        { name: "Tanggal", className: "" },
        { name: "Nama", className: "" },
        { name: "Email", className: "" },
        { name: "Hp", className: "" },
        { name: "Nama Pemakaman", className: "" },
    ];

    return (
        <AuthLayout>
            <Head title="Pemesanan TPU" />

            <div className="space-y-5">
                <h1 className="text-2xl font-bold md:text-4xl">
                    Pemesanan TPU
                </h1>

                <div className="space-y-5">
                    <PerpageSearch
                        setIsLoading={setIsLoading}
                        link="booking.index"
                        perpages={pemesanan.per_page.toString()}
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
                                ) : pemesanan.data.length <= 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="text-center"
                                        >
                                            Tidak ada data untuk ditampilkan.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    pemesanan.data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-center">
                                                {pemesanan.from + index}
                                            </TableCell>
                                            <TableCell className="">
                                                <Select
                                                    onValueChange={(value) => {
                                                        handleChangeStatus(
                                                            item.id,
                                                            value,
                                                            item.status
                                                        );
                                                    }}
                                                    defaultValue={item.status}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Belum Diproses">
                                                                <div className="flex gap-2 items-center">
                                                                    <p className="bg-destructive rounded-full size-3" />{" "}
                                                                    Belum
                                                                    Diproses
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Sedang Diproses">
                                                                <div className="flex gap-2 items-center">
                                                                    <p className="bg-yellow-500 rounded-full size-3" />{" "}
                                                                    Sedang
                                                                    Diproses
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="Selesai">
                                                                <div className="flex gap-2 items-center">
                                                                    <p className="bg-emerald-700 rounded-full size-3" />{" "}
                                                                    Selesai
                                                                </div>
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="">
                                                {moment(item.created_at).format(
                                                    "DD MMM YYYY"
                                                )}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.email}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.hp}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.pemakaman?.nama_pemakaman}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <Pagination
                        current_page={pemesanan.current_page}
                        first_page_url={pemesanan.first_page_url}
                        from={pemesanan.from}
                        last_page={pemesanan.last_page}
                        last_page_url={pemesanan.last_page_url}
                        path={pemesanan.path}
                        per_page={pemesanan.per_page}
                        prev_page_url={pemesanan.prev_page_url}
                        to={pemesanan.to}
                        total={pemesanan.total}
                        links={pemesanan.links}
                    />
                </div>
            </div>
        </AuthLayout>
    );
}

export default Booking;
