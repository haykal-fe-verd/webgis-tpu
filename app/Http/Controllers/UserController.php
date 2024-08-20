<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
}
