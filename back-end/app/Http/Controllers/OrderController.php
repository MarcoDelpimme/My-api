<?php

namespace App\Http\Controllers;


use App\Models\Game;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $orders = Order::with('user', 'orderItems.game')->where('user_id', $user->id)->where('status', 'open')->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'total_price' => 'required|numeric',
            'status' => 'required|string|max:255'
        ]);

        $validatedData['user_id'] = Auth::id();
        $order = Order::create($validatedData);
        return response()->json($order, 201);
    }

    public function show($id)
    {
        $order = Order::with('user', 'orderItems')->findOrFail($id);
        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'total_price' => 'sometimes|numeric',
            'status' => 'sometimes|string|max:255'
        ]);

        $order = Order::findOrFail($id);
        $order->update($validatedData);
        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }

    public function addToCart(Request $request)
    {
        $validatedData = $request->validate([
            'game_id' => 'required|exists:games,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = Auth::id(); // Usa l'utente autenticato
        $game = Game::findOrFail($validatedData['game_id']);

        $order = Order::where('user_id', $user)->where('status', 'open')->first();

        if (!$order) {
            $order = new Order();
            $order->user_id = $user;
            $order->status = 'open';
            $order->total_price = 0;
            $order->save();
        }

        // Verifica se l'elemento del carrello esiste già e aggiorna la quantità
        $orderItem = $order->orderItems()->where('game_id', $game->id)->first();
        if ($orderItem) {
            $orderItem->quantity += $validatedData['quantity'];
            $orderItem->price = $game->price * $orderItem->quantity;
            $orderItem->save();
        } else {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->game_id = $game->id;
            $orderItem->quantity = $validatedData['quantity'];
            $orderItem->price = $game->price * $validatedData['quantity'];
            $orderItem->save();
        }

        $order->total_price += $game->price * $validatedData['quantity'];
        $order->save();

        return response()->json($order->load('orderItems.game'), 201);
    }

    public function removeFromCart($orderId, $orderItemId)
{
    $order = Order::findOrFail($orderId);
    $orderItem = OrderItem::findOrFail($orderItemId);

    // Assicurati che l'elemento dell'ordine appartenga all'ordine dell'utente autenticato
    if ($orderItem->order_id === $order->id && $order->user_id === Auth::id()) {
        // Se la quantità è maggiore di 1, riduci la quantità di 1 senza eliminare l'elemento
        if ($orderItem->quantity > 1) {
            $orderItem->quantity -= 1;
            $orderItem->price -= $orderItem->game->price; // Riduci il prezzo di un'unità
            $orderItem->save();
        } else {
            // Altrimenti, elimina completamente l'elemento
            $orderItem->delete();
        }
        
        // Ricalcola il totale dell'ordine
        $order->total_price = $order->orderItems()->sum('price');
        $order->save();

        return response()->json(null, 204);
    }

    return response()->json(['error' => 'Unauthorized'], 401);
}


//_____________________quarantena__________________________________
    public function completeOrder($orderId)
    {
        $order = Order::findOrFail($orderId);
    
        if ($order->status !== 'open') {
            return response()->json(['message' => 'Order is not open'], 400);
        }
    
        $order->status = 'completed';
        $order->save();
    
        // Aggiungere i giochi alla libreria dell'utente
        $this->addToUserLibrary($order);
    
        return response()->json(['message' => 'Order completed and games added to library']);
    }
//_____________________quarantena__________________________________

public function getGameSales()
{
    // Recupera tutte le vendite dei giochi basate sugli ordini completati
    $gameSales = OrderItem::selectRaw('game_id, SUM(quantity) as total_sales')
                    ->whereHas('order', function ($query) {
                        $query->where('status', 'completed');
                    })
                    ->groupBy('game_id')
                    ->with('game:id,title') // Carica anche le informazioni di base del gioco
                    ->get();

    return response()->json($gameSales);
}







//____________________TEST CRONOLOGIA__________________________________
public function getUserPurchases()
{
    $user = Auth::user();

    $purchases = Order::with('orderItems.game')
                ->where('user_id', $user->id)
                ->where('status', 'completed') // Consideriamo solo gli ordini completati
                ->orderByDesc('created_at') // Ordiniamo per data decrescente
                ->get();

    return response()->json($purchases);
}

//____________________TEST CRONOLOGIA__________________________________


private function addToUserLibrary(Order $order)
{
    $user = $order->user;
    $games = $order->orderItems->pluck('game_id')->all();

    $user->library()->syncWithoutDetaching($games);
}






}

