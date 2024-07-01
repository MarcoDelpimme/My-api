<?php

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CategoryController;


// Ritorna le informazioni dell'utente autenticato
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});




// Gruppo di rotte protette da autenticazione
Route::middleware('auth:sanctum')->group(function () {
    // Aggiorna il nome dell'utente
    Route::put('/user/update-name', [UserController::class, 'updateName']);
    
    // Aggiorna l'immagine del profilo dell'utente
    Route::delete('/user/destroyImg', [UserController::class, 'destroyImg']);
    Route::post('/user/update-profile-image', [UserController::class, 'updateProfileImage']);
    // Aggiorna la password dell'utente
    Route::put('/user/update-password', [UserController::class, 'updatePassword']);
    // Ritorna l'elenco delle categorie
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/games/category/{categoryName}', [GameController::class, 'gamesByCategory']);
    // Rotte per la gestione degli ordini
    Route::resource('orders', OrderController::class);
    Route::middleware('auth:sanctum')->delete('/orders/{orderId}/items/{orderItemId}', [OrderController::class, 'removeFromCart']);
    Route::middleware('auth:sanctum')->post('orders/add-to-cart', [OrderController::class, 'addToCart']);
    
    
});

// Gruppo di rotte protette da autenticazione per amministratori e categorie
Route::middleware(['auth:sanctum'])->group(function () {
    // Ritorna le risorse amministrative
    // Route::get('/admin/resource', [AdminController::class, 'index']);
    // Route::middleware("auth:sanctum")->post('/game/{id}/update-image', [GameController::class, 'updateGameImage']);


    
    
    // Aggiorna un gioco specifico
    // Route::put('/games/{id}', [GameController::class, 'update']);
});



//__________________________________________________---controllo admin
Route::middleware(['auth:sanctum', 'admin' ])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/admin/resource', [AdminController::class, 'index']);
    Route::put('/games/{id}', [GameController::class, 'update']);
    Route::post('/game/{id}/update-image', [GameController::class, 'updateGameImage']);
    Route::post('/games/store', [GameController::class, 'store']);
    Route::get('/game-sales', [OrderController::class, 'getGameSales']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});
//__________________________________________________---controllo admin



// Mostra le informazioni dell'utente
// Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'show']);



Route::get('user/purchases', [OrderController::class, 'getUserPurchases']);
// Rotta per creare un nuovo gioco

// Route::post('/games/store', [GameController::class, 'store']);

// Rotte per la gestione dei giochi
Route::Resource('games', GameController::class);

// Rotte per la gestione delle recensioni
Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/games/{gameId}/reviews', [ReviewController::class, 'store']);
Route::get('/reviews/{id}', [ReviewController::class, 'show']);
Route::put('/reviews/{id}', [ReviewController::class, 'update']);
Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
Route::get('/games/{gameId}/reviews', [ReviewController::class, 'getByGameId']);
//_________________________________________________________________________________-


//____________________________________________
use App\Http\Controllers\UserLibraryController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/library', [UserLibraryController::class, 'index']);
    Route::post('/user/library/add', [UserLibraryController::class, 'store']);
    Route::delete('/user/library/remove/{gameId}', [UserLibraryController::class, 'destroy']);
});
//____________________________________________



Route::middleware('auth:sanctum')->group(function () {
    Route::patch('orders/{orderId}/complete', [OrderController::class, 'completeOrder']);
});