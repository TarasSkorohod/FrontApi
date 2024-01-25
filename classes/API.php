<?php

require_once( "utils.php" );

class API extends baseAPI {
	
	public $tlg;
	
	
	public function getAuth() {
		if ( $this->session_id ) {	
			$user_table = "users";
			$oUser = iDB::row_assoc("SELECT * FROM `{$user_table}` WHERE `id`=" . iS::n($_SESSION["user"]["id"]));
			

			$oUser["auth"] = true;	
			//$oUser["avatar"] = iDB::value("SELECT rel_url FROM uploads WHERE id=" . iS::n($oUser["avatar_id"]));
			
			unset( $oUser["password"] );
			$this->output = $oUser;
		}
	}
	





	public function getConfirmCode() {
		
		if ( $params = $this->fetch_params( ["login"] ) ) {
			$login = trim( $params["login"] );
			
			if ( empty( $login ) ) {
				$this->error("Wprowadź swój adres e-mail lub numer telefonu");
				return false;
			};
			
			$oUser = iDB::row_assoc("SELECT * FROM users WHERE `login`=" . iS::sq($login) . " OR `email`=" . iS::sq($login) . " OR `phone`=" . iS::sq($login) );
			
			if ( !is_null($oUser) ) {
				
				// $tlg_user = iDB::row_assoc( "SELECT uid, lang, COM.id as companies_id FROM chats C LEFT JOIN companies COM ON ( COM.chats_id = C.id ) WHERE COM.id={$oUser["id"]}" );
				
				
				// авторизация через email
				// if ( is_null($tlg_user) ) {
					
					$code = mt_rand( 100, 999 );
					iDB::update( "UPDATE users SET auth_code={$code}, ip=". iS::sq( $_SERVER["REMOTE_ADDR"] ) ." WHERE id={$oUser["id"]}" );
					
					if ( !IS_LOCAL_SERVER ) {
					// if ( 1 == 1 ) {	
						$res_send = $this->mail_send( 
							$subject = "Код авторизації на сайті", 
							$body = "Код підтвердження авторизації на сайті - <b>{$code}</b>. Якщо ви отримали його помилково, просто пропустіть це повідомлення", 
							$email = $oUser["email"]
						);
						
						if ( $res_send ) {
							
							$this->success("Код підтвердження {$code} надіслано на вашу електронну адресу!");	
							
						} else {	
						
							//$this->tlg->sendTmplAdmin( "partner wrong email", [ $email ] );
							$this->error("Помилка при надсиланні електронного листа!");	
							
						};
						
					} else {
						$this->success("Код підтвердження {$code} надіслано на вашу електронну адресу!");
					};
					
					$this->output["data"]["auth_type"] = "email";
					
				// авторизация через telegram	
				// } 
				/*
				else {

					$code = mt_rand( 10, 99 );
					$code1 = mt_rand( 10, 99 );
					$code2 = mt_rand( 10, 99 );
					
					iDB::update( "UPDATE companies SET auth_method='telegram', auth_res=0, auth_code={$code}, ip=". iS::sq( $_SERVER["REMOTE_ADDR"] ) .", user_agent=". iS::sq( $_SERVER["HTTP_USER_AGENT"] ) ." WHERE id={$oUser["id"]}" );

					$inline_keyboard = [
						[ 'text' => $code1, 'callback_data' => "partner login ({$code1})", ],
						[ 'text' => $code, 'callback_data' => "partner login ({$code})", ],
						[ 'text' => $code2, 'callback_data' => "partner login ({$code2})", ],						
					];
					//shuffle( shuffle( shuffle( $inline_keyboard ) ) );
				
					$params = [
						'chat_id' => $tlg_user["uid"],
						'text' => $this->tlg->tmpl( "partner telegram login", $tlg_user["lang"], [ $login, $_SERVER["REMOTE_ADDR"], $_SERVER["HTTP_USER_AGENT"]  ] ),
						'reply_markup' => [ 'inline_keyboard' => [ $inline_keyboard ],	],
						"resize_keyboard" => false,
						"one_time_keyboard" => TRUE,			
					];
					$this->tlg->send( $params );				
						
					$this->output["data"]["auth_type"] = "telegram";

					$this->success( $this->tlg->tmpl( "partner telegram code send", $tlg_user["lang"], [ $code ] ));
				};
				*/
				
				
				
				
					
			} else {
				$this->error("У нас немає зареєстрованого користувача з такою адресою електронної пошти та номером телефону");
				//$this->tlg->sendTmplAdmin( "partner login error", [ $login ] );
				
				sleep(1);
			};
			
		};		
		
		
	}


