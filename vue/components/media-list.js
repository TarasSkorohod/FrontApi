"use strict";

Vue.component('media-list', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
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
			

		records() { 
			
			let res = [];

			this.$store.getters.records.forEach( (record, key) => {
				if ( !this.users_id || this.users_id == record.users_id ) {
					let row = Object.assign({}, record);
					
					let person = this.$store.getters.users.find( item => item.id == row.users_id);
					
					row.fromNow = moment( row.time_created ).fromNow();
					// row.avg_rate = Math.round( row.avg_rate );

					if ( person ) {
						row.avatar_person = person.avatar;
						row.avatar_src = FW.avatarSrc( person.avatar );
						row.name_person = person.name;
						
						let company = this.$store.getters.companies.find( item => item.id == person.companies_id );
						row.company_name = company.title;
					};
					
					res.push( row );
				};
			});


			res.sort( (a,b) => { return +a.avg_rate < +b.avg_rate });

			return res;
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
<div>
		<div class="mb-3 pt-2">
			<h6 class="mb-0">Список записів</h6>
			<span class="text-muted">Список записів усіх виконавців</span>
		</div>


		<div v-if=" role == 'public' " class="row">
			<div v-for=" rec in records " class="col-xl-3 col-sm-6">
				<v-media 
					:src=" rec.avatar_src " 
					:title=" rec.title "
					:company=" rec.company_name "
					:fromNow=" rec.fromNow "
					:rate=" rec.avg_rate "
				></v-media>
			</div>
		</div>

		<div v-else-if=" role == 'customer' " class="row">
			<div v-for=" rec in records " class="col-xl-3 col-sm-6">
				<router-link :to=" '/records-edit/' + rec.id ">
					<v-media 
						:src=" rec.avatar_src " 
						:title=" rec.title "
						:company=" rec.company_name "
						:fromNow=" rec.fromNow "
						:rate=" rec.avg_rate "
					></v-media>
				</router-link>
			</div>
		</div>


</div>



`
});


