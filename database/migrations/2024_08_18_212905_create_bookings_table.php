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
        Schema::create('tb_booking', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_pemakaman');
            $table->string('name');
            $table->string('nik');
            $table->string('email');
            $table->string('hp');
            $table->enum('status', ['Belum Diproses', 'Sedang Diproses', 'Selesai'])->default('Belum Diproses');
            $table->enum('sebagai', ['warga', 'non warga'])->default('warga');

            $table->foreign('id_pemakaman')->references('id')->on('tb_pemakaman')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_booking');
    }
};