	public function postAuth() {
		
		if ( $params = $this->fetch_params( ["login", "confirm_email_code"] ) ) {
			$login = trim( $params["login"] );
			$confirm_email_code = trim( $params["confirm_email_code"] );
			
			if ( empty( $login ) ) { $this->error("Введіть адресу електронної пошти або номер телефону"); return false; };
			
			$oUser = iDB::row_assoc("SELECT * FROM users WHERE  (`login`=" . iS::sq($login) . " OR `email`=" . iS::sq($login) . " OR `phone`=" . iS::sq($login) .")" );
			
			if ( is_null( $oUser ) ) { $this->error403(); return false; };

			// авторизация через email	
			//if ( $oUser["auth_method"] == "email" ) {
				
				
				if ( $oUser["auth_code"] == trim($confirm_email_code) ) {
					$_SESSION["user"] = $oUser;	
					$this->output = $_SESSION["user"];			
					//$this->tlg->sendTmplAdmin( "партнер залогинился", [ $oUser["email"] ] );					
				} else {
					$this->error("Введено невірний код ");
					sleep(1);
				};
				
			// авторизация через telegram	
			/*
			} else {
				
				if ( $oUser["auth_res"] ) {
					$_SESSION["user"] = $oUser;	
					$this->output = $_SESSION["user"];					
					$this->tlg->sendTmplAdmin( "партнер залогинился", [ $oUser["email"] ] );					
				} else {
					$this->error("Wprowadzono nieprawidłowy kod ");
					sleep(1);
				};
				
			};
			*/
			
			
		};
	}
	

	public function postCheckTlgAuth() {
		
		if ( $params = $this->fetch_params( ["login"], false) ) {	
			
			$login = $params["login"];
			$auth_res = iDB::value("SELECT auth_res FROM companies WHERE `email`=" . iS::sq($login) . " OR `phone`=" . iS::sq($login), false );
			
			$this->output["data"]["auth"] = $auth_res;
			
		} else {
			$this->error("Error API");	
		}


	}

	
	public function deleteAuth() {
		unset ($_SESSION["user"] );
	}


	public function postMessage() {
		
		if ( $params = $this->fetch_params( ["type", "text", "title"], false) ) {	
			
			$this->tlg->sendTmplAdmin( "message sent", [ $_SESSION["user"]["email"], $params["title"], $params["type"], $params["text"],  ] );

			
		} else {
			$this->error("Error API");	
		}		
		

		
	}

	public function mail_send( $subject, $body, $email ) {

		$mailer = new Mailer();
		
		$res_send = $mailer->send( 
			$to = [ "email" => $email ],
			$from = [ "email" => EMAIL_SUPPORT_USER, "name" => EMAIL_SUPPORT_NAME ],
			[
				"subject" => $subject,
				"body" => $body,
			]
		);		
		
		return $res_send;
	}



