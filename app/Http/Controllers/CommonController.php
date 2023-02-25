<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CommonController extends Controller
{
    const PATH_TO_STATE_AND_COUNTRY_JSON = 'json/stateandcountries.json';


    public function getStateAndCountryJson(String|Null $country_name = null)
    {
        $json = file_get_contents(self::PATH_TO_STATE_AND_COUNTRY_JSON);

        $data = json_decode($json, true);

        if ($country_name) {

            if (array_key_exists($country_name, $data)) {

                return response()->json([
                    'country' => $country_name,
                    'states' => $data[$country_name],
                ], 200);

            }else{

                return response()->json(['message' => 'Country not found'], 404);

            }

        }else{

            return response()->json([
                'countries' => array_keys($data)
            ], 200);

        }

    }
}
