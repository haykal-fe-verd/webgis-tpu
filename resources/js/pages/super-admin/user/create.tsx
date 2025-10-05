import React from "react";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";

import AuthLayout from "@/layouts/auth-layout";
import { Head, Link, useForm } from "@inertiajs/react";
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
import { GampongResponse, KecamatanResponse } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

function Create() {
    // hooks
    const { data, setData, post, reset, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        id_kabupaten: "",
        nama_kabupaten: "",
        id_kecamatan: "",
        nama_kecamatan: "",
        id_gampong: "",
        nama_gampong: "",
        image: "" as any,
        password_confirmation: "",
        is_keuchik: false,
    });

    // states
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showPasswordConfirm, setShowPasswordConfirm] =
        React.useState<boolean>(false);
    const [kecamatan, setKecamatan] = React.useState<KecamatanResponse[]>([]);
    const [gampong, setGampong] = React.useState<GampongResponse[]>([]);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

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
        post(route("user.store"));
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

        await getGampong(kode);
    };

    const onChangeGampong = async (e: string) => {
        const [kode, namaGampong] = e.split("-");

        setData((prev) => ({
            ...prev,
            id_gampong: kode,
            nama_gampong: namaGampong,
        }));
    };

    const getKecamatan = async (id: string) => {
        await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`
        )
            .then((response) => response.json())
            .then((districts: KecamatanResponse[]) => setKecamatan(districts));
    };

    const getGampong = async (id: string) => {
        await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`
        )
            .then((response) => response.json())
            .then((villages: GampongResponse[]) => setGampong(villages));
    };

    return (
        <AuthLayout>
            <Head title="Tambah User" />

            <div className="space-y-5 ">
                <Link
                    href={route("user.index")}
                    className="flex items-center gap-2 text-muted-foreground"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Kembali</span>
                </Link>

                <h1 className="text-2xl font-bold md:text-4xl">
                    Tambah User Baru
                </h1>

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
                            defaultValue={data.id_kabupaten}
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
                            defaultValue={data.id_kecamatan}
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
                        <Label htmlFor="id_gampong">Gampong</Label>
                        <Select
                            onValueChange={onChangeGampong}
                            defaultValue={data.id_gampong}
                        >
                            <SelectTrigger
                                className="w-full"
                                id="id_gampong"
                                name="id_gampong"
                                disabled={gampong.length <= 0}
                            >
                                <SelectValue placeholder="Pilih Gampong..." />
                            </SelectTrigger>
                            <SelectContent>
                                <ScrollArea className="h-60">
                                    {gampong?.map((item, index) => (
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
                        <InputError message={errors.id_gampong} />
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

                    {previewUrl && (
                        <img
                            id="photoPreview"
                            src={previewUrl}
                            className="object-cover w-full h-[400px]"
                        />
                    )}

                    <div className="w-full flex items-center gap-3">
                        <Checkbox
                            id="is_keuchik"
                            name="is_keuchik"
                            checked={data.is_keuchik}
                            onCheckedChange={(e) =>
                                setData("is_keuchik", Boolean(e))
                            }
                        />
                        <Label htmlFor="is_keuchik">
                            Apakah Keuchik Gampong?
                        </Label>

                        <InputError message={errors.is_keuchik} />
                    </div>

                    <Button className="inline-flex w-fit items-center gap-2">
                        {processing && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        <span>Simpan</span>
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}

export default Create;
