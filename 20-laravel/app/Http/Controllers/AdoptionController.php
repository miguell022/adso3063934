<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AdoptionsExport;

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

    public function search(Request $request){
      $q = $request->qsearch ?? $request->q;
      $adopts = Adoption::with('pet', 'user')->names($q)->orderBy('id', 'DESC')->paginate(20);
      return view('adoptions.search')->with('adopts', $adopts);
    }

    public function pdf()
    {
        $adoptions = Adoption::with('pet', 'user')->orderBy('id', 'DESC')->get();
        $pdf = Pdf::loadView('adoptions.pdf', compact('adoptions'));
        return $pdf->download('adoptions.pdf');
    }

    public function excel()
    {
        $adoptions = Adoption::with('pet', 'user')->orderBy('id', 'DESC')->get();
        return Excel::download(new AdoptionsExport($adoptions), 'adoptions.xlsx');
    }
}