	public function getData() {
		if ( !$this->session_role ) {  
		
			$this->output["data"]["users"] = iDB::rows_assoc("SELECT * FROM users", []);
			$this->output["data"]["records"] = iDB::rows_assoc("SELECT * FROM records", []);
			$this->output["data"]["companies"] = iDB::rows_assoc("SELECT * FROM companies", []);
		
		} else {	 

			$this->output["data"]["companies"] = iDB::rows_assoc("SELECT * FROM companies", []);
			$this->output["data"]["users"] = iDB::rows_assoc("SELECT * FROM users", []);
			$this->output["data"]["records"] = iDB::rows_assoc("SELECT * FROM records", []);
			$this->output["data"]["rates"] = iDB::rows_assoc("SELECT * FROM rates", []);

		}	
	}	
	
	
	public function getRate() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["records_id"] ) ) {	
			$records_id = iS::n( $params["records_id"] );
			
			$this->output["data"]["rates"] = iDB::row("SELECT * FROM rates WHERE records_id={$records_id} AND users_id={$this->session_id}", []);
			
		} else {
			$this->error("Error API");	
		}		
	}


	public function postRates() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["text", "rate", "records_id"], false ) ) {	
			if ( !empty( $params ) ) {
				$params["users_id"] = $this->session_id;
				
				$rates_id = iDB::insertSQL( "rates", $params );
				
				$this->success("Успішно!", "Дані вашого голосування враховано");
			
				// обновляем общие данные по оценкам по записям
				$records_id = iS::n( $params["records_id"] );
				$query = "
					UPDATE records REC, ( SELECT COUNT(R.id) as votes_count, SUM(R.`rate`) as rate, SUM(R.`rate`)/ COUNT(R.id) as avg_rate FROM rates R WHERE R.records_id={$records_id }) as R
					SET REC.votes_count = R.votes_count, REC.rate = R.rate, REC.avg_rate = R.avg_rate
					WHERE REC.id={$records_id }			
				";
				iDB::exec( $query );
				
				$this->output["data"]["rates"] = iDB::row("SELECT * FROM rates WHERE id={$rates_id}");	
				$this->output["data"]["records"] = iDB::row("SELECT * FROM records WHERE id={$records_id}");	
			
			};
			//$this->output["data"]["rates"] = iDB::row("SELECT * FROM rates WHERE users_id={$this->session_id} AND id={$records_id}", []);
		} else {
			$this->error("Error API");	
		}		
	}

	public function patchRates() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["id", "text", "rate", "records_id"], false ) ) {	
			$item_id = iS::n( $params["id"] );
			unset( $params["id"] );
			
			if ( !empty( $params ) ) {
				iDB::updateSQL( "rates", $params, "id={$item_id}" );
				//$this->output["data"] = iDB::row("SELECT * FROM rates WHERE id={$item_id} AND users_id={$this->session_id}");	 
				
				// $this->output["data"]["rates"] = iDB::row("SELECT * FROM rates WHERE id={$item_id}");
				
				
				// обновляем общие данные по оценкам по записям
				$records_id = iS::n( $params["records_id"] );
				$query = "
					UPDATE records REC, ( SELECT COUNT(R.id) as votes_count, SUM(R.`rate`) as rate, SUM(R.`rate`)/ COUNT(R.id) as avg_rate FROM rates R WHERE R.records_id={$records_id }) as R
					SET REC.votes_count = R.votes_count, REC.rate = R.rate, REC.avg_rate = R.avg_rate
					WHERE REC.id={$records_id }			
				";
				iDB::exec( $query );				
				
				$this->output["data"]["rates"] = iDB::row("SELECT * FROM rates WHERE id={$item_id}");	
				$this->output["data"]["records"] = iDB::row("SELECT * FROM records WHERE id={$records_id}");	
				
				$this->success("Успішно!", "Дані голосування оновлено");
			};
			
			// $this->output["data"]["rates"] = iDB::row("SELECT * FROM rates WHERE users_id={$this->session_id} AND id={$records_id}", []);
		} else {
			$this->error("Error API");	
		}		
	}	
	
	
	
	
	public function postShops() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["address", "posx", "posy", "cities_id", "booking_time", "companies_id", "status"], false) ) {	
			
			$shop = $params;

			$shop_id = iDB::insertSQL( "shops", $shop );
					
			$this->success("Udało się", "Pomyślnie dodane sklepy");	 		
			$this->tlg->sendTmplAdmin( "добавлен магазин", [ $_SESSION["user"]["email"], $shop["address"]  ] );
			
			Alert::partner( "забронирован новый магазин", $shop["address"] );			
				
				
			$this->output["data"] = iDB::row("SELECT * FROM shops WHERE id={$shop_id}");	 	
			return true;
			
		} else {
			$this->error("Error API");	
		}		
		
	}
	

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~			Managers

	public function getManagers() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
			
		$query = "SELECT * FROM managers U";				
		$this->output["data"] = iDB::rows_assoc( $query, []);
	}
	
	
	public function getManager() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["id"] ) ) {	
			$manager_id = iS::n( $params["id"] );
			$this->output["data"] = iDB::row("SELECT * FROM managers WHERE id={$manager_id}", []);
		} else {
			$this->error("Error API");	
		}
	}	
	
	
	public function patchManager() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["id", "firstname", "lastname"], false) ) {	
			
			$manager_id = iS::n( $params["id"] );
			unset( $params["id"] );
			
			iDB::updateSQL("managers", $params, "id={$manager_id}");
			
			$this->success("Success", "Данные менеджера обновлены");	 
		} else {
			$this->error("Error API");	
		}
	}
	

	public function postManager() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		
		if ( $params = $this->fetch_params( ["firstname", "lastname"], false ) ) {
			 $manager_id = iDB::insertSQL("managers", $params);
			
			$this->output["data"] = iDB::row("SELECT * FROM managers WHERE id={$manager_id}");	 
			$this->success("Success", "Добавлен новый менеджер");	 
				
			 
		} else {
			$this->error("Error API");	
		};
			
	}


	public function deleteManager() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $params = $this->fetch_params( ["id"] ) ) {
			iDB::delete("DELETE FROM managers WHERE id=" . iS::n($params["id"]));
			$this->success("Success", "Менеджер был удален");	
		} else {
			$this->error("Error API");	
		}	
			
	}	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~			Accounts

	public function getAccounts() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
			
		$query = "SELECT * FROM accounts";				
		$this->output["data"] = iDB::rows_assoc( $query, []);
	}


	public function patchAccount() {
		
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		if ( $in = $this->fetch_params( ["id", "managers_id", "invited_acc_name"] ) ) {	
			
			$account_id = iS::n( $in["id"] );
			unset( $in["id"] );
			
			$upd = [];
			
			if ( $in["managers_id"] == 'null' ) $in["managers_id"] = null;
			$upd["managers_id"] = $in["managers_id"];

			
			$invited_acc_name = trim( $in["invited_acc_name"] );
			if ( empty($invited_acc_name) ) $upd["invited_acc"] = null;
			else {
				
				$invited_acc = iDB::value("SELECT id FROM accounts WHERE `name`=" . iS::sq($invited_acc_name));
				
				//$this->output["invited_acc"] = $invited_acc;
				if ( !is_null($invited_acc) ) {
					$upd["invited_acc"] = $invited_acc;
					$upd["invited_acc_name"] = $invited_acc_name;
				} else $this->error("Error", "В базе нет такого приглашенного пользователя. Перепроверьте!"); 	

			}

			
			if ( !empty($upd) ) {
				iDB::updateSQL("accounts", $upd, "id={$account_id}");
				$this->success("Success", "Данные аккаунта обновлены");	 
			}
			
			$this->output["upd"] = $upd;
			$this->output["data"] = iDB::row("SELECT * FROM accounts WHERE id={$account_id}");	 
			
		} else {
			$this->error("Error API");	
		}
	}



	public function getNotifications() {
		if ( !$this->session_role ) { $this->error401(); return false; }
		
		$this->output["data"] = iDB::rows_assoc("SELECT * FROM notifications WHERE `red`=0", []);
		
		iDB::update( "UPDATE notifications SET `red`=1 WHERE `red`=0");
	}





	
	public function getServerTime() {
		$this->output["time"] = iDB::value("SELECT UNIX_TIMESTAMP()");
	}	
	


	
	function __construct() {
		parent::__construct();
		
		$this->tlg = new Telegram( TELEGRAM_BOT_TOKEN );
	}		
	

	
	
}

