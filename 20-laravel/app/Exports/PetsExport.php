<?php

namespace App\Exports;

use App\Models\Pet;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PetsExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * Return a collection of models to export
     *
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Pet::all();
    }

    /**
     * Map a single model to an array row
     */
    public function map($pet): array
    {
        return [
            $pet->id,
            $pet->name,
            $pet->kind,
            $pet->breed,
            $pet->age,
            $pet->weight,
            $pet->location,
            $pet->description,
            $pet->active ? 'Active' : 'Inactive',
            $pet->status == 1 ? 'Available' : 'Adopted',
            $pet->image,
        ];
    }

    /**
     * Headings for the spreadsheet
     */
    public function headings(): array
    {
        return [
            'ID', 'Name', 'Kind', 'Breed', 'Age', 'Weight', 'Location', 'Description', 'Active', 'Status', 'Image'
        ];
    }
}
