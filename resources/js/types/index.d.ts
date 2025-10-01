export interface User {
    id: number;
    name: string;
    email: string;
    role: "super admin" | "admin tpu" | string;
    phone?: string;
    image?: any;
    id_kabupaten?: string;
    nama_kabupaten?: string;
    id_kecamatan?: string;
    nama_kecamatan?: string;
    id_gampong?: string;
    nama_gampong?: string;
    email_verified_at: string;
}

export interface UserResponse {
    data: User[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    links: Link[];
}

export interface Sessions {
    message?: string;
    success?: string;
    error?: string;
}

export interface Ziggy {
    routes: {
        [name: string]: string;
    };
    location: string;
}

export interface KabupatenResponse {
    id: string;
    province_id: string;
    name: string;
}

export interface KecamatanResponse {
    id: string;
    regency_id: string;
    name: string;
}

export interface GampongResponse {
    id: string;
    district_id: string;
    name: string;
}

export interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationType {
    current_page: number;
    path?: string;
    first_page_url?: string;
    last_page_url?: string;
    next_page_url?: string | null;
    prev_page_url?: string | null;
    from: number;
    to: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Link[];
}

export interface Pemakaman {
    id: number;
    id_user: number;
    user?: User | null;
    nama_pemakaman: string;
    id_kabupaten: string;
    nama_kabupaten: string;
    id_kecamatan: string;
    nama_kecamatan: string;
    id_gampong: string;
    nama_gampong: string;
    luas: number;
    kapasitas: number;
    alamat: string;
    image?: any;
    latitude: string;
    longitude: string;
    is_approved: string;
}

export interface PemakamanResponse {
    data: Pemakaman[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    links: Link[];
}

export interface Booking {
    id: number;
    id_pemakaman: number;
    name: string;
    email: string;
    hp: string;
    pemakaman?: Pemakaman | null;
    created_at: string;
    updated_at: string;
}

export interface BookingResponse {
    data: Booking[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    links: Link[];
}

export interface Isi {
    id: number;
    isi: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    user: User;
    sessions: Sessions;
    ziggy: Ziggy;
    status: string;
};
