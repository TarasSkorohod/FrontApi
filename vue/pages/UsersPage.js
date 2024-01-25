"use strict";

const UsersPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {
			msg_type: "",
			msg_title: "",
			msg_text: "",
		}
	},	
	
	computed: {
		
		curr_companies() {	return  this.$store.getters["company"]  },

		def_table_users() {  
			let def = {
				columnDefs: [
					{"name": "id", "title": "№", "width": "1%" },
					{"name": "companies_id", "title": "Nazwa", "render": function( data, type, row, meta ) { 
 							let value = store.getters.companies.find( item => item.id == data );
							if ( value ) return `<div data-id="${row.id}" data-fw-push="">${value.title}</div>`;	
							else return `<div data-id="${row.id}" data-fw-push=""></div>`;	 
 						}, 
	},
					{"name": "agreement_date", "title": "Ważna umowa", "render": Delphi.dt.render.datetime},
					{"name": "price", "title": "Cena.", "render": Delphi.dt.render.number},
					{"name": "shipment_date", "title": "Data wysyłki", "render": Delphi.dt.render.datetime},
					{"name": "payment_date", "title": "Data płatności", "render": Delphi.dt.render.datetime},
				],
				"order": [[ 0, "desc" ]],
				createdRow: function( row, data, dataIndex ) {
					//$(row).find("[data-fw-push]").attr("data-fw-push", "/users-edit");
					//console.info( row, data, dataIndex );
					// $(row).attr( "data-role", data.role );
				},
			};
			
			return def;
		}
	},
	
	methods: {
	
		sendMessage() {
			
			new AWN().success('Dziękujemy za odpowiedź', {durations: {success: 0}});
			FW.action.request( { type: this.msg_type, title: this.msg_title, text: this.msg_text,  }, "post/message" );
			
			this.msg_type = "";
			this.msg_title = "";
			this.msg_text = "";			
		},
	
		
	},
	
	mounted() {
		

	},

	template: `	
<div>

	<div v-if="$store.getters.users" class="card">
		<div class="card-header d-flex align-items-center">
			<h5 class="mb-0">Faktury</h5>
		</div>
		<div class="card-body">	
			<v-datatable
				id = "users_table"
				entity = "users"
				:value = "$store.getters.users"
				:def = "def_table_users"
			></v-datatable>		
		</div>
	</div>



</div>
	`
	
};
