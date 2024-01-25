"use strict";

const CompaniesPostPage = {
	
	mixins: [globalMixin],
	props: ['method'],
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data	
	data: function () {
		return {
			curr_companies: undefined,
			modifications_author: undefined,
			server_response: "wait",
		}
	},	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed	
	computed: {
		item_id() { return this.$route.params.item_id; },
		account() { return this.$store.getters["account/data"] },	

	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods	
	methods: {
		saveForm() {
			let data_send = Object.assign({}, this.curr_companies);
			data_send.avatar = JSON.stringify( data_send.avatar );

			// console.info(  this.curr_companies, data_send );
			
			this.$store.dispatch( this.method + "Companies", data_send );
			this.back();
		},	
		
		back() {
			// window.location.replace("/");
			// router.go(-1);			
			router.push('/companies');
		},
		
		remove() { 
			if ( confirm( 'Ви впевнені, що хочете видалити ці рядки?' )) {
				this.$store.dispatch("deleteCompanies", { id: this.item_id});
				this.back();
			}
		},
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				created	
	async created() {

		if ( this.method == "post" ) {
			this.curr_companies = { avatar: "" };
			this.server_response = "success";
		} else {
		
			let res = await FW.action.request( { id: this.item_id}, "get/companies" );
			if ( res.success && res.data ) {
			
				if ( res.data.companies ) {
					this.curr_companies = res.data.companies;
					if ( this.curr_companies.avatar != "" ) this.curr_companies.avatar = JSON.parse( this.curr_companies.avatar );
					this.server_response = "success";
				};
				
				if ( res.data.modifications_author ) {
					this.modifications_author = res.data.modifications_author;
				};
				
				
			} else {
				this.server_response = "fail";
			}
			
		}
	},


	template: `
<div class="card">

	<div  v-if="curr_companies" class="card-header d-flex py-0">
		<h6 v-if= " method == 'post' " class="py-3 mb-0">Додати компанiю</h6>
		<h6 v-else class="py-3 mb-0">Редагувати компанiю</h6>
		
		<div class="d-inline-flex align-items-center ms-auto">


			<button v-if=" method=='patch' " @click.prevent="remove" type="button" class="btn btn-danger btn-labeled btn-labeled-start">
				<span class="btn-labeled-icon bg-black bg-opacity-20"><i class="ph-x-circle"></i></span>
				Видалити 
			</button>	

			
			<button @click.prevent="back" type="button" class="btn btn-light btn-labeled btn-labeled-start mx-2">
				<span class="btn-labeled-icon bg-black bg-opacity-20"><i class="ph-arrow-counter-clockwise "></i></span>
				Закрити
			</button>	

			<button v-if=" method == 'post' " class="btn btn-success btn-labeled btn-labeled-start" form="saveFormCompanies">
				<span class="btn-labeled-icon bg-black bg-opacity-20"><i class="ph-check-circle"></i></span>
				Зберегти
			</button>	
			<button v-else class="btn btn-success btn-labeled btn-labeled-start" form="saveFormCompanies">
				<span class="btn-labeled-icon bg-black bg-opacity-20"><i class="ph-check-circle"></i></span>
				Зберегти
			</button>	
			
		</div>
	</div>

	<div v-if="curr_companies" class="card-body">
		<form @submit.prevent="saveForm" id="saveFormCompanies">
		
			<fieldset>
				<legend class="fs-base fw-bold border-bottom pb-2 mb-3  mt-4">Основна інформація</legend>
			
				<div class="row mb-3">
				
					<div class="col-lg-2">
						<avatar-inno-uploader id = 'uploads_id_element' v-model = 'curr_companies.avatar' ></avatar-inno-uploader>
					</div>
					
					<div class="col-lg-10">
					
						<div class="row mb-3">
							<label class="col-lg-3 col-form-label"><span class='form-asterics'>*</span>Назва:</label>
							<div class="col-lg-9">
								<input type = 'text' class = 'form-control' id = 'title_element' v-model = 'curr_companies.title' required />
							</div>
						</div>	

						<div class="row mb-3">
							<label class="col-lg-3 col-form-label">Голова:</label>
							<div class="col-lg-9">
								<input type = 'text' class = 'form-control' id = 'title_element' v-model = 'curr_companies.head' />
							</div>
						</div>	

					</div>

				</div>	
			</fieldset>
			
			<fieldset>
				<legend class="fs-base fw-bold border-bottom pb-2 mb-3  mt-4">Додатково</legend>
			

				<div class="row mb-3">
					<label class="col-lg-3 col-form-label">URL:</label>
					<div class="col-lg-9">
						<input type = 'url' class = 'form-control' id = 'domain_element' v-model = 'curr_companies.domain' />
					</div>
				</div>
		
				<div class="row mb-3">
					<label class="col-lg-3 col-form-label">Телефон:</label>
					<div class="col-lg-9">
						<input type = 'phone' class = 'form-control' id = 'phone_element' v-model = 'curr_companies.phone' />
					</div>
				</div>	
				
				<div class="row mb-3">
					<label class="col-lg-3 col-form-label">Email:</label>
					<div class="col-lg-9">
						<input type = 'email' class = 'form-control' id = 'email_element' v-model = 'curr_companies.email' />
					</div>
				</div>		

				<div class="row mb-3">
					<label class="col-lg-3 col-form-label">Адреса:</label>
					<div class="col-lg-9">
						<input type = 'text' class = 'form-control' id = 'address_element' v-model = 'curr_companies.address' />
					</div>
				</div>	

				<div class="row mb-3">
					<label class="col-lg-3 col-form-label">Телеграм:</label>
					<div class="col-lg-9">
						<input type = 'text' class = 'form-control' id = 'telegram_element' v-model = 'curr_companies.telegram' />
					</div>
				</div>		
			</fieldset>			
			
		</form>
	</div>

	<b-page404res v-if=" !curr_companies && server_response != 'wait' "></b-page404res>

</div>

	`
	
};