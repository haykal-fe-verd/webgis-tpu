<?php

namespace App\Http\Controllers;

use App\Models\Pemakaman;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $role = $request->user()->role;

        // super admin
        $totalAdminTpu = User::where('role', 'admin tpu')->count();
        $totalTpuAcehBesar = Pemakaman::where('id_kabupaten', "1108")->count();
        $totalTpuBandaAceh = Pemakaman::where('id_kabupaten', "1171")->count();
        $tpuAdmin = Pemakaman::with('user')->get();


        // admin tpu
        $totalTpu = Pemakaman::where('id_user', $request->user()->id)->count();
        $totalKapasitas = Pemakaman::where('id_user', $request->user()->id)->sum('kapasitas');
        $totalTerpakai = Pemakaman::where('id_user', $request->user()->id)->sum('terpakai');
        $sisaPemakaman = $totalKapasitas - $totalTerpakai;
        $tpu = Pemakaman::where('id_user', $request->user()->id)->get();


        if ($role == 'super admin') {
            return Inertia::render('dashboard/super-admin', compact('totalAdminTpu', 'totalTpuAcehBesar', 'totalTpuBandaAceh', 'tpuAdmin'));
        } else {
            return Inertia::render('dashboard/admin-tpu', compact('totalTpu', 'totalKapasitas', 'sisaPemakaman', 'tpu'));
        }
    }
}
