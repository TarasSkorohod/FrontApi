"use strict";

Vue.component('last-rates', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		//users_id: {},
		records_id: {},
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {

		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		
		
		rates() { return this.$store.getters.rates },
		users() { return this.$store.getters.users },
		record() { return this.$store.getters.records.find( item => item.id === this.records_id )},
		role() { return this.$store.getters["account/data"] ? this.$store.getters["account/data"]["role"] : undefined },

		last_rates() {
			
			let res = [];
			let total_rates = 0;
			
			this.rates.forEach( rate => {
			
				if ( this.records_id == rate.records_id && total_rates <= 7 ) {
					total_rates++;
					let row = Object.assign({}, this.users.find( user => user.id == rate.users_id ));
					
					if ( row && row.avatar != "" ) {
						row.avatar = JSON.parse( row.avatar ); 
						row.avatar = row.avatar && row.avatar[0] && row.avatar[0].file ? row.avatar[0].file : "/images/default-avatar.png";					
					} else row.avatar = "/images/default-avatar.png";
					
					row.rate = rate;

					row["rate_bg"] = FW.getBgRate( rate.rate );
					row.rate.fromNow = moment( row.rate.time_created ).fromNow();

					
					
					res.push( row );
				};
			});
	
			res.sort((a,b) => { return a.time_created > b.time_created });
			
			return res;
		},		

	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
	},	
	
	mounted() {
		

	},
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
	
	<div v-if="last_rates && last_rates.length > 0 " class="card">
		<div class="sidebar-section-header d-flex border-bottom">
			
			<!--
			<span v-if="users_id" class="fw-semibold">Останні оцінки цього учасника</span>
			<span v-else class="fw-semibold">Останні оцінки цього запису</span>
			-->
			<span class="fw-semibold">Останні оцінки цього запису</span>
			<!--
			<div class="ms-auto">
				<span class="badge bg-success rounded-pill">{{rate}}</span>
			</div>
			-->
		</div>

		<div class="sidebar-section-body">
		
		
		
			<div  v-for=" rate in last_rates " class="d-flex align-items-start mb-4">
				<div class="me-3 position-relative">
					<img :src=" rate.avatar " class="rounded-circle" width="40" height="40" alt="">
					<span class="badge position-absolute top-0 start-100 translate-middle rounded-pill" :class="rate.rate_bg">{{rate.rate.rate}}</span>
				</div>

				<div class="flex-fill">
					<div class="d-flex justify-content-between align-items-center">
						<div class="fw-semibold">
							<router-link v-if=" role == 'admin' " :to=" '/rates-edit/' + rate.rate.id ">{{rate.name}}</router-link>
							<span v-else>{{rate.name}}</span>
						</div>
					</div>
					<div v-if=" rate.rate.text != '' ">
					«{{rate.rate.text}}»
					</div>
					<span class="fs-sm text-muted">{{rate.rate.fromNow}}</span>					
				</div>
			</div>		
		
		</div>

		<div class="card-footer d-flex justify-content-between align-items-center py-2">
			<!--
			<a href="#" class="text-body">All users</a>

			<div>
				<a href="#" class="text-body" data-bs-popup="tooltip" title="Conference room">
					<i class="ph-chats"></i>
				</a>
				<a href="#" class="text-body ms-2" data-bs-popup="tooltip" title="Settings">
					<i class="ph-gear"></i>
				</a>
			</div>
			-->
		</div>
	</div>		

`
});


