
const utils = {
	
	vars: {
		fn_export: "Example",
	},
	tables: {},
	render: {
		
		datetime( data, type, row, meta ) {	
			if ( type !== 'display' ) return data;
			
			let 
				mom_time = moment( data ).format('HH:mm'),
				mom_date = moment( data ).format('DD.MM.YYYY');
			
			return `
				<div class="d-block">
					${mom_time}
					<div class="text-shades-2 fs-10">${mom_date}</div>
				</div>				
			`;	
		},			

		
		
		// $(row).attr( "data-id", data.id ).attr("data-fw-push", "/'. $comp["table"]["entity"] .'-edit");
		
	},
	
	check_required_params( params, data ) {	
		
		let res = true;
		
		params.forEach( ( param_name ) => {
			if ( data[ param_name ] === undefined ) {
				console.error( `${param_name} is required` );
				res = false;
			}
		});
	
		return res;
	},
	
	
};










const datatable_scheme = {
	columnDefs: [],
	//stateSave: true,
	responsive: true,
	autoWidth: false,
	
	/*
	"bStateSave": true,
	"fnStateSave": function (oSettings, oData) {
		localStorage.setItem('offersDataTables', JSON.stringify(oData));
	},
	"fnStateLoad": function (oSettings) {
		return JSON.parse(localStorage.getItem('offersDataTables'));
	},	
	*/

	buttons: {            
		/*
		dom: {
			button: {
				className: 'btn btn-light'
			}
		},
		*/
		buttons: [
		
		{
			extend: 'print',
			text: '<i class="ph-printer"></i>',
			className: 'btn btn-primary',
			//messageTop: 'This is a custom message added in configuration.',
			exportOptions: { orthogonal: "export" },
		},
		{
			extend: 'excel',
			text: '<i class="ph-file-xls"></i>',
			className: 'btn btn-success',
			
			exportOptions: { orthogonal: "export" },
		},				
		{
			extend: 'pdf',
			text: '<i class="ph-file-pdf "></i>',
			className: 'btn btn-warning',
			exportOptions: { orthogonal: "export" },
		},				
		]
	},
	

	//dom: '<"datatable-header justify-content-start"f<"ms-sm-auto"l><"ms-sm-3"B>><"datatable-scroll-wrap"t><"datatable-footer"ip>',
	dom: '<"datatable-header"flB><"datatable-scroll-wrap"t><"datatable-footer"ip>',
};



$(document).ready(function()  {
	$.extend( $.fn.dataTable.defaults, datatable_scheme );
})



