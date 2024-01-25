"use strict";

const CompaniesPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {

		}		
	},	
	
	computed: {
		
		companies() {
			
			return this.$store.getters.companies;
		},
		
		def_table_companies() {  
			//let shop_host = this.shop_host;
			let def = {	
				columnDefs: [
					{"name": "id", "title": "№", "width": "1%", "render": Delphi.dt.render.cell},
					{"name": "avatar", "title": "Фото", "width": "1%", "render": Delphi.dt.render.avatar },	
					{"name": "title", "title": "Назва", "render": function ( data, type, row, meta ) {	
							if ( type !== 'display' ) return data;
							return `
								<a href="#" data-id="${row.id}" data-fw-push="" class="d-block fw-semibold">${data}</a>
								<a href="${row.domain}" target="_blank"><span class="fs-sm text-muted">URL: ${row.domain}</span></a>								
								`;	
						},
					},					
					
					{"name": "head", "title": "Голова", "render": Delphi.dt.render.cell},
					{"name": "address", "title": "Адреса", "render": Delphi.dt.render.cell},
					{"name": "email", "title": "Email", "render": Delphi.dt.render.cell},
					{"name": "phone", "title": "Телефон", "render": Delphi.dt.render.cell},

				],
				"order": [[ 0, "desc" ]],
				createdRow: function( row, data, dataIndex ) {
					$(row).find("[data-fw-push]").attr("data-fw-push", "/companies-edit");
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
							<button type="button" class="btn btn-primary" data-fw-push="companies-add">
								<i class="ph-user me-2"></i>
								Додати
							</button>
					</div>
				</div>


				<div class="card-body">
						<v-datatable
							id = "table_companies"
							entity = "companies"
							:value = "companies"
							:def = "def_table_companies"
						></v-datatable>
					
				</div>
			</div>		

		
		
		</div>
		
		
		
	</div>	
</div>
	`
	
};