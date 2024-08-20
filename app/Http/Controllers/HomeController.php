<?php

namespace App\Http\Controllers;

use App\Models\Pemakaman;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('home/index');
    }

    public function daftarTpu(Request $request): Response
    {
        $query = Pemakaman::query()->latest();

        if ($request->has('kabupaten') || $request->has('kecamatan')) {
            $kabupaten = $request->kabupaten;
            $kecamatan = $request->kecamatan;

            $query
                ->where('is_approved', 1)
                ->where('id_kabupaten', $kabupaten)
                ->where('id_kecamatan', $kecamatan);
        }

        $pemakaman = $query->paginate(12)->appends($request->all());

        return Inertia::render('home/daftar-tpu', compact('pemakaman'));
    }

    public function daftarTpuDetail(int $id): Response
    {
        $pemakaman = Pemakaman::with('user')->find($id);

        return Inertia::render('home/daftar-tpu-detail', compact('pemakaman'));
    }

    public function bookingTpu(int $id): Response
    {
        $pemakaman = Pemakaman::find($id);

        return Inertia::render('home/booking-tpu', compact('pemakaman'));
    }

    public function peta(): Response
    {
        return Inertia::render('home/peta');
    }

    public function tutorial(): Response
    {
        return Inertia::render('home/tutorial');
    }
}
