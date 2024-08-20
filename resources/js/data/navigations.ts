import {
    BadgeCheck,
    Bookmark,
    Box,
    LayoutDashboard,
    LucideIcon,
    Package,
    UserRound,
} from "lucide-react";

type RoleType = "super admin" | "admin tpu";

export const guestNavigations: { name: string; href: string }[] = [
    {
        name: "Beranda",
        href: route("home"),
    },
    {
        name: "Daftar TPU",
        href: route("daftar-tpu"),
    },
    {
        name: "Peta",
        href: route("peta"),
    },
    {
        name: "Tutorial",
        href: route("tutorial"),
    },
];

export const authNavigations: {
    name: string;
    href: string;
    icon: LucideIcon;
    roles?: RoleType[];
}[] = [
    {
        name: "Dashboard",
        href: route("dashboard"),
        icon: LayoutDashboard,
        roles: ["super admin", "admin tpu"],
    },

    // super admin
    {
        name: "Data TPU",
        href: route("tpu.index"),
        icon: Box,
        roles: ["super admin"],
    },
    {
        name: "Varikasi TPU",
        href: route("verifikasi.index"),
        icon: BadgeCheck,
        roles: ["super admin"],
    },
    {
        name: "Manajemen User",
        href: route("user.index"),
        icon: UserRound,
        roles: ["super admin"],
    },

    // admin tpu
    {
        name: "Kelola TPU",
        href: route("kelola-tpu.index"),
        icon: Package,
        roles: ["admin tpu"],
    },
    {
        name: "Pemesanan TPU",
        href: route("booking.index"),
        icon: Bookmark,
        roles: ["admin tpu"],
    },
];
