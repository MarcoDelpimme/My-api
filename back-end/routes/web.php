<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});






require __DIR__ . '/auth.php';
