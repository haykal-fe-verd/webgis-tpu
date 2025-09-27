import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { CameraIcon, Loader2 } from "lucide-react";

import { PageProps } from "@/types";

import { cn } from "@/lib/utils";
import AuthLayout from "@/layouts/auth-layout";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InputError from "@/components/input-error";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileProps extends PageProps {
    mustVerifyEmail?: boolean;
}

function Profile() {
    // hooks
    const { mustVerifyEmail, user } = usePage<ProfileProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        name: user?.name,
        email: user?.email,
        image: user?.image,
        phone: user?.phone,
        role: user?.role,
        id_kabupaten: user?.id_kabupaten,
        nama_kabupaten: user?.nama_kabupaten,
        id_kecamatan: user?.id_kecamatan,
        nama_kecamatan: user?.nama_kecamatan,
        id_gampong: user?.id_gampong,
        nama_gampong: user?.nama_gampong,
    });

    // states
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    // events
    const browse = () => {
        inputRef.current?.click();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setData("image", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    const onSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("profile.update"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AuthLayout>
            <Head title="Profile" />

            <div className="p-5 space-y-4">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">Profile</h2>
                    <p className="text-sm font-light text-muted-foreground md:text-lg">
                        Halaman edit profile
                    </p>
                </div>
                <Separator />

                <form
                    onSubmit={onSubmit}
                    encType="multipart/form-data"
                    className="w-full space-y-5"
                >
                    <div className="relative w-full h-60 justify-center items-center flex">
                        <input
                            id="photo"
                            name="photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={inputRef}
                            onChange={onChange}
                        />
                        <Avatar
                            className={cn(
                                "absolute object-cover border-2 rounded-full w-60 h-60"
                            )}
                        >
                            {previewUrl ? (
                                <AvatarImage
                                    id="photoPreview"
                                    src={previewUrl}
                                    className="object-cover border-2 rounded-full w-60 h-60"
                                />
                            ) : (
                                <AvatarImage
                                    id="photoPreview"
                                    src={`/avatars/${user?.image}`}
                                    className="object-cover border-2 rounded-full w-60 h-60"
                                />
                            )}
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <button
                            type="button"
                            onClick={browse}
                            className="absolute flex items-center justify-center text-white transition-opacity duration-300 bg-black rounded-full opacity-50 w-60 h-60 hover:opacity-80"
                        >
                            <CameraIcon className="w-5 h-5" />
                        </button>
                        <div className="text-center -bottom-5 absolute">
                            <InputError message={errors.image} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="phone">No HP</Label>
                            <Input
                                type="text"
                                id="phone"
                                name="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="nama_kabupaten">Kabupaten</Label>
                            <Input
                                type="text"
                                id="nama_kabupaten"
                                name="nama_kabupaten"
                                value={data.nama_kabupaten}
                                onChange={(e) =>
                                    setData("nama_kabupaten", e.target.value)
                                }
                                disabled
                            />
                            <InputError message={errors.nama_kabupaten} />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="nama_kecamatan">Kecamatan</Label>
                            <Input
                                type="text"
                                id="nama_kecamatan"
                                name="nama_kecamatan"
                                value={data.nama_kecamatan}
                                onChange={(e) =>
                                    setData("nama_kecamatan", e.target.value)
                                }
                                disabled
                            />
                            <InputError message={errors.nama_kecamatan} />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Label htmlFor="nama_gampong">Gampong</Label>
                            <Input
                                type="text"
                                id="nama_gampong"
                                name="nama_gampong"
                                value={data.nama_gampong}
                                onChange={(e) =>
                                    setData("nama_gampong", e.target.value)
                                }
                                disabled
                            />
                            <InputError message={errors.nama_gampong} />
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className={cn(
                                "inline-flex flex-row gap-2 col-span-2 items-center w-fit"
                            )}
                        >
                            {processing && (
                                <Loader2 className=" w-4 h-4 animate-spin" />
                            )}
                            <span>Simpan</span>
                        </Button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

export default Profile;
