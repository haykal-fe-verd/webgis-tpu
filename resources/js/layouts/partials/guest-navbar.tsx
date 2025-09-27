import { Link, usePage } from "@inertiajs/react";

import { PageProps } from "@/types";

import { guestNavigations } from "@/data/navigations";
import { cn } from "@/lib/utils";
import GuestMobileNavbar from "@/layouts/partials/guest-mobile-navbar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

function GuestNavbar() {
    // hooks
    const { ziggy, user } = usePage<PageProps>().props;

    return (
        <header className="w-full bg-primary text-primary-foreground">
            <div className="container">
                <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 flex-nowrap">
                        <Icons.Logo className="w-6 h-6 fill-primary-foreground " />
                        <h1 className="font-bold">
                            {import.meta.env.VITE_APP_NAME}
                        </h1>
                    </div>

                    <div className="lg:flex items-center gap-16 hidden">
                        <nav className="flex items-center gap-5">
                            {guestNavigations.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        " hover:underline hover:underline-offset-8",
                                        ziggy.location === item.href
                                            ? "font-bold underline underline-offset-8"
                                            : ""
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="bg-primary"
                                asChild
                            >
                                <Link href={route("login")}>
                                    {user ? "Dashboard" : "Login"}
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <GuestMobileNavbar />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default GuestNavbar;
