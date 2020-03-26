<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',['except' => ['login']]);
    }

    public function login(Request $request)
    {

        $credentials = request(['email', 'password']);

        if(! $token = auth('api')->attempt($credentials)){
            return response()->json(['error' => 'Unauthorized'], 481);
        }

        return $this->respondWithToken($token);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['messaged' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh);
    }

    public function respondwithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'user' => $this->guard('api')->user(),
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL()*60
        ]);
    }

    public function guard()
    {
        return Auth::guard('api');
    }
}

