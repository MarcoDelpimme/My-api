<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        if (auth()->user()->role != 'admin') {
            return redirect('/home')->with('error', 'You do not have access to this page');
        }


        return response()->json(['message' => 'Admin resource accessed']);
    }
}
