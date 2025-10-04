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
            'email' => 'superadmin@test.com',
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
            'id_kabupaten' => '1171',
            'nama_kabupaten' => 'KOTA BANDA ACEH',
            'id_kecamatan' => '1171030',
            'nama_kecamatan' => 'KUTA ALAM',
            'id_gampong' => '1171030007',
            'nama_gampong' => 'BANDAR BARU',
            'phone' => '085276496515',
        ]);

        // User::factory(5)->create();
    }
}
