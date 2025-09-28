<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Booking::query()->with('pemakaman')->latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('name', 'LIKE', "%$search%")
                    ->orWhere('email', 'LIKE', "%$search%")
                    ->orWhere('hp', 'LIKE', "%$search%")
                    ->orWhereHas('pemakaman', function ($query) use ($search) {
                        $query->where('nama_pemakaman', 'LIKE', "%$search%");
                    });
            });
        }

        $query->whereHas('pemakaman', function ($query) use ($request) {
            $query->where('id_kabupaten', $request->user()->id_kabupaten)
                ->where('id_kecamatan', $request->user()->id_kecamatan);
        });

        $pemesanan = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('admin-tpu/booking/index', compact('pemesanan'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'hp' => ['required', 'string', 'max:255'],
            'id_pemakaman' => ['required', 'integer'],
        ]);

        Booking::create($request->all());

        return redirect()->route('booking-tpu', $request->id_pemakaman)->with('success', 'Pendaftaran telah berhasil, mohon tunggu konfirmasi selanjutnya melalui WhatsApp!');
    }
}
