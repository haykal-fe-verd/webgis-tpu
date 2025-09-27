<?php

namespace Database\Seeders;

use App\Models\PanduanWebgis;
use Illuminate\Database\Seeder;

class PanduanWebgisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $html = <<<'HTML'
<section class="space-y-6">
  <h2 class="text-xl font-semibold">Apa itu WebGIS TPU?</h2>
  <p>WebGIS TPU adalah aplikasi pemetaan interaktif untuk mengelola data Tempat Pemakaman Umum (TPU) di <strong>Kota Banda Aceh</strong> dan <strong>Kabupaten Aceh Besar</strong>. Aplikasi mendukung pengelolaan lokasi TPU, blok/petak, dan data pemakaman.</p>

  <h2 class="text-xl font-semibold">Peran & Hak Akses</h2>
  <ul class="list-disc pl-6">
    <li><strong>Super Admin</strong>: kelola master wilayah, manajemen pengguna, persetujuan data.</li>
    <li><strong>Admin TPU</strong>: kelola data TPU & makam di gampong yang ditugaskan.</li>
  </ul>

  <h2 class="text-xl font-semibold">Navigasi Dasar Peta</h2>
  <ol class="list-decimal pl-6 space-y-2">
    <li>Gunakan tombol <em>+</em>/<em>-</em> untuk zoom atau scroll mouse.</li>
    <li>Klik fitur (TPU/Blok/Makam) untuk melihat detail di panel kanan.</li>
    <li>Gunakan kotak <strong>Cari</strong> untuk mencari nama TPU/gampong.</li>
  </ol>

  <h2 class="text-xl font-semibold">Menambah TPU Baru</h2>
  <ol class="list-decimal pl-6 space-y-2">
    <li>Buka menu <strong>Data &rarr; TPU</strong> lalu klik <strong>Tambah</strong>.</li>
    <li>Isi data umum: Nama TPU, alamat, kabupaten, kecamatan, gampong, kapasitas.</li>
    <li>Pada peta, klik <strong>Gambar Poligon</strong> lalu tentukan batas TPU (klik berurutan & akhiri dengan klik titik awal).</li>
    <li>Simpan. Super Admin dapat melakukan <em>review</em> & <em>approve</em> jika diperlukan.</li>
  </ol>

  <h2 class="text-xl font-semibold">Mengelola Makam</h2>
  <ol class="list-decimal pl-6 space-y-2">
    <li>Buka detail TPU &rarr; tab <strong>Makam</strong> &rarr; <strong>Tambah</strong>.</li>
    <li>Pilih mode geometri: <em>Titik</em> (koordinat) atau <em>Poligon</em> (petak berukuran).</li>
    <li>Isi data: kode petak, status (<em>available/reserved/occupied/blocked</em>), catatan.</li>
    <li>Untuk pemakaman, pilih makam &rarr; <strong>Input Pemakaman</strong>, isi nama almarhum, tanggal wafat & pemakaman.</li>
  </ol>

  <h2 class="text-xl font-semibold">Edit Geometri (Gambar/Ubah/Hapus)</h2>
  <ul class="list-disc pl-6">
    <li><strong>Gambar</strong>: pilih alat <em>Marker/Polygon</em> pada toolbar lalu klik di peta.</li>
    <li><strong>Edit</strong>: pilih fitur &rarr; <em>Edit Mode</em> &rarr; seret vertex, lalu simpan.</li>
    <li><strong>Hapus</strong>: pilih fitur &rarr; <em>Delete</em>.</li>
  </ul>

  <h2 class="text-xl font-semibold">Pencarian & Filter</h2>
  <ul class="list-disc pl-6">
    <li>Cari berdasarkan nama TPU/gampong/kecamatan.</li>
    <li>Filter status makam: <em>available</em>, <em>reserved</em>, <em>occupied</em>.</li>
    <li>Gunakan <em>Draw Area</em> (gambar poligon bebas) untuk memfilter data <em>di dalam area</em> yang kamu gambar.</li>
  </ul>

  <h2 class="text-xl font-semibold">Impor/Ekspor</h2>
  <ul class="list-disc pl-6">
    <li><strong>Impor</strong> GeoJSON/CSV untuk mempercepat input data massal.</li>
    <li><strong>Ekspor</strong> CSV/GeoJSON untuk pelaporan atau analisis lanjutan.</li>
  </ul>

  <h2 class="text-xl font-semibold">Validasi & Persetujuan</h2>
  <p>Perubahan geometri atau data kunci (misal: batas TPU) dapat memerlukan persetujuan Super Admin. Status ditandai sebagai <em>Menunggu</em> / <em>Disetujui</em> / <em>Ditolak</em>.</p>

  <h2 class="text-xl font-semibold">FAQ</h2>
  <details class="border rounded-md p-3">
    <summary class="font-medium">Koordinat saya meleset/terlihat di luar wilayah?</summary>
    <p class="mt-2">Periksa penulisan <em>latitude/longitude</em> (format desimal) dan pastikan berada dalam batas Banda Aceh atau Aceh Besar.</p>
  </details>
  <details class="border rounded-md p-3">
    <summary class="font-medium">Kenapa saya tidak bisa mengedit TPU tertentu?</summary>
    <p class="mt-2">Hak akses <strong>Admin TPU</strong> hanya untuk gampong yang ditugaskan. Hubungi Super Admin bila perlu perluasan akses.</p>
  </details>

  <h2 class="text-xl font-semibold">Kontak & Bantuan</h2>
  <p>Jika mengalami kendala, hubungi tim administrasi melalui menu <strong>Bantuan</strong> atau email dukungan yang tertera di footer aplikasi.</p>
</section>
HTML;

        // Update record pertama jika ada; jika tidak ada, create baru
        $row = PanduanWebgis::query()->first();
        if ($row) {
            $row->update(['isi' => $html]);
        } else {
            PanduanWebgis::create(['isi' => $html]);
        }
    }
}
