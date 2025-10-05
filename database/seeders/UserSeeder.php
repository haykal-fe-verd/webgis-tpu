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
        // super admin
        User::factory()->create([
            'name' => 'Dinas X',
            'email' => 'dinasx@test.com',
            'role' => 'super admin',
        ]);

        // admin p3f syahrul
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

        // keuchik
        User::factory()->create([
            'name' => 'Iskandar',
            'email' => 'keuchik@test.com',
            'role' => 'admin tpu',
            'id_kabupaten' => '1171',
            'nama_kabupaten' => 'KOTA BANDA ACEH',
            'id_kecamatan' => '1171030',
            'nama_kecamatan' => 'KUTA ALAM',
            'id_gampong' => '1171030007',
            'nama_gampong' => 'BANDAR BARU',
            'phone' => '082304527364',
            'is_keuchik' => true
        ]);

        // User::factory(5)->create();
    }
}
