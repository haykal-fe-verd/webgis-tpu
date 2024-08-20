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
        ]);
        User::factory()->create([
            'name' => 'Admin TPU',
            'email' => 'admintpu@test.com',
            'role' => 'admin tpu',
            'id_kabupaten' => 1171,
            'nama_kabupaten' => 'KOTA BANDA ACEH',
            'id_kecamatan' => 1171010,
            'nama_kecamatan' => 'KECAMATAN MEURAXA',
        ]);

        User::factory(30)->create();
    }
}
