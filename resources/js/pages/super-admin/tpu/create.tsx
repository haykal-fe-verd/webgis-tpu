import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Check, ChevronLeft, ChevronsUpDown, Loader2 } from "lucide-react";
import {
    MapContainer,
    TileLayer,
    FeatureGroup,
    Marker,
    Popup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import { GampongResponse, KecamatanResponse, PageProps, User } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { latitude, longitude } from "@/data/center";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CreateTpuProps extends PageProps {
    users: User[];
}

function CreateTpu() {
    // hooks
    const { data, setData, post, reset, errors, processing } = useForm({
        id_user: "",
        id_kabupaten: "",
        nama_kabupaten: "",
        id_kecamatan: "",
        nama_kecamatan: "",
        nama_pemakaman: "",
        id_gampong: "",
        nama_gampong: "",
        luas: 0,
        kapasitas: 0,
        alamat: "",
        image: "" as any,
        latitude: "",
        longitude: "",
        keterangan: "",
    });

    const { users } = usePage<CreateTpuProps>().props;

    // states
    const [open, setOpen] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string | null>("");
    const mapRef = React.useRef(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [markerPosition, setMarkerPosition] = React.useState<
        [number, number] | null
    >(null);
    const [kecamatan, setKecamatan] = React.useState<KecamatanResponse[]>([]);
    const [gampong, setGampong] = React.useState<GampongResponse[]>([]);

    // events
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const onSelect = (item: User) => {
        setValue(item.id as unknown as string);
        setData((prev) => ({
            ...prev,
            id_user: item.id as unknown as string,
            // id_kabupaten: item.id_kabupaten as unknown as string,
            // id_kecamatan: item.id_kecamatan as unknown as string,
            // id_gampong: item.id_gampong as unknown as string,
            // nama_kabupaten: item.nama_kabupaten as unknown as string,
            // nama_kecamatan: item.nama_kecamatan as unknown as string,
            // nama_gampong: item.nama_gampong as unknown as string,
        }));
        setOpen(false);
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

    const onCreated = (e: any) => {
        const { layer } = e;
        const { lat, lng } = layer.getLatLng();

        setData((prev) => ({
            ...prev,
            latitude: lat as string,
            longitude: lng as string,
        }));
    };

    const onEdited = (e: any) => {
        let editKey = Object.keys(e.layers._layers)[0];
        let editedItem = e.layers._layers[editKey];
        const { lat, lng } = editedItem._latlng;
        setData((prev) => ({
            ...prev,
            latitude: lat as string,
            longitude: lng as string,
        }));
    };

    const onDeleted = () => {
        setData((prev) => ({
            ...prev,
            latitude: "",
            longitude: "",
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("tpu.store"));
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

    // mounted
    React.useEffect(() => {
        if (data.latitude && data.longitude) {
            setMarkerPosition([
                parseFloat(data.latitude),
                parseFloat(data.longitude),
            ]);
        } else {
            setMarkerPosition(null);
        }
    }, [data.latitude, data.longitude]);

    return (
        <AuthLayout>
            <Head title="Tambah TPU Baru" />

            <div className="space-y-5">
                <Link
                    href={route("tpu.index")}
                    className="flex items-center gap-2 text-muted-foreground"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Kembali</span>
                </Link>

                <h1 className="text-2xl font-bold md:text-4xl">
                    Tambah TPU Baru
                </h1>

                <div className="space-y-5 ">
                    <form
                        onSubmit={onSubmit}
                        encType="multipart/form-data"
                        className="flex flex-col gap-5"
                    >
                        <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
                            <div className="w-full space-y-5">
                                <div className="w-full">
                                    <Label htmlFor="nama_pemakaman">
                                        Nama TPU
                                    </Label>
                                    <Input
                                        type="text"
                                        id="nama_pemakaman"
                                        name="nama_pemakaman"
                                        value={data.nama_pemakaman}
                                        onChange={(e) =>
                                            setData(
                                                "nama_pemakaman",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.nama_pemakaman}
                                    />
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="luas">Luas</Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            min={0}
                                            id="luas"
                                            name="luas"
                                            value={data.luas}
                                            onChange={(e) =>
                                                setData(
                                                    "luas",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                        <div className="absolute inset-y-0 right-0 rounded-r-md px-3 pl-3 flex items-center pointer-events-none bg-primary text-primary-foreground">
                                            m<sup>2</sup>
                                        </div>
                                    </div>

                                    <InputError message={errors.luas} />
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="kapasitas">Kapasitas</Label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            min={0}
                                            id="kapasitas"
                                            name="kapasitas"
                                            value={data.kapasitas}
                                            onChange={(e) =>
                                                setData(
                                                    "kapasitas",
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                        <div className="absolute inset-y-0 right-0 rounded-r-md px-3 pl-3 flex items-center pointer-events-none bg-primary text-primary-foreground">
                                            Orang
                                        </div>
                                    </div>
                                    <InputError message={errors.kapasitas} />
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="alamat">Alamat</Label>
                                    <Textarea
                                        id="alamat"
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.alamat} />
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="keterangan">
                                        Keterangan
                                    </Label>
                                    <Textarea
                                        id="keterangan"
                                        name="keterangan"
                                        value={data.keterangan}
                                        onChange={(e) =>
                                            setData(
                                                "keterangan",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError message={errors.keterangan} />
                                </div>
                            </div>

                            <div className="w-full space-y-5">
                                <div className="w-full">
                                    <Label htmlFor="id_user">
                                        Penanggung Jawab
                                    </Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                            >
                                                {value
                                                    ? users.find(
                                                          (item) =>
                                                              (item.id as unknown as string) ===
                                                              value
                                                      )?.name
                                                    : "Pilih Penanggung Jawab..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-fit p-0">
                                            <Command>
                                                <CommandInput placeholder="Pilih User..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        User tidak ditemukan.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {users.map((item) => (
                                                            <CommandItem
                                                                key={item.id}
                                                                value={
                                                                    item.id as unknown as string
                                                                }
                                                                onSelect={() =>
                                                                    onSelect(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        value ===
                                                                            (item.id as unknown as string)
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />

                                                                {` ${item.name} - ${item.nama_kabupaten} | ${item.nama_kecamatan}`}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <InputError message={errors.id_user} />
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="id_kabupaten">
                                        Kabupaten
                                    </Label>
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
                                    <Label htmlFor="id_kecamatan">
                                        Kecamatan
                                    </Label>
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
                                                {kecamatan?.map(
                                                    (item, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={`${item.id}-${item.name}`}
                                                        >
                                                            {item.name}
                                                        </SelectItem>
                                                    )
                                                )}
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
                            </div>
                        </div>

                        <div className="w-full space-y-5">
                            <MapContainer
                                ref={mapRef}
                                center={[latitude, longitude]}
                                zoom={9}
                                scrollWheelZoom={false}
                                style={{
                                    height: "400px",
                                    width: "100%",
                                    zIndex: 0,
                                }}
                            >
                                <FeatureGroup>
                                    <EditControl
                                        position="topright"
                                        onCreated={onCreated}
                                        onEdited={onEdited}
                                        onDeleted={onDeleted}
                                        draw={{
                                            rectangle: false,
                                            circle: false,
                                            circlemarker: false,
                                            marker: true,
                                            polyline: false,
                                            polygon: false,
                                        }}
                                    />
                                </FeatureGroup>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {markerPosition && (
                                    <Marker position={markerPosition}>
                                        <Popup>
                                            Latitude: {markerPosition[0]} <br />
                                            Longitude: {markerPosition[1]}
                                        </Popup>
                                    </Marker>
                                )}
                            </MapContainer>

                            <div className="w-full flex items-center justify-between gap-5">
                                <div className="w-full">
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input
                                        type="text"
                                        id="latitude"
                                        name="latitude"
                                        value={data.latitude}
                                        onChange={(e) =>
                                            setData("latitude", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.latitude} />
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input
                                        type="text"
                                        id="longitude"
                                        name="longitude"
                                        value={data.longitude}
                                        onChange={(e) =>
                                            setData("longitude", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.longitude} />
                                </div>
                            </div>

                            <div className="w-full">
                                <Label htmlFor="image">Upload Foto</Label>
                                <Input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={onChange}
                                />
                                <InputError message={errors.image} />
                            </div>

                            {previewUrl && (
                                <img
                                    id="photoPreview"
                                    src={previewUrl}
                                    className="object-cove w-full h-[400px]"
                                />
                            )}
                        </div>

                        <Button className="inline-flex w-fit items-center gap-2">
                            {processing && (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            )}
                            <span>Tambah</span>
                        </Button>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}

export default CreateTpu;
