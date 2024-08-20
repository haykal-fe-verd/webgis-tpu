<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PemakamanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/daftar-tpu', [HomeController::class, 'daftarTpu'])->name('daftar-tpu');
Route::get('/daftar-tpu/{id}', [HomeController::class, 'daftarTpuDetail'])->name('daftar-tpu-detail');
Route::get('/booking/{id}', [HomeController::class, 'bookingTpu'])->name('booking-tpu');
Route::post('/booking', [BookingController::class, 'store'])->name('booking-tpu.store');
Route::get('/peta', [HomeController::class, 'peta'])->name('peta');
Route::get('/tutorial', [HomeController::class, 'tutorial'])->name('tutorial');



Route::middleware('auth')->group(function () {
    // dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // update password
    Route::get('password', [ProfileController::class, 'update_password_index'])->name('password.index');
    Route::put('password', [ProfileController::class, 'update_password_update'])->name('password.update');

    //! supaer admin
    // user
    Route::get('/user', [UserController::class, 'index'])->name('user.index');

    // tpu
    Route::get('/tpu', [PemakamanController::class, 'super_admin_tpu_index'])->name('tpu.index');

    // verifikasi tpu
    Route::get('/verifikasi', [PemakamanController::class, 'super_admin_verifikasi_tpu_index'])->name('verifikasi.index');


    //! admin tpu
    // pemesanan tpu
    Route::get('pemesanan-tpu', [BookingController::class, 'index'])->name('booking.index');

    // kelola tpu
    Route::get('kelola-tpu', [PemakamanController::class, 'admin_tpu_kelola_tpu'])->name('kelola-tpu.index');
    Route::get('kelola-tpu/create', [PemakamanController::class, 'admin_tpu_kelola_tpu_create'])->name('kelola-tpu.create');
    Route::post('kelola-tpu', [PemakamanController::class, 'admin_tpu_kelola_tpu_store'])->name('kelola-tpu.store');
});

require __DIR__ . '/auth.php';
