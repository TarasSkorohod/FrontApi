"use strict";

const ArtistsPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {

		}		
	},	
	
	computed: {
		
		artist() {
			
			return this.$store.getters.users.filter( item => item.role == 'artist');
		},
		
		def_table_artist() {  

			let def = {	
				columnDefs: [
					{"name": "id", "title": "№", "width": "1%", "render": Delphi.dt.render.cell},
					{"name": "avatar", "title": "Фото", "width": "1%", "render": Delphi.dt.render.avatar },	
					{"name": "name", "title": "Ім'я та прізвище", "render": Delphi.dt.render.cell},
					{"name": "companies_id", "title": "Компанiя", "render": function ( data, type, row, meta ) {	
							if ( type !== 'display' ) return data;
							
							let company = store.getters.companies.find( item => item.id == data );
							if ( company ) return `<a target="_blank" href="${company.domain}">${company.title}</a>`;
							else return "";

						},
					},						
					{"name": "email", "title": "Email", "render": Delphi.dt.render.cell},
					{"name": "address", "title": "Адреса", "render": Delphi.dt.render.cell},
					{"name": "phone", "title": "Телефон", "render": Delphi.dt.render.cell},
					{"name": "id", "title": "Запис", "render": function ( data, type, row, meta ) {	
							return `<div class="text-center">
								<a class="icon-records-add" href="#"><i class="ph-headset"></i></a>
								</div>`;
						},
					},						


// $(row).find("[data-fw-push]").attr("data-fw-push", "/artist-edit");

				],
				"order": [[ 0, "desc" ]],
				createdRow: function( row, data, dataIndex ) {
					$(row).find("[data-fw-push]").attr("data-fw-push", "/artist-edit");
					$(row).find(".icon-records-add").attr("data-fw-push", "/records-add/" + data.id);
					//console.info( row, data );
					
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
							<button type="button" class="btn btn-primary" data-fw-push="artist-add">
								<i class="ph-user me-2"></i>
								Додати
							</button>
					</div>
				</div>


				<div class="card-body">
						<v-datatable
							id = "table_artist"
							entity = "artist"
							:value = "artist"
							:def = "def_table_artist"
						></v-datatable>
					
				</div>
			</div>		

		
		
		</div>
		
		
		
	</div>	
</div>
	`
	
};