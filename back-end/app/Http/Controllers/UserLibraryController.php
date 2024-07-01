<?php
namespace App\Http\Controllers;

use App\Models\UserLibrary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserLibraryController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $library = $user->library;
        return response()->json($library);
    }

    public function addToLibrary($gameId)
    {
        $user = Auth::user();
        $user->library()->attach($gameId);
        return response()->json(['message' => 'Game added to library']);
    }

    public function removeFromLibrary($gameId)
    {
        $user = Auth::user();
        $user->library()->detach($gameId);
        return response()->json(['message' => 'Game removed from library']);
    }
}
