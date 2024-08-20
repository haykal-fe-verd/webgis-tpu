<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

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
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => fake()->randomElement(['super admin', 'admin tpu']),
            'phone' => fake()->phoneNumber(),
            'image' => fake()->imageUrl(),
            "id_kabupaten" => $idKabupaten,
            "nama_kabupaten" => $namaKabupaten,
            "id_kecamatan" => fake()->numberBetween(1108010, 1171041),
            "nama_kecamatan" => "KECAMATAN TEST",
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
