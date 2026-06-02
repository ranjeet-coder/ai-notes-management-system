<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use App\Http\Requests\StoreNoteRequest;
use App\Services\EmbeddingService;
//use App\Services\EmbeddingService;
use App\Services\SimilarityService;


class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->get('limit',10);

        return response()->json(
            Note::latest()->paginate($limit)
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    
    public function store(StoreNoteRequest $request)
    {
        $data = $request->validated();

        $data['embedding'] = EmbeddingService::generate(
            $data['title'] . ' ' . $data['content']
        );

        $note = Note::create($data);

        return response()->json([
            'success' => true,
            'data' => $note
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        return response()->json($note);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(StoreNoteRequest $request, Note $note)
    // {
    //     $note->update($request->validated());

    //     return response()->json([
    //         'success' => true,
    //         'data' => $note,
    //     ]);
    // }

    public function update(StoreNoteRequest $request, Note $note)
    {
        $data = $request->validated();

        $data['embedding'] = EmbeddingService::generate(
            $data['title'] . ' ' . $data['content']
        );

        $note->update($data);

        return response()->json([
            'success' => true,
            'data' => $note
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $note->delete();

        return response()->json(null, 204);
    }

    public function summary(Note $note)
    {
        $sentences = preg_split('/(?<=[.!?])\s+/', $note->content);

        return response()->json([
            'note_id' => $note->id,
            'summary' => implode(' ', array_slice($sentences, 0, 2))
        ]);
    }

    // public function search(Request $request)
    // {
    //     $queryEmbedding = EmbeddingService::generate($request->q);

    //     $notes = Note::all();

    //     $results = $notes->map(function ($note) use ($queryEmbedding) {

    //         $score = SimilarityService::cosine(
    //             $queryEmbedding,
    //             $note->embedding ?? []
    //         );

    //         $note->similarity_score = $score;

    //         return $note;
    //     });

    //     return response()->json(
    //         $results->sortByDesc('similarity_score')->values()
    //     );
    // }

    public function search__old(Request $request)
    {
        $queryEmbedding = EmbeddingService::generate($request->q);

        $notes = Note::all();

        $results = $notes->map(function ($note) use ($queryEmbedding) {

            $score = SimilarityService::cosine(
                $queryEmbedding,
                $note->embedding ?? []
            );

            $note->similarity_score = $score;

            return $note;
        })
        ->filter(function ($note) {
            return $note->similarity_score > 0.50;
        });

        return response()->json(
            $results->sortByDesc('similarity_score')->values()
        );
    }

    public function search(Request $request)
{
    $query = trim($request->q ?? '');

    if (!$query) {
        return response()->json([]);
    }

    $queryEmbedding = EmbeddingService::generate($query);

    $results = Note::all()
        ->map(function ($note) use ($queryEmbedding) {

            $score = SimilarityService::cosine(
                $queryEmbedding,
                $note->embedding ?? []
            );

            $note->similarity_score = round($score, 4);

            return $note;
        })
        ->filter(function ($note) {
            return $note->similarity_score > 0.30;
        })
        ->sortByDesc('similarity_score')
        ->values();

    return response()->json($results);
}

}
