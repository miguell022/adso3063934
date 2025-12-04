<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use Illuminate\Http\Request;

class AdoptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $adoptions = Adoption::with('pet', 'user')->orderBy('id', 'DESC')->paginate(20);
    return view('adoptions.index', compact('adoptions'));
    }



    /**
     * Display the specified resource.
     */
    public function show(Adoption $adoption)
    {
        $adoption->load('pet', 'user');
        return view('adoptions.show', compact('adoption'));
    }

}



