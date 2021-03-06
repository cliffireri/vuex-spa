<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Http\Requests\CreateCustomerRequest;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
    public function all()
    {
        $customers = Customer::all();

        return response()->json([
            'customers' => $customers
        ], 200);
    }

    public function new(CreateCustomerRequest $request)
    {
        $customer = Customer::create($request->only(['name','email','phone','website']));

        return response()->json([
            'customer' => $customer
        ], 200);
    }

    public function get($id)
    {
        $customer = Customer::find($id);;

        return response()->json([
            'customer' => $customer
        ], 200);
    }
}
