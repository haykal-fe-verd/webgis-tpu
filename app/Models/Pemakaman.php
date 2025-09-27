<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pemakaman extends Model
{
    use HasFactory;

    protected $table = 'tb_pemakaman';
    protected $keyType = 'integer';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        "id_user",
        "nama_pemakaman",
        "id_kabupaten",
        "nama_kabupaten",
        "id_kecamatan",
        "nama_kecamatan",
        "id_gampong",
        "nama_gampong",
        "luas",
        "kapasitas",
        "alamat",
        "image",
        "latitude",
        "longitude",
        "is_approved"
    ];


    // relations
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
