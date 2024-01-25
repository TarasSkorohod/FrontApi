<?php

class Alert {
	
	
	static function mail( $subject, $body, $email ) {

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
	
	
	static function tlg( $chats_id, $text ) {
		
		$tlg = new Telegram( TELEGRAM_BOT_TOKEN );
		
		$tlg->sendText( $text, $chats_id );
	}	
	
	
	static function tlgTmpl( $chats_id, $tmpl_key, $args = [] ) {
		
		$tlg = new Telegram( TELEGRAM_BOT_TOKEN );
		
		$tmpl_lang = iDB::value( "SELECT lang FROM chats WHERE uid=" . iS::sq($chats_id) );
		$text = $tlg->tmpl( $tmpl_key, $tmpl_lang, $args );
		
		$tlg->sendText( $text, $chats_id );
	}	
	
	
	static function admin( $tmpl_key, $args = [], $subject = null ) {
		
		$tlg = new Telegram( TELEGRAM_BOT_TOKEN );
		
		$chats_ids = iDB::rows_assoc( "SELECT C.uid, C.lang, U.id as users_id, U.email FROM users U LEFT JOIN chats C ON ( U.chats_id=C.id) WHERE U.send_messages=1", [] );
		
		foreach ( $chats_ids as $chat ) {
			$text = $tlg->tmpl( $tmpl_key, $chat["lang"], $args );
			
			// если нет телеграма, то отправляем на мыло
			if ( is_null( $chat["uid"] ) ) {
			
				if ( is_null( $subject ) ) $subject = "Службове повідомлення";
				self::mail( $subject, $text,  $chat["email"] );			
			
			} else {
				
				$tlg->sendText( $text, $chat["uid"] );
			}
		}		
		
	}
	
	
	static function partner( $tmpl_key, $args = [], $subject = null ) {
		
		$tlg = new Telegram( TELEGRAM_BOT_TOKEN );
		
		$chats_ids = iDB::rows_assoc( "SELECT C.uid, C.lang, U.id as users_id, U.email FROM companies U LEFT JOIN chats C ON ( U.chats_id=C.id) WHERE U.send_messages=1", [] );
		
		foreach ( $chats_ids as $chat ) {
			$text = $tlg->tmpl( $tmpl_key, $chat["lang"], $args );
			
			// если нет телеграма, то отправляем на мыло
			if ( is_null( $chat["uid"] ) ) {
			
				if ( is_null( $subject ) ) $subject = "Powiadomienie";
				self::mail( $subject, $text,  $chat["email"] );			
			
			} else {
				
				$tlg->sendText( $text, $chat["uid"] );
			}
		}		
		
	}	
	
	
	
}