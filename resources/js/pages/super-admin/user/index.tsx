import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Eye, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { PageProps, UserResponse } from "@/types";

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
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserProps extends PageProps {
    users: UserResponse;
}

function User() {
    // hooks
    const { users } = usePage<UserProps>().props;

    // states
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // table
    const columns = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama", className: "" },
        { name: "Email", className: "" },
        { name: "No Hp", className: "" },
        { name: "Kabupaten", className: "" },
        { name: "Kecamatan", className: "" },
        { name: "Role", className: "" },
        { name: "@", className: "w-20 text-center" },
    ];

    return (
        <AuthLayout>
            <Head title="Manajemen User" />

            <div className="space-y-5">
                <h1 className="text-2xl font-bold md:text-4xl">
                    Manajemen User
                </h1>

                <div className="space-y-5">
                    <Button className="inline-flex items-center w-fit gap-2">
                        <PlusCircle className="w-4 h-4" />
                        <span>Tambah User</span>
                    </Button>

                    <PerpageSearch
                        setIsLoading={setIsLoading}
                        link="user.index"
                        perpages={users.per_page.toString()}
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
                                ) : users.data.length <= 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="text-center"
                                        >
                                            Tidak ada data untuk ditampilkan.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-center">
                                                {users.from + index}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.email}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.phone}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.nama_kabupaten}
                                            </TableCell>
                                            <TableCell className="">
                                                {item.nama_kecamatan}
                                            </TableCell>
                                            <TableCell className="">
                                                <Badge
                                                    variant={
                                                        item.role ===
                                                        "super admin"
                                                            ? "default"
                                                            : "destructive"
                                                    }
                                                >
                                                    {item.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <DotsHorizontalIcon className="h-5 w-5" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="flex flex-col">
                                                        <DropdownMenuItem className="inline-flex items-center gap-2 w-full">
                                                            <Eye className="h-4 w-4" />
                                                            <span>Detail</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="inline-flex items-center gap-2 w-full">
                                                            <Pencil className="h-4 w-4" />
                                                            <span>Edit</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="inline-flex items-center gap-2 w-full">
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
                        current_page={users.current_page}
                        first_page_url={users.first_page_url}
                        from={users.from}
                        last_page={users.last_page}
                        last_page_url={users.last_page_url}
                        path={users.path}
                        per_page={users.per_page}
                        prev_page_url={users.prev_page_url}
                        to={users.to}
                        total={users.total}
                        links={users.links}
                    />
                </div>
            </div>
        </AuthLayout>
    );
}

export default User;
