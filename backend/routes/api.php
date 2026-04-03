<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/category',CategoryController::class)->except(['index','show']);
    Route::apiResource('/articles',ArticlesController::class)->except(['index','show']);
});

Route::get('/category',[CategoryController::class, 'index']);
Route::get('/category/{id}',[CategoryController::class, 'show']);
Route::get('/articles',[ArticlesController::class, 'index']);
Route::get('/articles/{id}',[ArticlesController::class, 'show']);

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
