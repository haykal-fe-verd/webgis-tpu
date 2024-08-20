<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pemakaman>
 */
class PemakamanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $idKabupaten = fake()->randomElement([1108, 1171]);
        $namaKabupaten = "";

        if ($idKabupaten === 1108) {
            $namaKabupaten = "KABUPATEN ACEH BESAR";
        } else {
            $namaKabupaten = "KOTA BANDA ACEH";
        }

        return [
            "nama_pemakaman" => fake()->company(),
            "id_user" => fake()->numberBetween(1, 10),
            "id_kabupaten" => $idKabupaten,
            "nama_kabupaten" => $namaKabupaten,
            "id_kecamatan" => fake()->numberBetween(1108010, 1171041),
            "nama_kecamatan" => "KECAMATAN TEST",
            "luas" => fake()->numberBetween(100, 1000),
            "kapasitas" => fake()->numberBetween(100, 1000),
            "terpakai" => fake()->numberBetween(200, 500),
            "alamat" => fake()->address(),
            "image" => fake()->imageUrl(),
            "latitude" => fake()->latitude(),
            "longitude" => fake()->longitude(),
            "is_approved" => fake()->numberBetween(0, 1),
        ];
    }
}
