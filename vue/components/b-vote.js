"use strict";

// id, records_id, text, rate, users_id, time_created

Vue.component('b-vote', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		records_id: { required: true },
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			rates: { records_id: this.records_id  },
			server_response: "wait",
			method: "post",
		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		

	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
	
		async saveForm() {
			let data_send = Object.assign({}, this.rates);
			data_send.records_id = this.records_id;
			
			if ( this.method == 'patch' && this.rates.id ) data_send.id = this.rates.id;
			
			
			let response = await FW.action.request( data_send, this.method + "/rates" );
			
			this.$store.commit( "patchRecords", response.data.records );
			this.$store.commit( this.method + "Rates", response.data.rates );
			
			// console.info( response.data );
			
			this.method = "patch";
			
			// console.info( this.rates , this.server_response, this.method );
		},
	
	},	
	
	async created() {

			if ( this.records_id === undefined ) return false;

			let res = await FW.action.request( { records_id: this.records_id}, "get/rate" );
			if ( res.success && res.data ) {
			
				if ( res.data.rates ) {
					this.rates = res.data.rates;
					
					this.server_response = "success";
					if ( this.rates.id != undefined ) this.method = "patch";
					
				//	console.info( res.data.rates, this.method );
				};
				
			} else this.server_response = "fail";
	},	
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `


			<div v-if=" rates && server_response == 'success' " class="card" style="width: 100%">
				<div class="card-header d-flex py-0">
					<h6 class="py-3 mb-0">Госування та коментар</h6>
					<div class="d-inline-flex align-items-center ms-auto">
				
					</div>
				</div>		
		
				<div class="card-body">
					<form @submit.prevent="saveForm" id="saveForm">

						<div class="row mb-3">
							<label class="col-lg-3 col-form-label"><span class='form-asterics'>*</span>Оцiнка:</label>
							<div class="col-lg-9">
							
							<!-- де 1 - відстій, 4-5 - відповідає очікуванням клієнта, а 6-7 - WOW-обслуговування -->
							
								<select class = 'form-control' id = 'comment_rate_element' v-model = 'rates.rate' required>
									<option value="1">1 - Відстій</option>
									<option value="2">2 - Погано</option>
									<option value="3">3 - Скорiш за все - нi</option>
									<option value="4">4 - Відповідає, але можна краще</option>
									<option value="5">5 - Відповідає очікуванням клієнта</option>
									<option value="6">6 - WOW-обслуговування</option>
									<option value="7">7 - Найкраще-обслуговування</option>
								
								
								
								</select>
							</div>
						</div>

						<div class="row mb-3">
							<label class="col-lg-3 col-form-label">Коментар:</label>
							<div class="col-lg-9">
								<textarea style="min-height: 150px" type = 'text' class = 'form-control' id = 'comment_text_element' v-model = 'rates.text'  ></textarea>
							</div>
						</div>		
						
						<hr class="mt-4 mb-4"/>
						
						<div class="row mb-3">
							<div class="col-lg-12 text-end">
								<button class="btn btn-success btn-labeled btn-labeled-start">
									<span class="btn-labeled-icon bg-black bg-opacity-20"><i class="ph-check-circle"></i></span>
									Зберегти
								</button>						
							</div>	
						</div>
					</form>
				</div>
			</div>


	

`
});


