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

    public function create()
    {
        return view('users.create');
    }

    public function show (User $user)
    {
        return view('users.show')->with('user', $user);
    }

    public function store(Request $request)
    {
        $request->validate([
            'document'  => ['required', 'numeric', 'unique:users,document'],
            'fullname'  => ['required', 'string'],
            'gender'    => ['required'],
            'birthdate' => ['required', 'date'],
            'photo'     => ['required', 'image'],
            'phone'     => ['required', 'string'],
            'email'     => ['required', 'string', 'email', 'unique:users,email'],
            'password'  => ['required', 'confirmed'],
        ]);

        // Procesar foto
        $photo = null;
        if ($request->hasFile('photo')) {
            $photo = time() . '.' . $request->photo->extension();
            $request->photo->move(public_path('images'), $photo);
        }

        // Crear y guardar usuario
        $user = new User();
        $user->document  = $request->document;
        $user->fullname  = $request->fullname;
        $user->gender    = $request->gender;
        $user->birthdate = $request->birthdate;
        $user->photo     = $photo;
        $user->phone     = $request->phone;
        $user->email     = $request->email;
        $user->password  = bcrypt($request->password);
        $user->save();

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }
}
