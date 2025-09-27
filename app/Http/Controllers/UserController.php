<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::query()->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('name', 'LIKE', "%$search%")
                    ->orWhere('email', 'LIKE', "%$search%")
                    ->orWhere('phone', 'LIKE', "%$search%")
                    ->orWhere('nama_kabupaten', 'LIKE', "%$search%")
                    ->orWhere('nama_kecamatan', 'LIKE', "%$search%");
            });
        }

        $query->orderBy('role', 'asc');

        $users = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('super-admin/user/index', compact('users'));
    }

    public function create(): Response
    {
        return Inertia::render('super-admin/user/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'string', 'in:super admin,admin tpu'],
            'phone' => ['required', 'string', 'max:255'],
            'nama_kabupaten' => ['required', 'string', 'max:255'],
            'nama_kecamatan' => ['required', 'string', 'max:255'],
            'nama_gampong' => ['required', 'string', 'max:255'],
            'id_kabupaten' => ['required', 'string', 'max:255'],
            'id_kecamatan' => ['required', 'string', 'max:255'],
            'id_gampong' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ]);

        $user = new User();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('avatars'), $new_name);
            $user->image = $new_name;
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->role = $request->role;
        $user->phone = $request->phone;
        $user->id_kabupaten = $request->id_kabupaten;
        $user->id_kecamatan = $request->id_kecamatan;
        $user->id_gampong = $request->id_gampong;
        $user->nama_kabupaten = $request->nama_kabupaten;
        $user->nama_kecamatan = $request->nama_kecamatan;
        $user->nama_gampong = $request->nama_gampong;
        $user->email_verified_at = now();
        $user->save();

        return redirect()->route('user.index')->with('success', 'User berhasil ditambahkan.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $user = User::find($id);

        if ($user->image) {
            File::delete(public_path('avatars/' . basename($user->image)));
        }

        $user->delete();

        return redirect()->route('user.index')->with('success', 'User Berhasil dihapus');
    }

    public function show(int $id): Response
    {
        $pengguna = User::find($id);

        return Inertia::render('super-admin/user/detail', compact('pengguna'));
    }

    public function edit(int $id): Response
    {
        $pengguna = User::find($id);

        return Inertia::render('super-admin/user/edit', compact('pengguna'));
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $id],
            'role' => ['required', 'string', 'in:super admin,admin tpu'],
            'phone' => ['required', 'string', 'max:255'],
            'nama_kabupaten' => ['required', 'string', 'max:255'],
            'nama_kecamatan' => ['required', 'string', 'max:255'],
            'nama_gampong' => ['required', 'string', 'max:255'],
            'id_kabupaten' => ['required', 'string', 'max:255'],
            'id_kecamatan' => ['required', 'string', 'max:255'],
            'id_gampong' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ]);

        $user = User::find($id);

        if ($request->hasFile('image')) {
            if ($user->image) {
                File::delete(public_path('avatars/' . basename($user->image)));
            }
            $image = $request->file('image');
            $new_name = time() . '.' . rand() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('avatars'), $new_name);
            $user->image = $new_name;
        }

        if ($request->password) {
            $request->validate([
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ]);
            $user->password = bcrypt($request->password);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->phone = $request->phone;
        $user->id_kabupaten = $request->id_kabupaten;
        $user->id_kecamatan = $request->id_kecamatan;
        $user->id_gampong = $request->id_gampong;
        $user->nama_kabupaten = $request->nama_kabupaten;
        $user->nama_kecamatan = $request->nama_kecamatan;
        $user->nama_gampong = $request->nama_gampong;
        $user->save();

        return redirect()->route('user.index')->with('success', 'User Berhasil diperbarui');
    }
}
