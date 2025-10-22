<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
class ContactosController extends Controller
{
    // Obtener todos los contactos en JSON
    public function index()
    {
        // Selecciona todos los campos de la tabla contactos
        $contactos = Contacto::all();

        // Retorna los datos como JSON
        return response()->json($contactos);
    }



   
public function getContactos(Request $request)
{
    $userId = Auth::id(); // siempre el ID del usuario que está logueado
    if (! $userId) {
        return response()->json([
            'status' => 'error',
            'message' => 'No autenticado'
        ], 401);
    }

    $contactos = Contacto::where('userid', $userId)
        ->get(['id','nombre','email','telefono','provincia','ciudad','status','dia','mes','ano']); // selecciona solo columnas necesarias

    return response()->json([
        'status' => 'success',
        'data' => $contactos
    ], 200);
}

    public function Deletecontactos(Request $request){
        $userId = $request->input('id');

        // Obtener contactos filtrados por user_id
        $contactos = Contacto::where('id', $userId)->delete();

        return response()->json($contactos);
    }
/*ContactoID,NewNombre,NewEmail,NewPhone,NewProvincia,NewCiudad */
  public function Updatecontactos(Request $request)
{
    // Validar datos
    $validated = $request->validate([
        'id'   => 'required|integer| ',
        'NewNombre'    => 'sometimes|required|string|max:255',
        'NewEmail'     => 'sometimes|nullable|email|max:255',
        'NewPhone'     => 'sometimes|nullable|string|max:9',
        'NewProvincia' => 'sometimes|nullable|string|max:100',
        'NewCiudad'    => 'sometimes|nullable|string|max:100',
    ]);

    // Buscar contacto
    $contacto = Contacto::find($validated['id']);

    if (!$contacto) {
        return response()->json(['error' => 'Contacto no encontrado'], 404);
    }

    // Preparar array con solo los campos presentes en request
    $dataToUpdate = [];
    if (isset($validated['NewNombre']))    $dataToUpdate['nombre']    = $validated['NewNombre'];
    if (isset($validated['NewEmail']))     $dataToUpdate['email']     = $validated['NewEmail'];
    if (isset($validated['NewPhone']))     $dataToUpdate['telefono']  = $validated['NewPhone'];
    if (isset($validated['NewProvincia'])) $dataToUpdate['provincia'] = $validated['NewProvincia'];
    if (isset($validated['NewCiudad']))    $dataToUpdate['ciudad']    = $validated['NewCiudad'];

    // Actualizar
    $contacto->update($dataToUpdate);

    // Devolver contacto actualizado
    return response()->json([
        'message' => 'Contacto actualizado correctamente',
        'contact' => $contacto
    ], 200);
}
 

public function Agregarcontactos(Request $request)
    {
        // Validación (dia/mes/ano opcionales pero si se envía uno, se requieren los otros)
        $validated = $request->validate([
            'NewNombre'    => 'required|string|max:255',
            'NewEmail'     => 'required|email|max:255|unique:contactos,email',
            'NewPhone'     => 'required|string|max:9',
            'NewProvincia' => 'nullable|string|max:100',
            'NewCiudad'    => 'nullable|string|max:100',
            'dia'          => 'nullable|integer|min:1|max:31|required_with:mes,ano',
            'mes'        => 'nullable|integer|min:1|max:12|required_with:dia,ano',
            'ano'          => 'nullable|integer|min:1900|max:' . date('Y') . '|required_with:dia,mes',
        ]);

        try {
            $contacto = Contacto::create([
                'userid'    => Auth::id() ?? 1, // usa Auth si hay sesión, sino 1
                'nombre'    => $validated['NewNombre'],
                'email'     => $validated['NewEmail'],
                'telefono'  => $validated['NewPhone'],
                'provincia' => $validated['NewProvincia'] ?? null,
                'ciudad'    => $validated['NewCiudad'] ?? null,
                'dia'       => $validated['dia'] ?? null,
                'mes'     => $validated['mes'] ?? null,
                'ano'       => $validated['ano'] ?? null,
                'status'    => 'activo',
            ]);

            return response()->json([
                'message' => 'Contacto creado correctamente',
                'contact' => $contacto
            ], 201);

        } catch (QueryException $e) {
            // Por ejemplo: unique constraint race condition u otro error de BD
            return response()->json([
                'message' => 'Error al guardar el contacto.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
   
      
     };



 