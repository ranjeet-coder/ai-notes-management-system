<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    //fillable
   protected $fillable = [
    'title',
    'content',
    'embedding'
];

    protected $casts = [
        'embedding' => 'array',
    ];
}
