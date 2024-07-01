<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{

    public function index()
    {
        try {
            // Recupera tutti gli utenti con il conteggio degli ordini completati
            $users = User::withCount(['orders' => function($query) {
                $query->where('status', 'completed');
            }])->get();
            
            return response()->json($users);
        } catch (\Exception $e) {
            // Gestisci eventuali errori
            return response()->json(['error' => 'Failed to fetch users'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete user'], 500);
        }
    }


    public function show(Request $request)
    {
        $user = Auth::user();
        // Log per mostrare l'utente recuperato
        error_log('User retrieved: ' . json_encode($user));
        return response()->json($user);
    }

    public function updateName(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();
        $user->name = $request->name;
        $userInstance = new User();
        $userInstance->where('id', $user->id)->update(['name' => $request->name]);
        error_log('User updated: ' . json_encode($user));
        return response()->json(['message' => 'Name updated successfully']);
    }

    //_______________________________________________________QUARANTENA_______________________________________________
    public function updateProfileImage(Request $request)
    {
        // Aggiungi logging per il debug
        error_log('Request received');
        error_log('Request content: ' . print_r($request->all(), true));

        $validator = Validator::make($request->all(), [
            'profile_img' => 'required|image|max:1024',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('profile_img')) {
           
            $file_path = $request->file('profile_img')->store('profiles', 'public');

            $user = Auth::user();
            $user->profile_img = asset('storage/' . $file_path);
            $user->save();



            error_log('File path: ' . $file_path);
            error_log('Profile image updated successfully');

            return response()->json(['profile_img' => $user->profile_img]);
        }

        error_log('No profile image file detected');
        return response()->json(['message' => 'No image uploaded'], 400);
    }


    public function destroyImg(Request $request)
{
    $user = Auth::user(); // Ottieni l'utente autenticato

    if (!$user) {
        return response()->json(['message' => 'User not authenticated'], 401);
    }

    // Aggiungi logging per il debug
    error_log('Deleting profile image for user: ' . $user->id);

    // Rimuovi il prefisso 'storage/' dall'URL dell'immagine
    $filePath = str_replace(asset('storage') . '/', '', $user->profile_img);

    // Cancella l'immagine dal disco
    if (\Storage::disk('public')->exists($filePath)) {
        \Storage::disk('public')->delete($filePath);
        error_log('Profile image deleted successfully');

        // Resetta il campo profile_img dell'utente
        $user->profile_img = null;
        $user->save();

        return response()->json(['message' => 'Profile image deleted successfully']);
    } else {
        error_log('Profile image not found');
        return response()->json(['message' => 'Profile image not found'], 404);
    }
}

    

    //_______________________________________________________QUARANTENA_______________________________________________

    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => ['required', 'string'],
            'password' => ['required', 'min:8'],
        ]);

        error_log($request->current_password);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        error_log("ciao");

        $user = Auth::user();
        error_log($user->password);
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['errors' => ['current_password' => ['The provided password does not match your current password.']]], 422);
        }


        $userInstance = new User();
        $userInstance->where('id', $user->id)->update(['password' => Hash::make($request->password)]);
        error_log('User updated: ' . json_encode($userInstance));
        return response()->json(['message' => 'Password updated successfully']);
        error_log($request->password);
    }
}
