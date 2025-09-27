import React from "react";
import { Link, usePage } from "@inertiajs/react";

import { PageProps } from "@/types";
import { authNavigations } from "@/data/navigations";
import { cn } from "@/lib/utils";

type RoleType = "super admin" | "admin tpu";

function AuthSidebar() {
    // hooks
    const { ziggy, user } = usePage<PageProps>().props;

    // states
    const role = user?.role;
    const filteredNavigations = authNavigations.filter(
        (item) => !item.roles || item.roles.includes(role as RoleType)
    );

    return (
        <aside className="border-r border-border h-full bg-card text-card-foreground p-5 space-y-5">
            <h1 className="font-bold text-2xl">
                {import.meta.env.VITE_APP_NAME}
            </h1>
            <div className="space-y-1">
                {filteredNavigations.map((item, index) => (
                    <Link
                        href={item.href}
                        key={index}
                        className={cn(
                            "flex justify-start w-full p-3 text-sm font-medium transition duration-100 rounded-lg cursor-pointer group hover:text-primary-foreground hover:bg-primary/50",
                            ziggy.location === item.href ||
                                ziggy.location.includes(item.href)
                                ? "text-primary bg-primary/20"
                                : "text-card-foreground"
                        )}
                    >
                        <div className="flex items-center flex-1">
                            <item.icon className={cn("h-5 w-5 mr-3")} />
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    );
}

export default AuthSidebar;
