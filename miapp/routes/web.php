<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsersDataController;
use App\Http\Controllers\ContactosController;

Route::get('/', function () {return Inertia::render('Login');})->name('login');
Route::get('/contacto', function () {return Inertia::render('ContactoPage');})->name('ContactoPage');
Route::get('/users-data', [UsersDataController::class, 'json'])->name('users.data');
Route::get('/contactos', [ContactosController::class, 'index']);
 
Route::get('/notfound', function () {
    abort(404); // muestra resources/views/errors/404.blade.php
});

// Procesar login (POST)

Route::post('/login', [UsersDataController::class, 'validateUser']);
Route::post('/Getcontactos', [ContactosController::class, 'Getcontactos']);
Route::post('/Deletecontactos', [ContactosController::class, 'Deletecontactos']);
Route::put('/Updatecontactos', [ContactosController::class, 'Updatecontactos']);
Route::post('/Agregarcontactos', [ContactosController::class, 'Agregarcontactos']);



 