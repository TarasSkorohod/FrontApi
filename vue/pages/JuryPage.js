"use strict";

const JuryPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {

		}		
	},	
	
	computed: {
		
		jury() {
			
			return this.$store.getters.users.filter( item => item.role == 'jury');
		},
		
		def_table_jury() {  
			//let shop_host = this.shop_host;
			let def = {	
				columnDefs: [
					{"name": "id", "title": "№", "width": "1%", "render": Delphi.dt.render.cell},
					{"name": "avatar", "title": "Фото", "width": "1%", "render": Delphi.dt.render.avatar },	
					{"name": "name", "title": "Ім'я та прізвище", "render": Delphi.dt.render.cell},
					{"name": "email", "title": "Email", "render": Delphi.dt.render.cell},
					{"name": "address", "title": "Адреса", "render": Delphi.dt.render.cell},
					
					{"name": "phone", "title": "Телефон", "render": Delphi.dt.render.cell},

				],
				"order": [[ 0, "desc" ]],
				createdRow: function( row, data, dataIndex ) {
					$(row).find("[data-fw-push]").attr("data-fw-push", "/jury-edit");
					// $(row).attr( "data-role", data.role );
				},
			};
			
			return def;
		},			
	
	},
	
	methods: {
	

	
		
	},
	
	mounted() {
		

	},

	template: `	
<div>
	

	<div class="row">
		<div class="col-xl-12">


			<div class="card" style="width: 100%">

				<div class="card-header d-flex py-0">
					<h6 class="py-3 mb-0">Компанії</h6>
					<div class="d-inline-flex align-items-center ms-auto">
							<button type="button" class="btn btn-primary" data-fw-push="jury-add">
								<i class="ph-user me-2"></i>
								Додати
							</button>
					</div>
				</div>


				<div class="card-body">
						<v-datatable
							id = "table_jury"
							entity = "jury"
							:value = "jury"
							:def = "def_table_jury"
						></v-datatable>
					
				</div>
			</div>		

		
		
		</div>
		
		
		
	</div>	
</div>
	`
	
};