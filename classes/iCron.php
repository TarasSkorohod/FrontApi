<?php

// SET('start', 'success', 'out of diapazon')


class iCron {
	
	protected $cron_id;
	public $parsing_step = "3 month";
	public $log = [];
	private $log_id = null;
	
	public $username='1';
	public $password='1';	
	
	public $test_mode = true;
	
	private $dia;
	
	private $subjects;
	
	
	function getDiapazon() {
		
		$last_date_parsed = iDB::value( "SELECT `value` FROM `cron_options` WHERE cron_id={$this->cron_id} AND `name`=" . iS::sq("last date parsed") );

		$time_from = strtotime( $last_date_parsed .  " +1 second" );
		$time_to = strtotime( $last_date_parsed . " + " . $this->parsing_step );
		
		if ( $this->test_mode ) echo "the selected range for cron {$this->cron_id} is ". date("Y-m-d H:i:s", $time_from) ." to ". date("Y-m-d H:i:s", $time_to) . "\n";		
		
		$this->updateLog([ 
			"diapazon_from" => date("Y-m-d H:i:s", $time_from),
			"diapazon_to" => date("Y-m-d H:i:s", $time_to),
			"diapazon_step" => $this->parsing_step,
		]);
		
		
		
		//if ( time() - strtotime( "- {$this->parsing_step}", $time_to ) < 0 ) {
		if ( strtotime( "+ {$this->parsing_step}", $time_from ) > time() ) {
			if ( $this->test_mode ) echo "all data has been collected for cron {$this->cron_id}\n";
			$this->updateLog( [ "res" => 'out of diapazon' ] );
			return false;
		};		
		
		$this->dia = [ "from" => $time_from, "to" => $time_to ];
		
		return $this->dia;
	}
	
	
	function incDiapazon() {
		iDB::update( "UPDATE cron_options SET `value`=" . iS::sq( date("Y-m-d H:i:s", $this->dia["to"]) ) . " WHERE cron_id={$this->cron_id} AND `name`='last date parsed'" );		
	}
	
	function subjectID( $subject_title ) {
		
		$subject_title = trim( $subject_title );
		
		if ( !isset( $this->subjects[ $subject_title ]) ) {
			if ( preg_match("#(\d+)\.(\d+)?\.?(.+) #suix", $subject_title, $sub) ) {
				
				$subject_data = [
					"d0" => $sub[1],
					"d1" => $sub[2],
					"title" => $sub[3],
					"full_title" => $item_insert["title"],
				];
				$subject_id = iDB::insertSQL( "subjects", $subject_data );
				$this->subjects[ $subject_title ] = $subject_id;
			} else {
				trigger_error( "Achtung - \"{$subject_title}\"", E_USER_ERROR );
			};	
		} else {
			$subject_id = $this->subjects[ $subject_title ];
		};			
			
		return $subject_id;	
	}
	
	function request( $url ) {
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);

		$headers = [ 'Authorization: Basic '. base64_encode($this->username.':'.$this->password) ];

		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

		$result=curl_exec ($ch);
		$response_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);   
		$response = curl_exec($ch);
		$json = json_decode( $response, true );
		curl_close ($ch);		
		
		if ( !isset( $json["result"] ) ) {
			$this->updateLog( [ "res" => 'no results' ] );
			if ( $this->test_mode ) echo "no results for '{$url}'\n";
			return false;
		};
		
		if ( $response_code != 200 ) {
			$this->updateLog( [ "res" => 'wrong response code' ] );
			if ( $this->test_mode ) echo "response code = {$response_code} for '{$url}'\n";
			return false;
		};

		
		if ( $this->test_mode ) echo count($json["result"]) . " positions received\n";
		$this->updateLog( [ "json_count" => count($json["result"]) ] );

		return $json["result"] ;
	}	
	
	
	
	
	
	function updateLog( $log_data ) {
		if ( is_null( $this->log_id ) ) {
			$this->log_id = iDB::insertSQL( "cron_logs", $log_data );
		} else {
			iDB::updateSQL( "cron_logs", $log_data, "id=" . $this->log_id );
		};
		
	}
	
	
	function __construct( $cron_id ) {
		if ( $this->test_mode ) echo "starting cron {$cron_id}\n";
		
		$this->cron_id = $cron_id;

		$this->updateLog( [ "cron_id" => $cron_id ] );
		
		$this->subjects = iDB::line( "SELECT full_title, id FROM subjects", [] );

	}		
	
}












/*
class iCron {

	public $username='1';
	public $password='1';
	public $base_url = 'http://213.160.156.171:8179/';

	private $cron_id;
	
	private $log;



	function option( $name ) {
		
		$option = [
			
			"1" => [
				"url" => "http://213.160.156.171:8179/torg/hs/get_data/get_sales",
				"need_diapazon" => true,		
			],
			"2" => [
				"url" => "http://213.160.156.171:8179/torg/hs/get_data/get_inproduction",
				"need_diapazon" => false,
			],		
			"3" => [
				"url" => "http://213.160.156.171:8179/torg/hs/get_data/get_productionhistory",
				"need_diapazon" => true,
			],		
		
		
		];


		if ( !isset( $option[ $this->cron_id ][ $option_name ] ) ) $this->error( 1 );
		else return $option[ $this->cron_id ][ $option_name ];

	}








	function request( $url ) {
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_TIMEOUT, 30); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);

		$headers = [ 'Authorization: Basic '. base64_encode($username.':'.$password) ];

		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

		$result=curl_exec ($ch);
		$response_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);   
		$response = curl_exec($ch);
		$json = json_decode( $response, true );
		curl_close ($ch);		
		
		if ( !isset( $json["result"] ) ) trigger_error( "no results for '{$url}'", E_USER_ERROR );
		if ( $response_code != 200 ) trigger_error( "response code = {$response_code} for '{$url}'", E_USER_ERROR );

		trigger_error( count($json["result"]) . " positions received", E_USER_NOTICE );


		return isset( $json["result"] ) ? $json["result"] : false;
	}


		$row_log = [
			"time_from" => date("Y-m-d H:i:s", $time_from),
			"time_to" => date("Y-m-d H:i:s", $time_to),
			"response_code" => $response_code,
			"response_count" => count($json["result"]),
			"inserted_count" => 0,
			"step" => $parsing_step,
			"cron_id" => 2
		];		






	function __construct( $cron_id ) {
		trigger_error( "starting cron {$cron_id}" , E_USER_NOTICE);
		
		$this->cron_id = $cron_id;
		$this->log = [ "cron_id" => $cron_id];
		
		
	}
}
*/