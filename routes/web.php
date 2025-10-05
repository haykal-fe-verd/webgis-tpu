<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PanduanWebgisController;
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
Route::get('/daftar', [HomeController::class, 'daftar'])->name('daftar');



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
    Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
    Route::post('/user', [UserController::class, 'store'])->name('user.store');
    Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('user.destroy');
    Route::get('/user/{id}', [UserController::class, 'show'])->name('user.show');
    Route::get('/user/{id}/edit', [UserController::class, 'edit'])->name('user.edit');
    Route::post('/user/{id}', [UserController::class, 'update'])->name('user.update');

    // tpu
    Route::get('/tpu', [PemakamanController::class, 'super_admin_tpu_index'])->name('tpu.index');
    Route::get('/tpu/create', [PemakamanController::class, 'super_admin_tpu_create'])->name('tpu.create');
    Route::post('/tpu', [PemakamanController::class, 'super_admin_tpu_store'])->name('tpu.store');
    Route::get('/tpu/{id}', [PemakamanController::class, 'super_admin_tpu_detail'])->name('tpu.detail');
    Route::get('/tpu/{id}/edit', [PemakamanController::class, 'super_admin_tpu_edit'])->name('tpu.edit');
    Route::post('/tpu/{id}', [PemakamanController::class, 'super_admin_tpu_update'])->name('tpu.update');
    Route::delete('/tpu/{id}', [PemakamanController::class, 'super_admin_tpu_destroy'])->name('tpu.destroy');


    // verifikasi tpu
    Route::get('/verifikasi', [PemakamanController::class, 'super_admin_verifikasi_tpu_index'])->name('verifikasi.index');
    Route::get('/verifikasi/{id}', [PemakamanController::class, 'super_admin_verifikasi_tpu_detail'])->name('verifikasi.detail');
    Route::post('/verifikasi/{id}', [PemakamanController::class, 'super_admin_verifikasi_tpu_post'])->name('verifikasi.post');
    Route::post('/verifikasi/{id}/reject', [PemakamanController::class, 'super_admin_verifikasi_tpu_reject'])->name('verifikasi.reject');
    Route::delete('/verifikasi/{id}', [PemakamanController::class, 'super_admin_verifikasi_tpu_destroy'])->name('verifikasi.destroy');

    // panduan webgis
    // Route::get('/panduan-webgis', [PanduanWebgisController::class, 'index'])->name('panduan-webgis.index');
    // Route::post('/panduan-webgis', [PanduanWebgisController::class, 'store'])->name('panduan-webgis.store');



    //! admin tpu
    // pemesanan tpu
    Route::get('pemesanan-tpu', [BookingController::class, 'index'])->name('booking.index');
    Route::put('pemesanan-tpu/{id}', [BookingController::class, 'update_status'])->name('booking.update');

    // kelola tpu
    Route::get('kelola-tpu', [PemakamanController::class, 'admin_tpu_kelola_tpu'])->name('kelola-tpu.index');
    Route::get('kelola-tpu/create', [PemakamanController::class, 'admin_tpu_kelola_tpu_create'])->name('kelola-tpu.create');
    Route::post('kelola-tpu', [PemakamanController::class, 'admin_tpu_kelola_tpu_store'])->name('kelola-tpu.store');
    Route::get('kelola-tpu/{id}', [PemakamanController::class, 'admin_tpu_kelola_tpu_detail'])->name('kelola-tpu.detail');
    Route::get('kelola-tpu/{id}/edit', [PemakamanController::class, 'admin_tpu_kelola_tpu_edit'])->name('kelola-tpu.edit');
    Route::post('kelola-tpu/{id}', [PemakamanController::class, 'admin_tpu_kelola_tpu_update'])->name('kelola-tpu.update');
    Route::delete('kelola-tpu/{id}', [PemakamanController::class, 'admin_tpu_kelola_tpu_destroy'])->name('kelola-tpu.destroy');
});

require __DIR__ . '/auth.php';
