<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_pemakaman', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');

            $table->string('nama_pemakaman');
            $table->string('id_kabupaten');
            $table->string('nama_kabupaten');
            $table->string('id_kecamatan');
            $table->string('nama_kecamatan');
            $table->string('id_gampong');
            $table->string('nama_gampong');
            $table->integer('luas');
            $table->integer('kapasitas');
            $table->integer('terpakai')->default(0);
            $table->text('alamat');
            $table->string('image')->nullable();
            $table->string('latitude');
            $table->string('longitude');
            $table->enum('is_approved', ['disetujui', 'belum disetujui', 'ditolak'])->default("belum disetujui");
            $table->text('note')->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();

            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pemakaman');
    }
};
