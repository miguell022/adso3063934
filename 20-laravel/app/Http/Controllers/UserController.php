<?php

namespace App\Http\Controllers;

use App\Models\User; // Importamos el modelo
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Obtener todos los usuarios de la base de datos
        $users = User::orderBy('id', 'desc')->paginate(20);
        // dd($users->toArray());
        return view('users.index')->with('users', $users);

        // Enviar los usuarios a la vista 'users.index'
        return view('users.index', compact('users'));
    }
}
