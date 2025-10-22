<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    protected $table = 'contactos';

    public $timestamps = false;

    protected $fillable = [
        'userid',
        'nombre',
        'email',
        'telefono',
        'dia',
        'mes',
        'ano',
        'provincia',
        'ciudad',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(UsersData::class, 'userid');
    }
}
