<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with('game', 'user')->get();
        return response()->json($reviews);
    }
    public function getByGameId($gameId)
    {
        $reviews = Review::where('game_id', $gameId)->with('game', 'user')->get();
        return response()->json($reviews);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'game_id' => 'required|exists:games,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string'
        ]);

        $review = Review::create($validatedData);
        return response()->json($review, 201);
    }

    public function show($id)
    {
        $review = Review::with('game', 'user')->findOrFail($id);
        return response()->json($review);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'comment' => 'sometimes|string'
        ]);

        $review = Review::findOrFail($id);
        $review->update($validatedData);
        return response()->json($review);
    }

    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return response()->json(null, 204);
    }
}
