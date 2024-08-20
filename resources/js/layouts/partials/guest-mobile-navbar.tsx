import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { PageProps } from "@/types";

import { guestNavigations } from "@/data/navigations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

function GuestMobileNavbar() {
    // hooks
    const { ziggy } = usePage<PageProps>().props;

    // states
    const [isMounted, setIsMounted] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);

    // mounted
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <HamburgerMenuIcon />
            </SheetTrigger>
            <SheetContent
                side="left"
                aria-description="Guest Navigation"
                aria-describedby="Guest Navigation"
                className="flex flex-col justify-between p-5 bg-background text-foreground"
            >
                <SheetHeader>
                    <SheetTitle>{import.meta.env.VITE_APP_NAME}</SheetTitle>
                    <SheetDescription className="hidden">
                        Guest Navigation
                    </SheetDescription>
                </SheetHeader>

                <div className="h-full mt-10">
                    <div className="flex flex-col  space-y-5">
                        {guestNavigations.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "text-sm leading-relaxed",
                                    ziggy.location === item.href
                                        ? "text-primary font-bold underline-offset-4 underline"
                                        : ""
                                )}
                                onClick={() => setOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <Button
                        type="button"
                        onClick={() => setOpen(false)}
                        asChild
                        className={cn("w-full")}
                    >
                        <Link href={route("login")}>Login</Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default GuestMobileNavbar;
