<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PanduanWebgis extends Model
{
    use HasFactory;

    protected $table = 'tb_panduan_webgis';
    protected $keyType = 'integer';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        "isi"
    ];
}
