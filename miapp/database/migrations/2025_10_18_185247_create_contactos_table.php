<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 public function up(): void
    {
        Schema::create('contactos', function (Blueprint $table) {
            $table->id();
            // FK moderna — ajusta el nombre de la tabla de usuarios si corresponde
            $table->foreignId('userid')->constrained('usersdata')->cascadeOnDelete();
            $table->string('nombre', 100);
            $table->string('email', 150)->unique();
            $table->string('telefono', 50)->nullable();

            // Campos de fecha separados
            $table->tinyInteger('dia')->nullable()->after('telefono');
            $table->tinyInteger('mes')->nullable()->after('dia');
            $table->smallInteger('ano')->nullable()->after('mes');

            $table->string('provincia', 100)->nullable();
            $table->string('ciudad', 100)->nullable();
            $table->string('status', 50)->default('activo');
            
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contactos');
    }
};
