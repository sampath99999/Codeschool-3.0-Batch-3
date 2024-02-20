<?php

namespace App\Http\Controllers;

use App\Models\SessionToken;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
     public function validateUser(Request $request){
$userId = $request->user_id;
$userTypeId=2;
try{
$getUserDetails=User::select('*')->where('user_types_id',$userTypeId )
            ->where('id', $userId)->get()->toArray();
if(count($getUserDetails)==0){
    return response()->json(["status"=>false,"message"=> "You are not Authorized to this page !"]);
}
return response()->json([
                'status' => true, 'message' => 'User verified successfully','data'=>$getUserDetails
            ]);
}
catch (\Exception) {

         
            return response()->json([
                'status' => false, 'message' => 'Something Went Wrong'
            ]);
        }

} 
public function validateAdmin(Request $request){
$userId = $request->user_id;
$userTypeId=1;
try{
$getUserDetails=User::select('*')->where('user_types_id',$userTypeId )
            ->where('id', $userId)->get()->toArray();
if(count($getUserDetails)==0){
    return response()->json(["status"=>false,"message"=> "You are not Authorized to this page !"]);
}
return response()->json([
                'status' => true, 'message' => 'User verified successfully','data'=>$getUserDetails
            ]);
}
catch (\Exception) {

         
            return response()->json([
                'status' => false, 'message' => 'Something Went Wrong'
            ]);
        }

} 
public function validateSession(Request $request){
$userId = $request->user_id;
$token = $request->token;
date_default_timezone_set('Asia/Kolkata'); 

$currentDateTime = date("Y-m-d H:i:s");
try{
$getSessionDetails=SessionToken::select('*')->where('user_token',$token )->where('expire_time','>',$currentDateTime )
            ->where('id', $userId)->get()->toArray();
if(count($getSessionDetails)==0){
    return response()->json(["status"=>false,"message"=> "Session  Time Expired !"]);
}

}
catch (\Exception) {

         
            return response()->json([
                'status' => false, 'message' => 'Something Went Wrong'
            ]);
        }




} 
public function logIn(Request $request){
$email= $request->email;
$password = $request->password;
$hashedPassword=md5($password);
// $request->validate([
//             'email' => ['required', 'email', 'unique:users,email'],
//             'password' => ['required', 'string', 'min:8','max:16', 'confirmed'],
//         ]);
try{
$vaildLogInId=User::select('id','name','user_types_id','email')->where('email',$email )->where('password',$hashedPassword )->get()->toArray();
if(count($vaildLogInId)==0){
    return response()->json(["status"=>false,"message"=> "Invalid Login Credential!"]);
}
$token = rand(10000,10000000);

   $userId=$vaildLogInId[0]['id'];
SessionToken::insert(['user_id'=>$userId,'user_token'=>$token]);
$response2 = [
    "token" =>$token,
    "validLogInId" =>$vaildLogInId
   ];
  return response()->json(["status"=>true,"message"=> "Login Sucessfully","data"=>$response2]);

}
catch (\Exception) {

         
            return response()->json([
                'status' => false, 'message' => 'Something Went Wrong'
            ]);
        }
}
}
