import React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import AuthSidebar from "@/layouts/partials/auth-sidebar";

function AuthMobileSidebar() {
    // states
    const [isMounted, setIsMounted] = React.useState<boolean>(false);

    // mounted
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <HamburgerMenuIcon className="lg:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SheetHeader className="hidden">
                    <SheetTitle className="hidden">
                        {import.meta.env.VITE_APP_NAME}
                    </SheetTitle>
                    <SheetDescription className="hidden">
                        Auth Navigation
                    </SheetDescription>
                </SheetHeader>
                <AuthSidebar />
            </SheetContent>
        </Sheet>
    );
}

export default AuthMobileSidebar;
