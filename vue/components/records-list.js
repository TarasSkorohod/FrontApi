"use strict";

Vue.component('records-list', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			page_title: "",
		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		
		
		
		account() { return this.$store.getters["account/data"] },
		role() { return this.$store.getters["account/role"];},
		
		users_id() { return this.role == 'artist' ? this.account.id : undefined },

		records() { 
			
			let res = [];
			
			// users_id
			
			this.$store.getters.records.forEach( (record, key) => {
				if ( !this.users_id || this.users_id == record.users_id ) {
					let row = Object.assign({}, record);
					
					let person = this.$store.getters.users.find( item => item.id == row.users_id);

					if ( person ) {
						row.companies_id = person.companies_id;
						row.avatar_person = person.avatar;
						row.name_person = person.name;
					};
					
					res.push( row );
				};
			});

			return res;
		},
		
		def_table_records() {  

			let def = {	
				columnDefs: [
					{"name": "id", "title": "№", "width": "1%", "render": Delphi.dt.render.cell},
					{"name": "title", "title": "Назва", "render": Delphi.dt.render.cell},
					{"name": "avatar_person", "title": "Фото", "width": "1%", "render": Delphi.dt.render.avatar },
					{"name": "companies_id", "title": "Ім'я та прізвище", "render": function ( data, type, row, meta ) {	
							if ( type !== 'display' ) return data;
							
							let res = `<span data-id="${row.id}" data-fw-push="" class="d-block fw-semibold">${row.name_person}</span>`;
							
							let company = store.getters.companies.find( item => item.id == data );
							if ( company ) res += `<a href="${company.domain}" target="_blank"><span class="fs-sm">${company.title}</span></a>`;
							
							return res;	
						},
					},	
					
					{"name": "votes_count", "width": "1%", "title": "Голосiв", "render": Delphi.dt.render.cell},
					{"name": "avg_rate", "title": "Оцiнка", "render": Delphi.dt.render.rate},
					

					{"name": "time_record", "title": "Час дзвiнку", "render": Delphi.dt.render.fromNow},
					{"name": "files_count", "width": "1%", "title": "Файлiв", "render": Delphi.dt.render.cell},
					{"name": "time_created", "title": "Створено", "render": Delphi.dt.render.fromNow},
					
				],
				"order": [[ 0, "desc" ]],
				createdRow: function( row, data, dataIndex ) {
					$(row).find("[data-fw-push]").attr("data-fw-push", "/records-edit");
					//console.info( row, data );
					
					// $(row).attr( "data-role", data.role );
				},
			};
			
			return def;
		},	
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {},	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				mounted
	mounted() {
		
		if ( this.role == 'artist' ) {
			this.$store.commit("setPageTitle", "Мої записи" );
			this.page_title = "Мої записи";
		} else {
			this.page_title = "Записи учасникiв";
		}
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				watch
	watch: {},	
	

	template: `			
<page-wrapper :roles=" ['admin', 'jury', 'artist', 'customer'] ">
	

	<div class="row">
		<div class="col-xl-12">


			<div class="card" style="width: 100%">

				<div class="card-header d-flex py-0">
					<h6 class="py-3 mb-0">{{page_title}}</h6>
					<div class="d-inline-flex align-items-center ms-auto">

							<button v-if=" role == 'artist' " type="button" class="btn btn-primary" :data-fw-push=" 'records-add/' + account.id ">
								<i class="ph-user me-2"></i>
								Додати
							</button>

					</div>
				</div>


				<div class="card-body">
						<v-datatable
							id = "table_records"
							entity = "records"
							:value = "records"
							:def = "def_table_records"
						></v-datatable>
					
				</div>
			</div>		

		
		
		</div>
		
		
		
	</div>	
</page-wrapper>

`
});


