import React, { PropsWithChildren } from "react";
import { usePage } from "@inertiajs/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { PageProps } from "@/types";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useToast } from "@/components/ui/use-toast";

import GuestNavbar from "@/layouts/partials/guest-navbar";
import GuestFooter from "@/layouts/partials/guest-footer";
import ThemeDataProvider from "@/components/theme-data-provider";

function GuestLayout({ children }: PropsWithChildren) {
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
                title: "Berhasil 😚",
                description: sessions.success,
            });
        }

        if (sessions?.error) {
            toast({
                variant: "destructive",
                title: "Oops 😣",
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
            <ThemeDataProvider>
                <main>
                    <GuestNavbar />
                    <div>
                        {children}
                        <GuestFooter />
                    </div>

                    <Toaster />
                    <SonnerToaster />
                </main>
            </ThemeDataProvider>
        </NextThemesProvider>
    );
}

export default GuestLayout;
