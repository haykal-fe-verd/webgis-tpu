import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
    useMap,
    LayersControl,
} from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KecamatanResponse, PageProps, Pemakaman } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import GuestLayout from "@/layouts/guest-layout";
import { Globe, MapPin, Search, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // optional util untuk className join
import { useMediaQuery } from "@/hooks/use-mobile";

function SetMapRef({
    mapRef,
}: {
    mapRef: React.MutableRefObject<L.Map | null>;
}) {
    const map = useMap();
    React.useEffect(() => {
        mapRef.current = map;
    }, [map]);
    return null;
}

// ===== Helper: Fit to data + reset when empty =====
function FitOnData({
    data,
    hasSearched,
    overlayId = "map-overlay",
    fallbackCenter,
    fallbackZoom,
}: {
    data: Pemakaman[];
    hasSearched: boolean;
    overlayId?: string;
    fallbackCenter: [number, number];
    fallbackZoom: number;
}) {
    const map = useMap();

    React.useEffect(() => {
        if (!hasSearched) return;

        if (data.length === 0) {
            map.setView(fallbackCenter, fallbackZoom, { animate: true });
            return;
        }

        const bounds = L.latLngBounds(
            data.map(
                (p) =>
                    [parseFloat(p.latitude), parseFloat(p.longitude)] as [
                        number,
                        number
                    ]
            )
        );

        // padding kiri agar tidak ketutup overlay
        let paddingLeft = 0;
        const el = document.getElementById(overlayId);
        if (el) {
            const w = el.getBoundingClientRect().width;
            const isAlmostFull = w > window.innerWidth * 0.8;
            if (!isAlmostFull) paddingLeft = w + 24;
        }

        map.fitBounds(bounds, {
            paddingTopLeft: [paddingLeft, 24],
            paddingBottomRight: [24, 24],
            maxZoom: 13,
            animate: true,
        });
    }, [data, hasSearched, map, overlayId, fallbackCenter, fallbackZoom]);

    return null;
}

// ===== Helper: DivIcon berlabel (mirip jQuery) =====
function createLabelIcon(label: string) {
    // escape sederhana untuk tanda petik tunggal
    const safe = String(label).replace(/'/g, "\\'");
    return L.divIcon({
        className: "custom-div-icon",
        html: `
      <div class="flex flex-col gap-2 items-center text-center">
        <small class="label text-center bg-white px-2 py-1 rounded border" style="white-space: nowrap;">${safe}</small>
        <img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" alt="marker"/>
      </div>
    `,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
}

interface PetaProps extends PageProps {
    tpu: Pemakaman[];
}

function Peta() {
    const isMobile = useMediaQuery(); // default max-width:768px
    const ctlPos = (isMobile ? "bottomright" : "topright") as
        | "topleft"
        | "topright"
        | "bottomleft"
        | "bottomright";

    const { tpu } = usePage<PetaProps>().props;
    const { get } = useForm();

    const initialLat = 4.672;
    const initialLng = 95.806;

    const [idKabupaten, setIdKabupaten] = React.useState<string>("");
    const [idKecamatan, setIdKecamatan] = React.useState<string>("");
    const [kecamatan, setKecamatan] = React.useState<KecamatanResponse[]>([]);
    const [hasSearched, setHasSearched] = React.useState(false);
    const [activeId, setActiveId] = React.useState<number | null>(null); // NEW

    // refs untuk map & marker
    const mapRef = React.useRef<L.Map | null>(null);
    const markerRefs = React.useRef<Record<number, L.Marker>>({});

    React.useEffect(() => {
        const qs = new URLSearchParams(window.location.search);
        if (qs.get("kabupaten") && qs.get("kecamatan")) setHasSearched(true);
    }, []);

    // ====== Fetch kecamatan saat kabupaten berubah ======
    const onChangeKabupaten = async (val: string) => {
        setIdKabupaten(val);
        setIdKecamatan("");
        setHasSearched(false); // optional: agar FitOnData tidak auto-fit lagi

        mapRef.current?.setView([initialLat, initialLng], 8, {
            animate: true,
        });

        await getKecamatan(val);
    };

    // ====== AUTO FETCH setiap kecamatan berubah (tanpa klik "Cari") ======
    const onChangeKecamatan = (val: string) => {
        setIdKecamatan(val);
        if (!idKabupaten) return; // pastikan kabupaten sudah ada
        setHasSearched(true);
        get(route("peta", { kabupaten: idKabupaten, kecamatan: val }), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const getKecamatan = async (id: string) => {
        const res = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`
        );
        const districts: KecamatanResponse[] = await res.json();
        setKecamatan(districts);
    };

    // fokus ke marker dari daftar
    const focusOnPemakaman = (p: Pemakaman) => {
        setActiveId(p.id); // NEW: highlight kartu aktif
        const lat = parseFloat(p.latitude);
        const lng = parseFloat(p.longitude);

        // FIX: mapRef dijamin terisi via whenCreated
        mapRef.current?.flyTo([lat, lng], 16, { animate: true });

        const m = markerRefs.current[p.id];
        if (m) {
            setTimeout(() => m.openPopup(), 350);
        }
    };

    const showPromptPick = !idKabupaten || !idKecamatan;
    const showClickSearch = idKabupaten && idKecamatan && !hasSearched;
    const showNoData =
        idKabupaten && idKecamatan && hasSearched && tpu.length === 0;
    const showList =
        idKabupaten && idKecamatan && hasSearched && tpu.length > 0;

    return (
        <GuestLayout enabledFooter={false}>
            <Head title="Peta" />

            <section id="peta">
                <div className="w-full h-full relative">
                    <MapContainer
                        center={[initialLat, initialLng]}
                        zoom={8}
                        zoomControl={false}
                        style={{
                            height: "calc(100dvh - 60px)",
                            width: "100%",
                            zIndex: 0,
                        }}
                        // whenReady={(e) => {
                        //     // e.target adalah instance Leaflet Map
                        //     mapRef.current = e.target as L.Map;
                        // }}
                    >
                        <SetMapRef mapRef={mapRef} />

                        <ZoomControl position={ctlPos} />

                        {/* NEW: toggle basemap mirip jQuery (Streets vs Hybrid) */}
                        <LayersControl position={ctlPos}>
                            <LayersControl.BaseLayer
                                checked
                                name="Google Hybrid"
                            >
                                <TileLayer
                                    maxZoom={20}
                                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                    attribution='&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google</a>'
                                    url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // FIX: https
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="Google Streets">
                                <TileLayer
                                    maxZoom={20}
                                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                    attribution='&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google</a>'
                                    url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // FIX: https
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>

                        <FitOnData
                            data={tpu}
                            hasSearched={hasSearched}
                            overlayId="map-overlay"
                            fallbackCenter={[initialLat, initialLng]}
                            fallbackZoom={8}
                        />

                        {tpu.map((pemakaman) => (
                            <Marker
                                key={pemakaman.id}
                                position={[
                                    parseFloat(pemakaman.latitude),
                                    parseFloat(pemakaman.longitude),
                                ]}
                                icon={createLabelIcon(pemakaman.nama_pemakaman)}
                                ref={(ref) => {
                                    if (ref)
                                        markerRefs.current[pemakaman.id] = ref;
                                }}
                            >
                                <Popup>
                                    <table className="w-[220px] text-[10px]">
                                        <tbody>
                                            <tr>
                                                <td className="w-[100px]">
                                                    Nama TPU
                                                </td>
                                                <td>:</td>
                                                <td>
                                                    {pemakaman.nama_pemakaman}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Kabupaten</td>
                                                <td>:</td>
                                                <td>
                                                    {pemakaman.nama_kabupaten}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Kecamatan</td>
                                                <td>:</td>
                                                <td>
                                                    {pemakaman.nama_kecamatan}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Alamat</td>
                                                <td>:</td>
                                                <td>{pemakaman.alamat}</td>
                                            </tr>
                                            <tr>
                                                <td>Luas</td>
                                                <td>:</td>
                                                <td>
                                                    {pemakaman.luas} m
                                                    <sup>2</sup>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Detail</td>
                                                <td>:</td>
                                                <td>
                                                    <Link
                                                        href={route(
                                                            "daftar-tpu-detail",
                                                            pemakaman.id
                                                        )}
                                                        className="text-blue-500 underline"
                                                    >
                                                        Lihat
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                    {/* overlay kiri (filter + list) */}
                    <div
                        id="map-overlay"
                        className="pointer-events-none absolute inset-0 z-[10]"
                    >
                        <div className="pointer-events-auto absolute top-4 left-4 bottom-4 w-full lg:w-[400px] space-y-4 flex flex-col">
                            {/* filter */}
                            <Card className="bg-card/90 backdrop-blur">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Globe className="w-4 h-4" /> Peta
                                        Sebaran TPU
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-6 pb-5 flex flex-col gap-5">
                                    {/* Kab/Kota — contoh statis; kalau mau dinamis, fetch dari API provinsi */}
                                    <Select
                                        onValueChange={onChangeKabupaten}
                                        value={idKabupaten}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Kabupaten / Kota" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1171">
                                                KOTA BANDA ACEH
                                            </SelectItem>
                                            <SelectItem value="1108">
                                                KABUPATEN ACEH BESAR
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        onValueChange={onChangeKecamatan}
                                        value={idKecamatan}
                                    >
                                        <SelectTrigger
                                            disabled={
                                                !idKabupaten ||
                                                kecamatan.length <= 0
                                            }
                                        >
                                            <SelectValue placeholder="Kecamatan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <ScrollArea className="h-60">
                                                {kecamatan?.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </ScrollArea>
                                        </SelectContent>
                                    </Select>
                                </CardContent>
                            </Card>

                            {/* list */}
                            <Card className="hidden lg:block lg:flex-1 min-h-0 bg-card/90 backdrop-blur">
                                {showList ? (
                                    <CardContent className="p-0 h-full overflow-hidden">
                                        <ScrollArea className="h-full p-4">
                                            <div className="space-y-3">
                                                {tpu.map((p) => (
                                                    <Card
                                                        key={p.id}
                                                        onClick={() =>
                                                            focusOnPemakaman(p)
                                                        }
                                                        className={cn(
                                                            "cursor-pointer transition-colors",
                                                            activeId === p.id
                                                                ? "bg-primary text-primary-foreground ring-1 ring-border"
                                                                : "hover:bg-muted/30"
                                                        )}
                                                    >
                                                        <CardContent className="p-4">
                                                            <div className="font-semibold">
                                                                {
                                                                    p.nama_pemakaman
                                                                }
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {
                                                                    p.nama_kecamatan
                                                                }
                                                                ,{" "}
                                                                {
                                                                    p.nama_kabupaten
                                                                }
                                                            </div>
                                                            <div className="text-sm mt-1">
                                                                {p.alamat}
                                                            </div>
                                                            <div className="text-xs mt-2">
                                                                Luas: {p.luas} m
                                                                <sup>2</sup>
                                                            </div>
                                                            <Link
                                                                href={route(
                                                                    "daftar-tpu-detail",
                                                                    p.id
                                                                )}
                                                                className="text-blue-600 underline text-sm mt-2 inline-block"
                                                            >
                                                                Lihat detail
                                                            </Link>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                ) : (
                                    <CardContent className="p-6 h-full flex items-center justify-center flex-col text-center text-muted-foreground gap-3">
                                        {showPromptPick && (
                                            <>
                                                <MapPin className="w-10 h-10" />
                                                <p className="text-sm">
                                                    Silakan pilih kabupaten/kota
                                                    dan kecamatan
                                                </p>
                                            </>
                                        )}
                                        {showClickSearch && (
                                            <>
                                                <Search className="w-10 h-10" />
                                                <p className="text-sm">
                                                    Klik “Cari” untuk
                                                    menampilkan data
                                                </p>
                                            </>
                                        )}
                                        {showNoData && (
                                            <>
                                                <XCircle className="w-10 h-10" />
                                                <p className="text-sm">
                                                    Tidak ada data ditemukan
                                                </p>
                                            </>
                                        )}
                                    </CardContent>
                                )}
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}

export default Peta;
