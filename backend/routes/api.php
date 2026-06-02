<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;

// Custom routes
Route::get('/notes/search', [NoteController::class, 'search']);
Route::post('/notes/{note}/summary', [NoteController::class, 'summary']);

// Resource routes
Route::apiResource('notes', NoteController::class);

?>