/*
	res = await FW.action.request( { email: this.email }, "post/user/register" );
	
	
*/


const FW = {
	
	utils: {
		capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}		
		
	},
	
	
	mutation: {
		
		patchById( state, data, entity, id_field = "id" ) {
			
			let row_index = state[ entity ].findIndex( item => { return item[ id_field ] == data[ id_field ] });
			if ( row_index === -1 ) {
				console.error( "${entity}[${id_field}=${data[ id_field ]}] item not found" );
				return false;
			};
			
			let row = state[ entity ][ row_index ];
			//console.info( data, entity );
			for ( let var_name in data ) {
				if ( var_name != id_field ) row[ var_name ] = data[ var_name ];
			};
			
			Vue.set( state[ entity ], row_index, row);
			
		},
		
		deleteById( state, data, entity, id_field = "id" ) {
		
			let row_index = state[ entity ].findIndex( item => { return item[ id_field ] == data[ id_field ] });
			if ( row_index === -1 ) {
				console.error( "${entity}[${id_field}=${data[ id_field ]}] item not found" );
				return false;
			};
			
			state[entity].splice( row_index, 1 ) 		
		},		
		
		post( state, data, entity ) {
			state[ entity ].push( data )
		},
		
		
		
	},
	
	
	
	action: {
		
		
		
		common( context, params, api_request, callback = "data", commit_name = undefined ) {
		
			var 
				api_method = api_request.trim().split('/', 1)[0],
				api_call = api_request.trim().replace( api_method + '/', ""),
				send_data = ( api_method == 'get' || api_method == 'delete' ) ? { params } : params;
				
			if ( commit_name === undefined ) commit_name = api_method + FW.utils.capitalizeFirstLetter( api_call );
			
			
			
			let api_call_name = "";
			api_call.split('/').forEach ( item => {
				api_call_name += FW.utils.capitalizeFirstLetter( item.trim() );
			});
			
			if ( api_method == "get" ) commit_name = "set" + FW.utils.capitalizeFirstLetter( api_call_name );
			
			return new Promise((resolve, reject) => {	
			
				axios[ api_method ]( api_call, send_data ).then(response => {
					if ( response.data.response === undefined ) { return resolve( response.data ) };
					if ( response.data.response.code == "401" ) { return resolve( 0 ) };
					
					if ( response.data.success ) {
						
						if ( response.data.messages ) {
							response.data.messages.forEach( item => { FW.awn.notification( item) });
						};						
						
						if (typeof callback === 'string' || callback instanceof String) {
						
							switch ( callback ) {
								case "data":
									context.commit( commit_name, response.data.data );	
								break;
								case "params":
									context.commit( commit_name, params );	
								break;
								default: console.error("Achtung!!!");	
							}
							
						};
						
						
						resolve(true);
					} else { 
						let err = response.data.errors[0];
						FW.awn.error( response.data.errors[0] );
						reject( new Error( err.name ) );
					};
				})	
				/*
				.catch(
					error => {
					console.error( error );
					reject(error)
					});
				*/
			})				
		
		
		},
		
		
		request( params, api_request ) {
		
			var 
				api_method = api_request.trim().split('/', 1)[0],
				api_call = api_request.trim().replace( api_method + '/', ""),
				send_data = ( api_method == 'get' || api_method == 'delete' ) ? { params } : params,
				awn = new AWN( {} );
				
			if ( api_method == "get" ) commit_name = "set" + FW.utils.capitalizeFirstLetter( api_call );
			
			return new Promise((resolve, reject) => {	
			
				axios[ api_method ]( api_call, send_data ).then(response => {
					if ( response.data.response === undefined ) { return resolve( response.data ) };
					if ( response.data.response.code == "401" ) { return resolve( 0 ) };

					if ( response.data.success ) {
						
						
						if ( response.data.messages ) {
							response.data.messages.forEach( item => { FW.awn.notification( item) });
						};
					
						resolve( response.data );
					} else { 
						let err = response.data.errors[0];
						FW.awn.error( response.data.errors[0] );
						resolve( response.data );
					};
				})//.catch(error => reject(error))		
			})				
		
		
		},		
		
	},
	
	
	awn: {
		
		notification( note ) {
			let 
				awn = new AWN({}), 
				options = { labels: {}, durations: {} },
				message = note.message ? note.message : " ";
			
			if ( note.name !== undefined  ) options.labels[ note.type ] = note.name;
			if ( note.duration !== undefined ) options.durations[ note.type ] = note.duration;
			
			awn[ note.type ]( message, options );	
		},

		error( note ) {
			let options = ( typeof note === 'string' || note instanceof String ) ? { message: note } : note; 
			options.type = "alert";
			FW.awn.notification( options );
		},	
		
		tip( note ) {
			let options = ( typeof note === 'string' || note instanceof String ) ? { message: note } : note; 
			options.type = "tip";
			FW.awn.notification( options );
		},	
		
		success( note ) {
			let options = ( typeof note === 'string' || note instanceof String ) ? { message: note } : note; 
			options.type = "success";
			FW.awn.notification( options );
		},	
		
		warning( note ) {
			let options = ( typeof note === 'string' || note instanceof String ) ? { message: note } : note; 
			options.type = "warning";
			FW.awn.notification( options );
		},	
		
		info( note ) {
			let options = ( typeof note === 'string' || note instanceof String ) ? { message: note } : note; 
			options.type = "info";
			FW.awn.notification( options );
		},		
	},	


	getBgRate( rate ) {

		if ( +rate == 0 ) return "bg-light text-body";
		else if ( +rate <= 2 ) return "bg-danger";
		else if (+rate <= 3.9 ) return "bg-warning";
		else if ( +rate <= 5 ) return "bg-info";
		else if ( +rate <= 6 ) return "bg-secondary";
		else return "bg-success";		
		
	},
	
	avatarSrc( avatar ) {

		let src = "/images/default-avatar.png";
			
		try {
			let res = JSON.parse( avatar );	
			if ( res && res[0] && res[0].file ) src = res[0].file;	
		} catch( e ) { 
			console.info( e );
		};		
		
		console.log( src );
		
		return src;
	},
	
	
	userRole( role ) {
		
		switch ( role ) {
			case "artist": return "Учасник конкурсу"; break;
			case "admin": return "Адміністратор"; break;
			case "jury": return "Член журі"; break;
			
			default: return "Unknown";	
		}		
		
	},
	
	/*
				if ( res.avatar != "" ) {
					if ( res.avatar[0] ) res.avatar = res.avatar[0]["file"];
					else { 
						res.avatar = JSON.parse( res.avatar );
						if ( res.avatar[0] ) res.avatar = res.avatar[0]["file"]; else res.avatar = "/images/default-avatar.png";
					} 
				} else res.avatar = "/images/default-avatar.png";	
	*/
};



	


