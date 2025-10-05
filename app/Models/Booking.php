<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'tb_booking';
    protected $keyType = 'integer';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'name',
        'email',
        'hp',
        'status',
        'id_pemakaman',
        'sebagai',
        'nik'
    ];

    // relations
    public function pemakaman(): BelongsTo
    {
        return $this->belongsTo(Pemakaman::class, 'id_pemakaman', 'id');
    }
}
