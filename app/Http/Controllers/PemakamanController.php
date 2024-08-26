<?php

namespace App\Http\Controllers;

use App\Models\Pemakaman;
use App\Models\User;
use Illuminate\Support\Facades\File;
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

    public function super_admin_tpu_detail(int $id): Response
    {
        $tpu = Pemakaman::with('user')->find($id);

        return Inertia::render('super-admin/tpu/detail', compact('tpu'));
    }

    public function super_admin_tpu_destroy(int $id): RedirectResponse
    {
        $tpu = Pemakaman::find($id);
        if ($tpu->image) {
            File::delete(public_path('tpu-images/' . basename($tpu->image)));
        }
        $tpu->delete();

        return redirect()->back()->with('success', 'TPU Berhasil dihapus');
    }

    public function super_admin_tpu_create(): Response
    {
        $users = User::all();

        return Inertia::render('super-admin/tpu/create', compact('users'));
    }

    public function super_admin_tpu_store(Request $request): RedirectResponse
    {
        $request->validate([
            "id_user" => ["required", "exists:users,id"],
            'id_kabupaten' => ["required"],
            'id_kecamatan' => ["required"],
            'nama_kabupaten' => ["required"],
            'nama_kecamatan' => ["required"],
            "nama_pemakaman" => ["required", "string", "min:1", "max:255"],
            "luas" => ["required", "integer",],
            "kapasitas" => ["required", "integer",],
            "terpakai" => ["required", "integer",],
            "alamat" => ["required", "string"],
            "latitude" => ["required", "string"],
            "longitude" => ["required", "string"],
            "image" => ["nullable", "image", "mimes:jpeg,png,jpg,gif", "max:2048"],
        ]);


        $pemakaman = new Pemakaman();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('tpu-images'), $new_name);
            $pemakaman->image = $new_name;
        }

        $pemakaman->id_user = $request->id_user;
        $pemakaman->id_kabupaten = $request->id_kabupaten;
        $pemakaman->id_kecamatan = $request->id_kecamatan;
        $pemakaman->nama_kabupaten = $request->nama_kabupaten;
        $pemakaman->nama_kecamatan = $request->nama_kecamatan;
        $pemakaman->nama_pemakaman = $request->nama_pemakaman;
        $pemakaman->luas = $request->luas;
        $pemakaman->kapasitas = $request->kapasitas;
        $pemakaman->terpakai = $request->terpakai;
        $pemakaman->alamat = $request->alamat;
        $pemakaman->latitude = $request->latitude;
        $pemakaman->longitude = $request->longitude;
        $pemakaman->is_approved = true;
        $pemakaman->save();

        return redirect()->route('tpu.index')->with('success', 'TPU Berhasil ditambahkan');
    }

    public function super_admin_tpu_edit(int $id): Response
    {
        $users = User::all();
        $tpu = Pemakaman::with('user')->find($id);

        return Inertia::render('super-admin/tpu/edit', compact('users', 'tpu'));
    }

    public function super_admin_tpu_update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            "id_user" => ["required"],
            'id_kabupaten' => ["required"],
            'id_kecamatan' => ["required"],
            'nama_kabupaten' => ["required"],
            'nama_kecamatan' => ["required"],
            "nama_pemakaman" => ["required", "string", "min:1", "max:255"],
            "luas" => ["required", "integer",],
            "kapasitas" => ["required", "integer",],
            "terpakai" => ["required", "integer",],
            "alamat" => ["required", "string"],
            "latitude" => ["required", "string"],
            "longitude" => ["required", "string"],
            "image" => ["nullable", "image", "mimes:jpeg,png,jpg,gif", "max:2048"],
        ]);

        $pemakaman = Pemakaman::with('user')->find((int)$id);

        $pemakamanData = $request->only([
            "id_user",
            "id_kabupaten",
            "id_kecamatan",
            "nama_kabupaten",
            "nama_kecamatan",
            'nama_pemakaman',
            'luas',
            'kapasitas',
            'terpakai',
            'alamat',
            'latitude',
            'longitude'
        ]);

        if ($request->hasFile('image')) {
            File::delete(public_path('tpu-images/' . basename($pemakaman->image)));

            $image = $request->file('image');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('tpu-images'), $new_name);

            $pemakamanData['image'] = $new_name;
        }

        $pemakaman->update($pemakamanData);

        return redirect()->route('tpu.index')->with('success', 'TPU Berhasil diedit');
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

    public function super_admin_verifikasi_tpu_detail(int $id): Response
    {
        $tpu = Pemakaman::with('user')->find($id);

        return Inertia::render('super-admin/verifikasi/detail', compact('tpu'));
    }

    public function super_admin_verifikasi_tpu_post(int $id): RedirectResponse
    {
        $tpu = Pemakaman::find($id);
        $tpu->update(['is_approved' => true]);

        return redirect()->back()->with('success', 'Pengajuan TPU Berhasil Dikonfirmasi');
    }

    public function super_admin_verifikasi_tpu_destroy(int $id): RedirectResponse
    {
        $tpu = Pemakaman::find($id);
        if ($tpu->image) {
            File::delete(public_path('tpu-images/' . basename($tpu->image)));
        }
        $tpu->delete();

        return redirect()->back()->with('success', 'TPU Berhasil dihapus');
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
        $request->validate([
            "nama_pemakaman" => ["required", "string", "min:1", "max:255"],
            "luas" => ["required", "integer",],
            "kapasitas" => ["required", "integer",],
            "terpakai" => ["required", "integer",],
            "alamat" => ["required", "string"],
            "latitude" => ["required", "string"],
            "longitude" => ["required", "string"],
            "image" => ["required", "image", "mimes:jpeg,png,jpg,gif", "max:2048"],
        ]);

        $pemakaman = new Pemakaman();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('tpu-images'), $new_name);
            $pemakaman->image = $new_name;
        }

        $pemakaman->id_user = $request->id_user;
        $pemakaman->id_kabupaten = $request->id_kabupaten;
        $pemakaman->nama_kabupaten = $request->nama_kabupaten;
        $pemakaman->id_kecamatan = $request->id_kecamatan;
        $pemakaman->nama_kecamatan = $request->nama_kecamatan;
        $pemakaman->nama_pemakaman = $request->nama_pemakaman;
        $pemakaman->luas = $request->luas;
        $pemakaman->kapasitas = $request->kapasitas;
        $pemakaman->terpakai = $request->terpakai;
        $pemakaman->alamat = $request->alamat;
        $pemakaman->latitude = $request->latitude;
        $pemakaman->longitude = $request->longitude;
        $pemakaman->save();

        return redirect()->route('kelola-tpu.index')->with('success', 'TPU Berhasil diajukan, silahkan tunggu persetujuan admin');
    }

    public function admin_tpu_kelola_tpu_detail(int $id): Response
    {
        $tpu = Pemakaman::with('user')->find($id);

        return Inertia::render('admin-tpu/tpu/detail', compact('tpu'));
    }

    public function admin_tpu_kelola_tpu_edit(int $id): Response
    {
        $tpu = Pemakaman::with('user')->find($id);

        return Inertia::render('admin-tpu/tpu/edit', compact('tpu'));
    }

    public function admin_tpu_kelola_tpu_update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            "nama_pemakaman" => ["required", "string", "min:1", "max:255"],
            "luas" => ["required", "integer",],
            "kapasitas" => ["required", "integer",],
            "terpakai" => ["required", "integer",],
            "alamat" => ["required", "string"],
            "latitude" => ["required", "string"],
            "longitude" => ["required", "string"],
            "image" => ["nullable", "image", "mimes:jpeg,png,jpg,gif", "max:2048"],
        ]);

        $tpu = Pemakaman::find($id);

        $tpuData = $request->only([
            'nama_pemakaman',
            'luas',
            'kapasitas',
            'terpakai',
            'alamat',
            'latitude',
            'longitude'
        ]);

        if ($request->hasFile('image')) {
            File::delete(public_path('tpu-images/' . basename($tpu->image)));

            $image = $request->file('image');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('tpu-images'), $new_name);

            $tpuData['image'] = $new_name;
        }

        $tpu->update($tpuData);

        return redirect()->route('kelola-tpu.edit', $id)->with('success', 'TPU Berhasil diupdate');
    }

    public function admin_tpu_kelola_tpu_destroy(int $id): RedirectResponse
    {
        $tpu = Pemakaman::find($id);
        if ($tpu->image) {
            File::delete(public_path('tpu-images/' . basename($tpu->image)));
        }
        $tpu->delete();

        return redirect()->route('kelola-tpu.index')->with('success', 'TPU Berhasil dihapus');
    }
}
