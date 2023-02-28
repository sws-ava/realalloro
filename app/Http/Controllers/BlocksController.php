<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blocks;

class BlocksController extends Controller
{    
    public function getBlocks(){
        $ua = Blocks::where('locale', 'ua')->get();
        $ru = Blocks::where('locale', 'ru')->get();
        return response()->json(
            collect([
                'ru' => $ru,
                'ua' => $ua,
            ])
        );
    }
    public function saveBlocks(Request $request){
        // return $request;

        $ruBlock = Blocks::where('locale', 'ru')->first();
        $ruBlock->address = $request->ru['address'];
        $ruBlock->email = $request->ru['email'];
        $ruBlock->phone1 = $request->ru['phone1'];
        $ruBlock->phone1full = $request->ru['phone1full'];
        $ruBlock->phone2 = $request->ru['phone2'];
        $ruBlock->phone2full = $request->ru['phone2full'];
        $ruBlock->workHours = $request->ru['workHours'];
        $ruBlock->showWarning =  $request->ru['showWarning'];
        $ruBlock->warning = $request->ru['warning'];
        $ruBlock->save();

        
        $uaBlock = Blocks::where('locale', 'ua')->first();
        $uaBlock->address = $request->ua['address'];
        $uaBlock->email = $request->ru['email'];
        $uaBlock->phone1 = $request->ru['phone1'];
        $uaBlock->phone1full = $request->ru['phone1full'];
        $uaBlock->phone2 = $request->ru['phone2'];
        $uaBlock->phone2full = $request->ru['phone2full'];
        $uaBlock->workHours = $request->ru['workHours'];
        $uaBlock->showWarning =  $request->ru['showWarning'];
        $uaBlock->warning = $request->ua['warning'];
        $uaBlock->save();

        return $request;
    }

}
