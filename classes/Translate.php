<?php

class Translate {
	static $lang = null;
	static $def_lang = "ru";
	
	static function me( $key, $args = [], $lang = null ) {
	
		$lang = is_null( $lang ) ? self::$lang : $lang;
		if ( is_null( $lang ) ) $lang = self::$def_lang;
	
		$row = iDB::row_assoc( "SELECT * FROM translate WHERE `key`=" . iS::sq( $key ) );
		if ( is_null( $row ) ) return "``` no key = \"{$key}\" ```";
	
		$format = !empty( $row[ $lang ] ) ? $row[ $lang ] : $row[ self::$def_lang ];
		if ( empty( $format ) ) return "``` no lang = \"{$key}\" ```";
		
		return empty($args) ? $format : vsprintf( $format, $args );
	}
	
}