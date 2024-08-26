import React from "react";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";

import { KecamatanResponse, PageProps, User } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditProps extends PageProps {
    pengguna: User;
}

function Edit() {
    // hooks
    const { pengguna } = usePage<EditProps>().props;
    const { data, setData, post, reset, errors, processing } = useForm({
        name: pengguna.name,
        email: pengguna.email,
        password: "",
        password_confirmation: "",
        role: pengguna.role,
        phone: pengguna.phone,
        id_kabupaten: pengguna.id_kabupaten,
        nama_kabupaten: pengguna.nama_kabupaten,
        id_kecamatan: pengguna.id_kecamatan,
        nama_kecamatan: pengguna.nama_kecamatan,
        image: "" as any,
    });

    // states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] =
        React.useState<boolean>(false);
    const [kecamatan, setKecamatan] = React.useState<KecamatanResponse[]>([]);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [valueKabupaten, setValueKabupaten] = React.useState<string>(
        `${pengguna.id_kabupaten}-${pengguna.nama_kabupaten}`
    );
    const [valueKecamatan, setValueKecamatan] = React.useState<string>(
        `${pengguna.id_kecamatan}-${pengguna.nama_kecamatan}`
    );

    // events
    const onChangeFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("user.update", pengguna.id));
    };

    const onChangeKabupaten = async (e: string) => {
        const [kode, namaKota] = e.split("-");

        setData((prev) => ({
            ...prev,
            id_kabupaten: kode,
            nama_kabupaten: namaKota,
        }));

        await getKecamatan(kode);
    };

    const onChangeKecamatan = async (e: string) => {
        const [kode, namaKec] = e.split("-");

        setData((prev) => ({
            ...prev,
            id_kecamatan: kode,
            nama_kecamatan: namaKec,
        }));
    };

    const getKecamatan = async (id: string) => {
        await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`
        )
            .then((response) => response.json())
            .then((districts: KecamatanResponse[]) => setKecamatan(districts));
    };

    React.useEffect(() => {
        getKecamatan(pengguna.id_kabupaten!);
        setValueKabupaten(
            `${pengguna.id_kabupaten}-${pengguna.nama_kabupaten}`
        );
        setValueKecamatan(
            `${pengguna.id_kecamatan}-${pengguna.nama_kecamatan}`
        );
    }, []);

    return (
        <AuthLayout>
            <Head title="Edit User" />

            <div className="space-y-5 ">
                <Link
                    href={route("user.index")}
                    className="flex items-center gap-2 text-muted-foreground"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Kembali</span>
                </Link>

                <h1 className="text-2xl font-bold md:text-4xl">Edit User</h1>

                <form
                    onSubmit={onSubmit}
                    encType="multipart/form-data"
                    className="flex flex-col gap-5"
                >
                    <div className="w-full">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            autoFocus
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <button
                                type="button"
                                id="showPassword"
                                name="showPassword"
                                aria-label="showPassword"
                                className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        <InputError message={errors.password} />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="password_confirmation">
                            Konfirmasi Password
                        </Label>
                        <div className="relative">
                            <Input
                                type={showPasswordConfirm ? "text" : "password"}
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                            <button
                                type="button"
                                id="showPasswordConfirm"
                                name="showPasswordConfirm"
                                aria-label="showPasswordConfirm"
                                className="absolute inset-y-0 right-0 flex items-center p-3 text-white rounded-tr-md rounded-br-md bg-primary"
                                onClick={() =>
                                    setShowPasswordConfirm(!showPasswordConfirm)
                                }
                            >
                                {showPasswordConfirm ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="role">Role</Label>
                        <Select
                            onValueChange={(e) => setData("role", e)}
                            defaultValue={data.role}
                        >
                            <SelectTrigger
                                className="w-full"
                                id="role"
                                name="role"
                            >
                                <SelectValue placeholder="Pilih Role..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="super admin">
                                    Super Admin
                                </SelectItem>
                                <SelectItem value="admin tpu">
                                    Admin TPU
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="phone">No HP</Label>
                        <Input
                            type="text"
                            id="phone"
                            name="phone"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="id_kabupaten">Kabupaten</Label>
                        <Select
                            onValueChange={onChangeKabupaten}
                            defaultValue={valueKabupaten}
                        >
                            <SelectTrigger
                                className="w-full"
                                id="id_kabupaten"
                                name="id_kabupaten"
                            >
                                <SelectValue placeholder="Pilih Kabupaten..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1171-KOTA BANDA ACEH">
                                    KOTA BANDA ACEH
                                </SelectItem>
                                <SelectItem value="1108-KABUPATEN ACEH BESAR">
                                    KABUPATEN ACEH BESAR
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.id_kabupaten} />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="id_kecamatan">Kecamatan</Label>
                        <Select
                            onValueChange={onChangeKecamatan}
                            defaultValue={valueKecamatan}
                        >
                            <SelectTrigger
                                className="w-full"
                                id="id_kecamatan"
                                name="id_kecamatan"
                                disabled={kecamatan.length <= 0}
                            >
                                <SelectValue placeholder="Pilih Kecamatan..." />
                            </SelectTrigger>
                            <SelectContent>
                                <ScrollArea className="h-60">
                                    {kecamatan?.map((item, index) => (
                                        <SelectItem
                                            key={index}
                                            value={`${item.id}-${item.name}`}
                                        >
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.id_kecamatan} />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="image">Foto</Label>
                        <Input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={onChangeFoto}
                        />
                        <InputError message={errors.image} />
                    </div>

                    {previewUrl ? (
                        <img
                            id="photoPreview"
                            src={previewUrl}
                            className="object-cover w-full h-[400px]"
                        />
                    ) : (
                        <img
                            id="photoPreview"
                            src={`/avatars/${pengguna.image}`}
                            className="object-cover w-full h-[400px]"
                        />
                    )}

                    <Button className="inline-flex w-fit items-center gap-2">
                        {processing && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        <span>Edit</span>
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}

export default Edit;
