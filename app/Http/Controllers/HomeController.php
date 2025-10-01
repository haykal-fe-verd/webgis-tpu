<?php

namespace App\Http\Controllers;

use App\Models\PanduanWebgis;
use App\Models\Pemakaman;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $tpu = Pemakaman::with('user')->where('is_approved', "disetujui")->get();

        return Inertia::render('home/index', compact('tpu'));
    }

    public function daftarTpu(Request $request): Response
    {
        $query = Pemakaman::query()->latest();

        if ($request->has('kabupaten') || $request->has('kecamatan') || $request->has('gampong')) {
            $kabupaten = $request->kabupaten;
            $kecamatan = $request->kecamatan;
            $gampong = $request->gampong;

            $query
                ->where('is_approved', "disetujui")
                ->where('id_kabupaten', $kabupaten)
                ->where('id_kecamatan', $kecamatan)
                ->where('id_gampong', $gampong);
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
        $tpu = Pemakaman::with('user')->where('is_approved', "disetujui")->get();

        return Inertia::render('home/peta', compact('tpu'));
    }

    public function tutorial(): Response
    {
        $isi = PanduanWebgis::first();

        return Inertia::render('home/tutorial', compact('isi'));
    }
}
