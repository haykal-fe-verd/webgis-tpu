<?php

namespace App\Http\Controllers;

use App\Models\Pemakaman;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PemakamanController extends Controller
{
    //! super admin
    public function super_admin_tpu_index(Request $request): Response
    {
        $query = Pemakaman::query()->with('user')->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama_pemakaman', 'LIKE', "%$search%")
                    ->orWhere('nama_kabupaten', 'LIKE', "%$search%")
                    ->orWhere('nama_kecamatan', 'LIKE', "%$search%")
                    ->orWhere('luas', 'LIKE', "%$search%")
                    ->orWhere('kapasitas', 'LIKE', "%$search%")
                    ->orWhere('alamat', 'LIKE', "%$search%")
                    ->orWhere('terpakai', 'LIKE', "%$search%")
                    ->orWhereHas('user', function ($query) use ($search) {
                        $query->where('name', 'LIKE', "%$search%");
                    });
            });
        }

        $query->orderBy('created_at', 'desc');

        $tpu = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('super-admin/tpu/index', compact('tpu'));
    }

    public function super_admin_verifikasi_tpu_index(Request $request): Response
    {
        $query = Pemakaman::query()->with('user')->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama_pemakaman', 'LIKE', "%$search%")
                    ->orWhere('nama_kabupaten', 'LIKE', "%$search%")
                    ->orWhere('nama_kecamatan', 'LIKE', "%$search%")
                    ->orWhere('luas', 'LIKE', "%$search%")
                    ->orWhere('kapasitas', 'LIKE', "%$search%")
                    ->orWhere('alamat', 'LIKE', "%$search%")
                    ->orWhere('terpakai', 'LIKE', "%$search%")
                    ->orWhereHas('user', function ($query) use ($search) {
                        $query->where('name', 'LIKE', "%$search%");
                    });
            });
        }

        $query->orderBy('is_approved', 'asc');

        $tpu = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('super-admin/verifikasi/index', compact('tpu'));
    }

    //! admin tpu
    public function admin_tpu_kelola_tpu(Request $request): Response
    {
        $query = Pemakaman::query()->with('user')->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('nama_pemakaman', 'LIKE', "%$search%")
                    ->orWhere('nama_kabupaten', 'LIKE', "%$search%")
                    ->orWhere('nama_kecamatan', 'LIKE', "%$search%")
                    ->orWhere('luas', 'LIKE', "%$search%")
                    ->orWhere('kapasitas', 'LIKE', "%$search%")
                    ->orWhere('terpakai', 'LIKE', "%$search%")
                    ->orWhere('alamat', 'LIKE', "%$search%");
            });
        }

        $query
            ->where('id_kabupaten', $request->user()->id_kabupaten)
            ->where('id_kecamatan', $request->user()->id_kecamatan);

        $tpu = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('admin-tpu/tpu/index', compact('tpu'));
    }

    public function admin_tpu_kelola_tpu_create(): Response
    {
        return Inertia::render('admin-tpu/tpu/create');
    }

    public function admin_tpu_kelola_tpu_store(Request $request): RedirectResponse
    {
        dd($request->all());
        return redirect()->route('kelola-tpu.index')->with('success', 'TPU Berhasil diajukan, silahkan tunggu persetujuan admin');
    }
}
