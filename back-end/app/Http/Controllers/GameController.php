<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;

use App\Models\Game;
use Illuminate\Http\Request;
use App\Models\Category;
class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $games = Game::with('categories', 'reviews')->get();
        return response()->json($games);
    }




    public function gamesByCategory($categoryName)
{
    try {
        // Trova la categoria corrispondente al nome fornito
        $category = Category::where('name', $categoryName)->first();

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        // Ottieni i giochi associati alla categoria trovata
        $games = $category->games()->with('categories', 'reviews')->get();

        return response()->json($games);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error fetching games by category'], 500);
    }
}
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */


     
 public function store(Request $request)
{
    $requestData = $request->all();
    $categoryIds = json_decode($requestData['category_ids']);
    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'release_date' => 'required|date',
        'developer' => 'required|string|max:255',
        'publisher' => 'required|string|max:255',
        'game_img' => ['nullable', 'image', 'max:1024'],
        'game_img_large' => ['nullable', 'image', 'max:2048'],
        'video' => 'nullable|url',
    ]);

    try {
        $game = new Game();
        $game->title = $validatedData['title'];
        $game->description = $validatedData['description'];
        $game->price = $validatedData['price'];
        $game->release_date = $validatedData['release_date'];
        $game->developer = $validatedData['developer'];
        $game->publisher = $validatedData['publisher'];
        $game->video = $validatedData['video'];

        // Upload delle immagini se sono state fornite
        if ($request->hasFile('game_img')) {
            $imagePath = $request->file('game_img')->store('game_images');
            $game->game_img = asset('storage/' . $imagePath);
        }
        if ($request->hasFile('game_img_large')) {
            $imagePathLarge = $request->file('game_img_large')->store('game_images');
            $game->game_img_large = asset('storage/' . $imagePathLarge);
        }

        $game->save();

        if (isset($categoryIds)) {
            $game->categories()->sync($categoryIds);
        }

        return response()->json($game, 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error saving the game'], 500);
    }
}

    
//_______________________________________________________
public function updateGameImage(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'game_img' => 'nullable|image|max:1024',
        'game_img_large' => 'nullable|image|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    try {
        $game = Game::findOrFail($id);

        if ($request->hasFile('game_img')) {
            $imagePath = $request->file('game_img')->store('game_images', 'public');
            $game->game_img = asset('storage/' . $imagePath);
        }

        if ($request->hasFile('game_img_large')) {
            $imagePathLarge = $request->file('game_img_large')->store('game_images', 'public');
            $game->game_img_large = asset('storage/' . $imagePathLarge);
        }

        $game->save();

        return response()->json([
            'game_img' => $game->game_img,
            'game_img_large' => $game->game_img_large,
        ]);
    } catch (\Exception $e) {
        error_log('Error updating game image: ' . $e->getMessage());
        return response()->json(['error' => 'Error updating game image'], 500);
    }
}

//__________________________________________________________________________

/**
 * Update the specified resource in storage.
 */
public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'release_date' => 'required|date',
        'developer' => 'required|string|max:255',
        'publisher' => 'required|string|max:255',
        'category_ids' => 'array',
        'video' => 'nullable|url',
        'game_img' => 'nullable|image|max:1024',
        'game_img_large' => 'nullable|image|max:2048',
    ]);

    try {
        $game = Game::findOrFail($id);
        $game->title = $validatedData['title'];
        $game->description = $validatedData['description'];
        $game->price = $validatedData['price'];
        $game->release_date = $validatedData['release_date'];
        $game->developer = $validatedData['developer'];
        $game->publisher = $validatedData['publisher'];
        $game->video = $validatedData['video'];

        // Upload delle immagini se sono state fornite
        if ($request->hasFile('game_img')) {
            $imagePath = $request->file('game_img')->store('game_images');
            $game->game_img = asset('storage/' . $imagePath);
        }
        if ($request->hasFile('game_img_large')) {
            $imagePathLarge = $request->file('game_img_large')->store('game_images');
            $game->game_img_large = asset('storage/' . $imagePathLarge);
        }

        $game->save();

        if (isset($validatedData['category_ids'])) {
            $game->categories()->sync($validatedData['category_ids']);
        }

        return response()->json($game);
    } catch (\Exception $e) {
        error_log($e);
        return response()->json(['error' => 'Error updating the game'], 500);
    }
}




    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $game = Game::with('categories', 'reviews')->findOrFail($id);
        return response()->json($game);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $game = Game::findOrFail($id);
            $game->categories()->detach();
            $game->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting the game'], 500);
        }
    }
}
