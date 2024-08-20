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
        Pemakaman::factory(100)->create();
    }
}
