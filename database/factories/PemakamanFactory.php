<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pemakaman>
 */
class PemakamanFactory extends Factory
{
    public function definition(): array
    {
        $userId = User::inRandomOrder()->value('id') ?? User::factory()->create()->id;

        // Pilih kabupaten: 1108 = Aceh Besar, 1171 = Banda Aceh
        $idKabupaten = (string) fake()->randomElement(['1108', '1171']);
        $namaKabupaten = $idKabupaten === '1108' ? 'KABUPATEN ACEH BESAR' : 'KOTA BANDA ACEH';

        // Bounding box per kabupaten (± realistis)
        // Banda Aceh (kota): lat 5.50–5.61, lon 95.27–95.39
        // Aceh Besar (kab): lat 5.20–5.65, lon 95.15–95.75
        $bbox = $idKabupaten === '1108'
            ? ['latMin' => 5.20, 'latMax' => 5.65, 'lngMin' => 95.15, 'lngMax' => 95.75]   // Aceh Besar
            : ['latMin' => 5.50, 'latMax' => 5.61, 'lngMin' => 95.27, 'lngMax' => 95.39];  // Banda Aceh

        $latitude  = fake()->randomFloat(6, $bbox['latMin'], $bbox['latMax']);
        $longitude = fake()->randomFloat(6, $bbox['lngMin'], $bbox['lngMax']);

        // Kode contoh supaya "mirip" struktur sebenarnya
        if ($idKabupaten === '1108') {
            $idKecamatan = (string) fake()->numberBetween(1108010, 1108290);
            $idGampong   = (string) fake()->numberBetween(1108010001, 1108299999);
        } else {
            $idKecamatan = (string) fake()->numberBetween(1171010, 1171041);
            $idGampong   = (string) fake()->numberBetween(1171010001, 1171041999);
        }

        // Konsistensi kapasitas–terpakai
        $kapasitas = fake()->numberBetween(200, 1000);

        return [
            'nama_pemakaman'  => fake()->company(),
            'id_user'         => $userId,

            'id_kabupaten'    => $idKabupaten,
            'nama_kabupaten'  => $namaKabupaten,

            'id_kecamatan'    => $idKecamatan,
            'nama_kecamatan'  => 'KECAMATAN TEST',

            'id_gampong'      => $idGampong,
            'nama_gampong'    => 'GAMPONG TEST ' . $namaKabupaten,

            'luas'            => fake()->numberBetween(100, 1000),
            'kapasitas'       => $kapasitas,

            'alamat'          => fake()->address(),
            'image'           => "1759066812.653345067.jpeg",

            // Simpan sebagai string karena kolom kamu string; kalau nanti ubah ke DECIMAL(9,6), tinggal hapus (string) cast.
            'latitude'        => (string) $latitude,
            'longitude'       => (string) $longitude,

            'is_approved'     => fake()->boolean(),
        ];
    }

    /** Paksa Banda Aceh (1171) */
    public function bandaAceh(): static
    {
        return $this->state(function () {
            $lat = fake()->randomFloat(6, 5.50, 5.61);
            $lng = fake()->randomFloat(6, 95.27, 95.39);
            return [
                'id_kabupaten'   => '1171',
                'nama_kabupaten' => 'KOTA BANDA ACEH',
                'latitude'       => (string) $lat,
                'longitude'      => (string) $lng,
            ];
        });
    }

    /** Paksa Aceh Besar (1108) */
    public function acehBesar(): static
    {
        return $this->state(function () {
            $lat = fake()->randomFloat(6, 5.20, 5.65);
            $lng = fake()->randomFloat(6, 95.15, 95.75);
            return [
                'id_kabupaten'   => '1108',
                'nama_kabupaten' => 'KABUPATEN ACEH BESAR',
                'latitude'       => (string) $lat,
                'longitude'      => (string) $lng,
            ];
        });
    }
}
