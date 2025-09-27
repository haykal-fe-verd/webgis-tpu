<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'admin@admin.com',
            'role' => 'super admin',
            'id_kabupaten' => '1171',
            'nama_kabupaten' => 'KOTA BANDA ACEH',
            'id_kecamatan' => '1171010',
            'nama_kecamatan' => 'MEURAXA',
            'id_gampong' => '1171010019',
            'nama_gampong' => 'SURIEN',
        ]);

        User::factory()->create([
            'name' => 'Admin TPU',
            'email' => 'admintpu@test.com',
            'role' => 'admin tpu',
            'id_kabupaten' => '1171',
            'nama_kabupaten' => 'KOTA BANDA ACEH',
            'id_kecamatan' => '1171010',
            'nama_kecamatan' => 'MEURAXA',
            'id_gampong' => '1171010019',
            'nama_gampong' => 'SURIEN',
        ]);

        User::factory()->create([
            'name' => 'Syahrul',
            'email' => 'syahrul@test.com',
            'role' => 'admin tpu',
            'id_kabupaten' => '1108',
            'nama_kabupaten' => 'KABUPATEN ACEH BESAR',
            'id_kecamatan' => '1108050',
            'nama_kecamatan' => 'MESJID RAYA',
            'id_gampong' => '1108050003',
            'nama_gampong' => 'NEUHEUN',
            'phone' => '085276496515',
        ]);

        User::factory(30)->create();
    }
}
