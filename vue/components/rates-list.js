"use strict";

Vue.component('rates-list', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		records_id: {},
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {

		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		
		role() { return this.$store.getters.role },
		crole() {  return this.$store.getters.crole },
			
			
		rates() {
			
			let res = this.$store.getters.rates.filter ( item => !this.records_id || +this.records_id == +item.records_id  ).map( rate => {
					
				let user = this.$store.getters.users.find( user => user.id == rate.users_id );
				
				rate.jury = user;
				rate.jury_name = user.name;
				
				let 
					record = this.$store.getters.records.find( record => record.id == rate.records_id ),
					artist = this.$store.getters.users.find( user => user.id == record.users_id ),
					company = this.$store.getters.companies.find( company => company.id == artist.companies_id );
					
				rate.artist = artist;
				rate.artist_name = artist.name;
				
				rate.record_name = record.title;
				rate.company_name = company.title;
				
				
				return rate;
			});			

			
			
			return res;
		},
		
		def_table_rates() {  

			var self = this;

			let def = {	
				columnDefs: [
					{"name": "id", "title": "№", "width": "1%", "render": Delphi.dt.render.cell},

					{"name": "artist_name", "title": "Учасник", "render": function ( data, type, row, meta ) {	
							if ( type !== 'display' ) return data;
							
							let 
								src = FW.avatarSrc( row.artist.avatar );
							
							// /artist-edit/${row.artist.id}	
							return `

								<div class="d-flex align-items-center">
									<a href="#" class="d-inline-block me-3" data-fw-push = "">
										<img src="${src}" class="rounded-circle" width="40" height="40" alt="">
									</a>
									<div>
										<a href="#" class="text-body fw-semibold" data-fw-push = "">${data}</a>
										<div class="text-muted fs-sm">${row.company_name}</div>
									</div>
								</div>					
							`;
						},
					},
					
					{"name": "record_name", "title": "Запис", "render": Delphi.dt.render.cell},
					
					
					{"name": "rate", "title": "Оцiнка", "render": Delphi.dt.render.rate},
					{"name": "text", "title": "Коментар", "render": Delphi.dt.render.cell},
			
					
					{"name": "jury_name", "title": "Журі", "render": function ( data, type, row, meta ) {	
							if ( type !== 'display' ) return data;
							
							let 
								src = FW.avatarSrc( row.jury.avatar ),
								role = FW.userRole( row.jury.role );
								
							// /jury-edit/${row.jury.id}	
								
							return `

								<div class="d-flex align-items-center">
									<a href="#" class="d-inline-block me-3" data-fw-push = "">
										<img src="${src}" class="rounded-circle" width="40" height="40" alt="">
									</a>
									<div>
										<a href="#" class="text-body fw-semibold" data-fw-push = "">${data}</a>
										<div class="text-muted fs-sm">${role}</div>
									</div>
								</div>					
							`;
						},
					},		

					{"name": "time_created", "title": "Коли", "render": Delphi.dt.render.fromNow},					

				],
				"order": [[ 0, "desc" ]],
				createdRow: function( row, data, dataIndex ) {				

					
					if ( ["admin", "jury"].includes( self.crole ) ) $(row).find("[data-fw-push='']").attr("data-fw-push", '/records-edit' ).attr("data-id", data.records_id );
					else $(row).find("[data-fw-push='']").removeAttr("data-fw-push");

				},
			};
			
			return def;
		},			
			
	
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {},	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				mounted
	mounted() {
		

		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				watch
	watch: {},	
	

	template: `			

<div v-if="crole">
	

	<div class="row">
		<div class="col-xl-12">


			<div class="card" style="width: 100%">

				<div class="card-header d-flex py-0">
					<h6 class="py-3 mb-0">Оцiнки та кометарi</h6>
					<!--
					<div class="d-inline-flex align-items-center ms-auto">
							<button type="button" class="btn btn-primary" data-fw-push="rates-add">
								<i class="ph-user me-2"></i>
								Додати
							</button>
					</div>
					-->
				</div>


				<div class="card-body">
						<v-datatable
							id = "table_rates_list"
							entity = "rates"
							:value = "rates"
							:def = "def_table_rates"
						></v-datatable>
					
				</div>
			</div>		

		
		
		</div>
		
		
		
	</div>	
</div>



`
});


