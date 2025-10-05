<?php

namespace Database\Seeders;

use App\Models\Pemakaman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PemakamanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pemakaman::factory()->create([
            'id_user'         => 2,
            'nama_pemakaman'  => "TPU Gampong Bandar Baru Lampriet ( TPU LOKASI BARU )",
            'id_kabupaten'    => '1108',
            'nama_kabupaten'  => 'KABUPATEN ACEH BESAR',
            'id_kecamatan'    => '1108050',
            'nama_kecamatan'  => 'MESJID RAYA',
            'id_gampong'      => '1108050003',
            'nama_gampong'    => 'NEUHEUN',
            'alamat'          => "Jl. Laksamana Malahayati, Neuheun, Kec. Mesjid Raya, Kabupaten Aceh Besar, Aceh",
            'luas'            => 12000,
            'kapasitas'       => 2800,
            'terpakai'        => 500,
            'latitude'        => "5.572933201512188",
            'longitude'       => "95.51633834838869",
            'is_approved'     => 'disetujui',
            'keterangan'      => 'Tanah Wakaf'
        ]);

        // Pemakaman::factory(20)->create();
    }
}
