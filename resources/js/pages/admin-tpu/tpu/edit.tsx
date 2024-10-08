import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ChevronLeft, Loader2 } from "lucide-react";
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

import { PageProps, Pemakaman } from "@/types";

import AuthLayout from "@/layouts/auth-layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EditKelolaTpuProps extends PageProps {
    tpu: Pemakaman;
}
function EditKelolaTpu() {
    // hooks
    const { user, tpu } = usePage<EditKelolaTpuProps>().props;

    const { data, setData, post, reset, errors, processing } = useForm({
        id_user: user.id,
        id_kabupaten: user.id_kabupaten,
        nama_kabupaten: user.nama_kabupaten,
        id_kecamatan: user.id_kecamatan,
        nama_kecamatan: user.nama_kecamatan,
        nama_pemakaman: tpu?.nama_pemakaman ?? "",
        luas: tpu?.luas ?? 0,
        kapasitas: tpu?.kapasitas ?? 0,
        terpakai: tpu?.terpakai ?? 0,
        alamat: tpu?.alamat ?? "",
        image: "" as any,
        latitude: tpu?.latitude ?? "",
        longitude: tpu?.longitude ?? "",
    });

    // states
    const mapRef = React.useRef(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [markerPosition, setMarkerPosition] = React.useState<
        [number, number] | null
    >(null);

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
        post(route("kelola-tpu.update", tpu.id));
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
            <Head title="Edit TPU" />

            <div className="space-y-5">
                <Link
                    href={route("kelola-tpu.index")}
                    className="flex items-center gap-2 text-muted-foreground"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Kembali</span>
                </Link>

                <h1 className="text-2xl font-bold md:text-4xl">
                    Edit TPU {tpu?.nama_pemakaman}
                </h1>

                <div className="space-y-5 ">
                    <form
                        onSubmit={onSubmit}
                        encType="multipart/form-data"
                        className="flex items-start justify-between gap-5"
                    >
                        <div className="w-full space-y-5">
                            <div className="w-full">
                                <Label htmlFor="nama_pemakaman">Nama TPU</Label>
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
                                <InputError message={errors.nama_pemakaman} />
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
                                <Label htmlFor="terpakai">Terpakai</Label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        min={0}
                                        id="terpakai"
                                        name="terpakai"
                                        value={data.terpakai}
                                        onChange={(e) =>
                                            setData(
                                                "terpakai",
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />
                                    <div className="absolute inset-y-0 right-0 rounded-r-md px-3 pl-3 flex items-center pointer-events-none bg-primary text-primary-foreground">
                                        Orang
                                    </div>
                                </div>
                                <InputError message={errors.terpakai} />
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

                            <Button className="inline-flex w-fit items-center gap-2">
                                {processing && (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                )}
                                <span>Edit</span>
                            </Button>
                        </div>

                        <div className="w-full space-y-5">
                            <MapContainer
                                ref={mapRef}
                                center={[
                                    parseFloat(tpu.latitude),
                                    parseFloat(tpu.longitude),
                                ]}
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

                            {previewUrl ? (
                                <img
                                    id="photoPreview"
                                    src={previewUrl}
                                    className="object-cove w-full h-[400px]"
                                />
                            ) : (
                                <img
                                    id="image"
                                    src={`/tpu-images/${tpu.image}`}
                                    className="object-cove w-full h-[400px]"
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}

export default EditKelolaTpu;
