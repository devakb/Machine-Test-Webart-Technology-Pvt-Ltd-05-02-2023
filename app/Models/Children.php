<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Children extends Model
{
    use HasFactory;

    protected $table = 'childrens';

    protected $fillable = [
        'child_name',
        'dob',
        'class',
        'address',
        'country',
        'state',
        'city',
        'zipcode',
        'photo',
    ];


    const CLASSES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

    const RELATIONS = ["Father", "Mother", "Brother", "Sister", "Grand Father", "Grand Mother",];

    public function pickedupPeople()
    {
        return $this->hasMany(ChildrenPickedupPerson::class);
    }
}
