<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return "This is a route: 🤩";
    return view('welcome');
});

Route::get('hello/{name}', function(){
    return "<h1>Hello folks, Have a nice day 😋</h1>";
});

Route::get('show/pets', function(){
    $pets = App\Models\Pet::all();
    dd($pets->toArray()); //Dump & Die
});

Route::get('show/pet/{id}', function(){
    $pet = App\Models\Pet::find(request()->id);
    dd($pet->toArray()); //Dump & Die
});

Route::get('challenge2', function(){
    $users = App\Models\User::take(20)->get();
    // 🎨 Estilos de la tabla
    $html = '
    <style>
        body {
            font-family: "Segoe UI", Roboto, Arial, sans-serif;
            background-color: #f5f6fa;
            color: #333;
            padding: 40px;
        }
        h2 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 25px;
            font-weight: 600;
        }
        table {
            border-collapse: collapse;
            width: 90%;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        thead {
            background-color: #2980b9;
            color: white;
        }
        th, td {
            padding: 14px 18px;
            text-align: center;
            border-bottom: 1px solid #eee;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:hover {
            background-color: #eaf4ff;
        }
        img {
            border-radius: 50%;
            width: 65px;
            height: 65px;
            object-fit: cover;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
        }
        th {
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        td {
            font-size: 15px;
        }
    </style>
    ';

    $html .= '<h2>👥 Primeros 20 usuarios</h2>';
    
    $html .= '<table border="1">';
    $html .= '<thead><tr>';
    $html .= '<th>ID</th>';
    $html .= '<th>Name</th>';
    $html .= '<th>Image</th>';
    $html .= '<th>Birthdate</th>';
    $html .= '<th>Created At</th>';
    $html .= '</tr></thead>';
    
    $html .= '<tbody>';
    foreach($users as $user) {
        $html .= '<tr>';
        $html .= '<td>'.$user->id.'</td>';
        $html .= '<td>'.$user->fullname.'</td>';
        $html .= '<th><img src="'.asset("images/".$user->photo).'" width="70px"></th>';
        $html .= '<td>' . Carbon\Carbon::parse($user->birthdate)->age . '</td>';
        $html .= '<td>'.$user->created_at->diffforhumans().'</td>';
        $html .= '</tr>';
    }
    $html .= '</tbody></table>';
    
    return $html;
});

Route::get('view/pets', function(){
    $pets = App\Models\Pet::all();
    return view('view-pets')->with('pets', $pets);
});