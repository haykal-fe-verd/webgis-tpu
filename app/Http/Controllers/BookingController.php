<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

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
                    ->orWhere('nik', 'LIKE', "%$search%")
                    ->orWhere('sebagai', 'LIKE', "%$search%")
                    ->orWhereHas('pemakaman', function ($query) use ($search) {
                        $query->where('nama_pemakaman', 'LIKE', "%$search%");
                    });
            });
        }

        $query->whereHas('pemakaman', function ($query) use ($request) {
            $query->where('id_user', $request->user()->id);
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
            'sebagai' => ['required', Rule::in(['warga', 'non warga'])],
            'nik' => ['required', 'max:16'],
        ]);

        Booking::create($request->all());

        return redirect()->route('booking-tpu', $request->id_pemakaman)->with('success', 'Pendaftaran telah berhasil, mohon tunggu konfirmasi selanjutnya melalui WhatsApp!');
    }

    public function update_status(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['Belum Diproses', 'Sedang Diproses', 'Selesai'])],
        ]);

        $booking = Booking::findOrFail($id);
        // Optional: $this->authorize('update', $booking);

        $booking->update(['status' => $validated['status']]);


        return redirect()->route('booking.index')->with('success', 'Status telah berhasil diubah!');
    }
}
