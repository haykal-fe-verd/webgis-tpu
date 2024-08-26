<?php

namespace App\Http\Controllers;

use App\Models\PanduanWebgis;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;


class PanduanWebgisController extends Controller
{
    public function index(): Response
    {
        $isi = PanduanWebgis::first();
        return Inertia::render('super-admin/panduan-webgis/index', compact('isi'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'isi' => 'required',
        ]);

        $isi = PanduanWebgis::first();
        if (!$isi) {
            $isi = new PanduanWebgis();
        }
        $isi->isi = $request->isi;
        $isi->save();

        return redirect()->route('panduan-webgis.index')->with('success', 'Panduan WebGIS Berhasil Diperbarui');
    }

    public function upload(Request $request)
    {
        dd($request->all());
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $image = $request->file('file');
        $imageName = time() . '.' . $image->extension();
        $path = $image->storeAs('sun-editor', $imageName, 'public');

        $url = Storage::url($path);

        return response()->json([
            'url' => $url
        ]);
    }
}
