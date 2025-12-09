<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'image',
        'kind',
        'weight',
        'age',
        'breed',
        'location',
        'description',
        'active',
        'status',
    ];

    /**
     * Default attribute values for new models.
     */
    protected $attributes = [
        'image' => 'no-image.png',
        'active' => 1,
        'status' => 1, // default Available
    ];

    /**
     * Casts for attribute types.
     */
    protected $casts = [
        'active' => 'boolean',
        'status' => 'integer',
        'weight' => 'float',
        'age' => 'integer',
    ];

    // relationships 
    public function adoption()
    {
        return $this->hasOne(Adoption::class);
    }

    // Scope for search by name, kind, breed, or location
    public function scopeNames($query, $q)
    {
        if (trim($q)) {
            $query->where('name', 'LIKE', "%$q%")
                ->orWhere('kind', 'LIKE', "%$q%")
                ->orWhere('breed', 'LIKE', "%$q%")
                ->orWhere('location', 'LIKE', "%$q%");
        }

        return $query;
    }

    //Scope kinds
    public function scopekinds($query, $q)
    {
        if (trim($q)) {
            $query->where('status', 1) // Only available pets
                ->where(function($query) use ($q) {
                    $query->where('name', 'LIKE', "%$q%")
                        ->orWhere('kind', 'LIKE', "%$q%")
                        ->orWhere('breed', 'LIKE', "%$q%")
                        ->orWhere('location', 'LIKE', "%$q%");
                });
        } else {
            $query->where('status', 1); // Show all available pets if no search term
        }

        return $query;
    }
}
