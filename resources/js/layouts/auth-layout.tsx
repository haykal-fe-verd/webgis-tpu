import React from "react";
import { usePage } from "@inertiajs/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { PageProps } from "@/types";

import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import AuthSidebar from "@/layouts/partials/auth-sidebar";
import AuthTopbar from "@/layouts/partials/auth-topbar";

function AuthLayout({ children }: React.PropsWithChildren) {
    // hooks
    const { sessions, status } = usePage<PageProps>().props;
    const { toast } = useToast();

    // mounted
    React.useEffect(() => {
        if (status) {
            toast({
                description: status,
            });
        }

        if (sessions?.success) {
            toast({
                title: "Berhasil",
                description: sessions.success,
            });
        }

        if (sessions?.error) {
            toast({
                variant: "destructive",
                title: "Oops",
                description: sessions.success,
            });
        }
    }, [sessions]);

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="relative h-full">
                <div className="hidden h-full lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-[50]">
                    <AuthSidebar />
                </div>
                <main className="lg:pl-72">
                    <AuthTopbar />
                    <div className="m-5">{children}</div>
                    <Toaster />
                    <SonnerToaster />
                </main>
            </div>
        </NextThemesProvider>
    );
}

export default AuthLayout;
