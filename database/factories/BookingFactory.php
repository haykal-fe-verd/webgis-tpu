<?php

namespace Database\Factories;

use App\Models\Pemakaman;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'hp' => fake()->phoneNumber(),
            'status' => fake()->randomElement(['Belum Diproses', 'Sedang Diproses', 'Selesai']),
            'id_pemakaman' => fn() =>
            Pemakaman::query()->inRandomOrder()->value('id')
        ];
    }
}
