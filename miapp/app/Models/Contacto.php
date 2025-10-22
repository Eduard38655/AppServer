<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    // Nombre explícito de la tabla
    protected $table = 'contactos';

    // Timestamps activados (created_at, updated_at)
    public $timestamps = false;

    // Campos que se pueden asignar en masa
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

    // Relación opcional con la tabla usersData
    public function user()
    {
        return $this->belongsTo(UsersData::class, 'userid');
    }
}
