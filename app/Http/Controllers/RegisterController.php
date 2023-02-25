<?php

namespace App\Http\Controllers;

use App\Models\Children;
use Illuminate\Http\Request;

class RegisterController extends Controller
{

    public function showRegisterForm()
    {

        return view('register', [
            "classes" => Children::CLASSES,
        ]);
    }

    public function register(Request $request)
    {

        try {
            $countires = (new CommonController)->getStateAndCountryJson();
            $states = (new CommonController)->getStateAndCountryJson($request->country);

            $request->validate([
                'child_name' => 'required|max:80',
                'dob' => 'required|date',
                'class' => 'required|in:' . implode(',', Children::CLASSES),
                'address' => 'required|max:400',
                'country' => 'required|in:' . implode(',', $countires->original['countries']),
                'state' => 'required|in:' . implode(',', $states->original['states']),
                'city' => 'required|max:100',
                'zipcode' => 'required|max:7',
                'pickupperson' => 'array',
                'pickupperson.*.person_name' => 'required|max:80',
                'pickupperson.*.relation' => 'required|in:' . implode(',', Children::RELATIONS),
                'pickupperson.*.contact_no' => 'required|digits:10',
                'photo' => 'required|image|mimes:jpeg,png,jpg|max:1024',
            ]);


            $photo = $request->file('photo');
            $photo_name = sha1(microtime() . mt_rand(1, 10)) . '.' . $photo->getClientOriginalExtension();

            $storepath = storage_path('app\public\images');
            $photo->move($storepath, $photo_name);


            $child = Children::create([
                'child_name' => $request->child_name,
                'dob' => $request->dob,
                'class' => $request->class,
                'address' => $request->address,
                'country' => $request->country,
                'state' => $request->state,
                'city' => $request->city,
                'zipcode' => $request->zipcode,
                'photo' => "storage" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . $photo_name,
            ]);

            foreach ($request->pickupperson as $person) {
                $child->pickedupPeople()->create([
                    'person_name' => $person['person_name'],
                    'relation' => $person['relation'],
                    'contact_no' => $person['contact_no'],
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => 'Children  registered successfully',
                'data' => [
                    'child' => $child,
                    'pickup_persons' => $child->pickedupPeople,
                ],
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
