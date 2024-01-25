const Delphi = {
	 
	checkSelectedIds() {	
		let checked_count = $('.delphi-id:visible:checked').length;
	
		if ( $('#delphi-id-count-selected') ) $('#delphi-id-count-selected').val( checked_count );
		if ( checked_count == 0 ) $('.delphi-btn-rows-change').addClass("disabled"); else $('.delphi-btn-rows-change').removeClass("disabled");
	 },
	 
	 
	 
	dt: {
		render: {
			id( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				else return `
					<div class="d-flex">
						<input type="checkbox" class="mr-1 delphi-id" data-id="${row.id}"/>
						<span>${data}</span>
					</div>				
				`;	
			},			

			cell( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				else {
					if ( data === null ) data = "";
					return `<div data-id="${row.id}" data-fw-push="">${data}</div>`;	
				}
			},
			
			date( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				
				if ( !moment(data).isValid() ) return `<div data-id="${row.id}" data-fw-push="">&nbsp;</div>`;	
				
				let 
					formatter = new Intl.DateTimeFormat(),
					value = formatter.format( moment(data).toDate() );
				return `<div data-id="${row.id}" data-fw-push="">${value}</div>`;	
			},

			datetime( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				
				if ( !moment(data).isValid() ) return `<div data-id="${row.id}" data-fw-push="">&nbsp;</div>`;	
				
				let 
					formatter = new Intl.DateTimeFormat("default", {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',			
						hour: 'numeric',
						minute: 'numeric',			
					}),
					value = formatter.format( moment(data).toDate() );
				return `<div data-id="${row.id}" data-fw-push="">${value}</div>`;	
			},		


			fulltime( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				
				if ( !moment(data).isValid() ) return `<div data-id="${row.id}" data-fw-push="">&nbsp;</div>`;	
				
				let 
					formatter = new Intl.DateTimeFormat("default", {
						hour: 'numeric',
						minute: 'numeric',			
						second: 'numeric',			
					}),
					value = formatter.format( moment(data).toDate() );
				return `<div data-id="${row.id}" data-fw-push="">${value}</div>`;	
			},				
			
			fromNow( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				
				if ( !moment(data).isValid() ) return `<div data-id="${row.id}" data-fw-push="">&nbsp;</div>`;	
				
				let res = moment( data ).fromNow();
				return `<div data-id="${row.id}" data-fw-push="">${res}</div>`;	
			},			


			number( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				
				let 
					formatter = new Intl.NumberFormat(),
					value = formatter.format( data );
				return `<div data-id="${row.id}" data-fw-push="">${value}</div>`;	
			},
			
			avatar ( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				
				/*
				let src = "/images/default-avatar.png";
				
				//console.info( data );
				if ( data != "" ) {
					if ( data && data[0] && data[0].file ) src = data[0].file;	
					else {
						let res = JSON.parse( data );								
						if ( res && res[0] && res[0].file ) src = res[0].file;	
					};
				};
				*/
				
				let src = FW.avatarSrc( data );
				
				return `
					<a href="#" data-id="${row.id}" data-fw-push="">
						<img src="${src}" class="rounded-circle" width="40" height="40">
					</a>	`;	
			},			
			
			rate ( data, type, row, meta ) {	
				if ( type !== 'display' ) return data;
				
				let 
					bg = FW.getBgRate( data ),
					res = Number( data ).toFixed(1);
				
				
				
				return `<div style="margin: auto;width: 50%;" >
					<span data-fw-push="" class="badge rounded-pill ${bg}">${res}</span>
					</div>
				`;

			}

		}

	}		
	 
	 
 }
 
 
 
$(document).ready(function()  {

	$(document).on("change", ".delphi-id", function(e) {
		let 
			$this = $(this),
			row_id = +$this.attr("data-id"),
			checked = $this.prop( "checked");
			
		if ( checked ) $this.closest("tr").addClass("delphi-id-selected"); else $this.closest("tr").removeClass("delphi-id-selected");
		
		Delphi.checkSelectedIds();
	});
	
	
	$(document).on("click", "a[data-action=collapse]", function(e) {
		console.log("click");
		
		return false;
	});
	
	
	 
})