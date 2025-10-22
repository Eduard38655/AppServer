<?php

namespace App\Http\Controllers;

use App\Models\UsersData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class UsersDataController extends Controller
{
    // Obtener todos los usuarios en JSON (sin password)
    public function json()
    {
        $users = UsersData::select('id', 'name', 'email')->get();
        return response()->json(['status' => 'success', 'data' => $users], 200);
    }

    // Validar usuario y crear sesión (POST /login)
    public function validateUser(Request $request)
{
    // Validar campos
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string|min:6',
    ]);

    // Intentar login con Laravel
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json([
            'status' => 'error',
            'message' => 'Credenciales incorrectas'
        ], 401);
    }

    // Login exitoso
    $request->session()->regenerate();
    $user = Auth::user();

    return response()->json([
        'status' => 'success',
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]
    ]);
}

    // Generar token (usa Sanctum o similar) - opcional
    public function getToken()
    {
        $user = UsersData::first();
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'No hay usuarios'], 404);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }
}
