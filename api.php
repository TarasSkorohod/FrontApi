<?php
require_once("classes/constants.php");

$api = new API();
$api->scheme = [
	"success" => [ "title" => "Success", "text" => ""],
	"entities" => [	
		"companies" => [	"patch" => [ "fields" => "id, title, domain, phone, enabled, head, email, address, telegram, avatar", ]],
		"users" => [	"patch" => [ "fields" => "id, login, password, name, email, role, address, phone, auth_code, ip, avatar, companies_id, last_time_updated", ]],
		"records" => [	"patch" => [ "fields" => "id, title, users_id, avatar, time_record, duration, phone_from, phone_to, description, time_created, files_count, time_stop_vote, status, rate, votes_count, avg_rate", ]],
		"rates" => [	"patch" => [ "fields" => "id, records_id, text, rate, users_id, time_created", ]],
	],
];

switch ( $api->request ) {
	
	case "get/auth":		$api->getAuth(); 	break;
	case "post/auth":	$api->postAuth();	break;
	case "post/user/confirm_code":	$api->getConfirmCode();	break;
	

	case "post/message":	$api->postMessage();	break;
	
	case "delete/auth":	$api->deleteAuth();	break;
	
	case "get/data":		$api->getData(); 	break;
	
	case "get/companies":		$api->getScheme( "companies" ); 	break;	
	case "post/companies":		$api->postScheme( "companies" ); 	break;
	case "patch/companies":		$api->patchScheme( "companies" ); 	break;
	case "delete/companies":		$api->deleteScheme( "companies" ); 	break;	

	case "get/users":		$api->getScheme( "users" ); 	break;	
	case "post/users":		$api->postScheme( "users" ); 	break;
	case "patch/users":		$api->patchScheme( "users" ); 	break;
	case "delete/users":		$api->deleteScheme( "users" ); 	break;	

	case "get/records":		$api->getScheme( "records" ); 	break;	
	case "post/records":		$api->postScheme( "records" ); 	break;
	case "patch/records":		$api->patchScheme( "records" ); 	break;
	case "delete/records":		$api->deleteScheme( "records" ); 	break;	

	case "get/rates":		$api->getRates(); 	break;	
	case "get/rate":		$api->getRate(); 	break;
	case "post/rates":		$api->postRates(  ); 	break;
	case "patch/rates":		$api->patchRates(  ); 	break;
	case "delete/rates":		$api->deleteScheme( "rates" ); 	break;	
	
	case "post/copy/rows":		$api->copyRows(); 	break;
	case "get/modifications":		$api->getModifications(); 	break;
	
	default: $api->error( "Unknown request \"{$api->request}\"" );
};

$api->output();