$(document).ready(function()  {

	// <a data-fw-dispatch="deleteUser" data-id="1" data-fw-confirm="Are you sure you want to delete this?"
	
	$(document).on("click", "[data-fw-dispatch]", function(e) {
		let 
			$this = $(this),
			row_id = $this.attr("data-id"),
			dispatch_call = $this.attr("data-fw-dispatch");		
		
		if ( !dispatch_call ) console.error("> [data-fw-dispatch] not defined");
		if ( !row_id ) console.error("> [data-id] not defined");
		
		if ( $this.attr("data-fw-confirm") && confirm($this.attr("data-fw-confirm")) ) {
			store.dispatch( dispatch_call , { id: row_id} );
		};
		
		return false;
	});


	$(document).on("change", "input[data-fw-dispatch]", function(e) {
		let 
			$this = $(this),
			row_id = $this.attr("data-id"),
			dispatch_call = $this.attr("data-fw-dispatch");		
		
		if ( !dispatch_call ) console.error("> [data-fw-dispatch] not defined");
		if ( !row_id ) console.error("> [data-id] not defined");
		
		store.dispatch( dispatch_call , { note: $this.val(), id: row_id} );
		
		return false;
	});	
	
	// <a data-fw-push="users" data-id="1"
	
	$(document).on("click", "[data-fw-push]", function(e) {
		let 
			$this = $(this),
			row_id = $this.attr("data-id"),
			push_path = $this.attr("data-fw-push");

		if ( !push_path ) console.error("> [data-fw-push] not defined");
		
		if ( row_id ) push_path = push_path + '/' + row_id;
		
		router.push({path: push_path });
		return false;
	});
	

	$(document).on("click", ".save-button", function(e) {
		let awn = new AWN({});
		awn.success( "Dane zostały pomyślnie zapisane" );
	});


	$(document).on("click", ".dispatch_change_status_id", function(e) {
		let 
			$this = $(this),
			row_id = $this.attr("data-id"),
			dispatch_call = "patchDevices";		
		
		if ( !row_id ) console.error("> [data-id] not defined");
		store.dispatch( dispatch_call , { id: row_id, status_id: $this.attr("data-status-id")} );
		
		return false;
	});	
	
	

	
	
	// клик по сектору в верхней части
	$(document).on("click", ".sector-alarm-wrapper", function(e) {	
		var 
			sector_id = $( this ).attr("data-sector-id"),
			$targer_sector_id = $(`.sector-device-list[data-sector-id=${sector_id}]`);
			
		$targer_sector_id.get(0).scrollIntoView({behavior: 'smooth'});
	});	

	// клик по девайсу в верхней части
	$(document).on("click", ".device-alarm-wrapper", function(e) {	
		var 
			device_id = $( this ).attr("data-device-id"),
			$targer_sector_id = $(`.device-one-list[data-device-id=${device_id}]`);
			
		$targer_sector_id.get(0).scrollIntoView({behavior: 'smooth'});
	});	
	

	
});