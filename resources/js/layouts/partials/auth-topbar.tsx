import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";

import { PageProps } from "@/types";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut, User } from "lucide-react";
import { GearIcon } from "@radix-ui/react-icons";
import AuthMobileSidebar from "./auth-mobile-sidebar";

function AuthTopbar() {
    // hooks
    const { user } = usePage<PageProps>().props;
    const { post } = useForm();

    // events
    const handleLogout = () => {
        post(route("logout"));
    };

    return (
        <header className="bg-card text-card-foreground border-b border-border px-5 py-3 flex items-center justify-between text-nowrap flex-nowrap">
            <AuthMobileSidebar />
            <div className="items-center justify-end flex w-full space-x-3">
                <div className="text-sm font-semibold uppercase">
                    {user?.role === "super admin"
                        ? "Super Admin"
                        : `Gampong ${user?.nama_gampong}`}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className={cn("flex items-center gap-3")}>
                            <Avatar
                                className={cn(
                                    "border border-primary object-cover"
                                )}
                            >
                                <AvatarImage
                                    src={`/avatars/${user?.image}`}
                                    alt="Avatar"
                                    className="object-cover"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={route("profile.edit")}
                                className="flex items-center gap-x-3"
                            >
                                <User className="w-4 h-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={route("password.index")}
                                className="flex items-center gap-x-3"
                            >
                                <GearIcon className="w-4 h-4" />
                                <span>Ganti Password</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <AlertDialog>
                                <AlertDialogTrigger className="flex items-center gap-x-3 justify-center w-full">
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Apakah kamu ingin logout 🥹
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Tidak
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleLogout}
                                        >
                                            Ya
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

export default AuthTopbar;
