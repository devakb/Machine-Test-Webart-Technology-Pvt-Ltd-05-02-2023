<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChildrenPickedupPerson extends Model
{
    use HasFactory;

    protected $table = 'children_pickedup_people';

    protected $fillable = [
        'person_name',
        'relation',
        'contact_no',
    ];

    public function children()
    {
        return $this->belongsTo(Children::class);
    }
}
