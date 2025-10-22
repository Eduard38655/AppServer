<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class UsersData extends Authenticatable
{
    use Notifiable;

    protected $table = 'usersdata'; // Ajusta si tu tabla se llama 'users'

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
