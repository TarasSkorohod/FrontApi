 "use strict";

const RecordsPostPage = {
	
	mixins: [globalMixin],
	props: ['method'],
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data	
	data: function () {
		return {
			curr_record: undefined,
			modifications_author: undefined,
			server_response: "wait",
		}
	},	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed	
	computed: {
		users_id() { 
			if ( this.method == "post" ) {
				return this.$route.params.users_id; 
			} else if ( this.curr_record ) {
				return this.curr_record.users_id;
			};
		},
		item_id() { return this.$route.params.users_id; },

		role() { return this.$store.getters.role },
		crole() {  return this.$store.getters.crole },

		companies() { return this.$store.getters.companies; },
		
		records_id() { return this.curr_record ? this.curr_record.id : -1 },
		
		curr_user() {
			
			let res = this.$store.getters.users.find( item => +item.id == +this.users_id );
			if ( res ) {
				res.company = this.companies.find( item => +item.id == +this.companies_id );
				
				res.role_title = FW.userRole( res.role );
			};
			
			return res;
		},

	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods	
	methods: {
		saveForm() {
			let data_send = Object.assign({}, this.curr_record);
			
			if ( data_send.avatar != "" ) data_send.files_count = data_send.avatar.length;
			else data_send.files_count = 0;
			
			data_send.avatar = JSON.stringify( data_send.avatar );
			data_send.time_created = moment().format("YYYY-MM-DD HH:mm:ss");
			
			
			// console.info( data_send );
			
			//console.log( moment({year: 2016, month: 3, day: 13, hour: 10}).fromNow() );
			
			// console.log( moment().format("YYYY-MM-DD HH:mm:ss") );
			
			// moment(data.myTime.format('YYYY/MM/DD HH:mm:ss')).format("YYYY-MM-DD HH:mm:ss");
			
			//this.$store.dispatch( "patchUsers", { id: this.users_id, last_time_updated: data_send.time_created} );
			this.$store.dispatch( this.method + "Records", data_send );
			
			
			
			this.back();
		},	
		
		back() {
			// window.location.replace("/");
			// router.go(-1);			
			router.push('/records');
		},
		
		remove() { 
			if ( confirm( 'Ви впевнені, що хочете видалити ці рядки?' )) {
				this.$store.dispatch("deleteRecords", { id: this.item_id});
				this.back();
			}
		},
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				created	
	async created() {

		if ( this.role !== 'admin' ) this.$store.commit("setPageTitle", "Картка учасника конкурсу" );

		if ( this.method === "post" ) {
			this.curr_record = { avatar: "", "users_id": this.users_id };
			this.server_response = "success";
		} else {
		
			let res = await FW.action.request( { id: this.item_id}, "get/records" );
			if ( res.success && res.data ) {
			
				if ( res.data.records ) {
					this.curr_record = res.data.records;
					if ( this.curr_record.avatar !== "" ) this.curr_record.avatar = JSON.parse( this.curr_record.avatar );
					
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
<page-wrapper :response = "server_response" :roles=" ['admin', 'jury', 'artist', 'customer'] ">

	<div v-if="curr_record" class="d-lg-flex align-items-lg-start">
		<artist-left-column :users_id="users_id" :records_id="records_id" :editable="false"></artist-left-column>
		
		<div class=" flex-fill">
		
		
			<b-vote v-if=" role == 'admin' || role == 'jury' " :records_id="records_id"></b-vote>
		
		
			<div v-if="curr_record" class="card" style="width: 100%">
				<div v-if="  role == 'admin' || role == 'artist'  " class="card-header d-flex py-0">
					<h6 v-if= " method == 'post' " class="py-3 mb-0">Додати запис</h6>
					<h6 v-else class="py-3 mb-0">Редагувати запис</h6>
					
					<div class="d-inline-flex align-items-center ms-auto">


						<button v-if=" method=='patch' " @click.prevent="remove" type="button" class="btn btn-danger btn-labeled btn-labeled-start">
							<span class="btn-labeled-icon bg-black bg-opacity-20"><i class="ph-x-circle"></i></span>
							Видалити 
						</button>	

						
						<button @click.prevent="back" type="button" class="btn btn-light btn-labeled btn-labeled-start mx-2">
							<span class="btn-labeled-icon bg-black bg-opacity-20"><i class="ph-arrow-counter-clockwise "></i></span>
							Закрити
						</button>	

						<button v-if=" method == 'post' " class="btn btn-success btn-labeled btn-labeled-start" form="saveFormJury">
							<span class="btn-labeled-icon bg-black bg-opacity-20"><i class="ph-check-circle"></i></span>
							Зберегти
						</button>	
						<button v-else class="btn btn-success btn-labeled btn-labeled-start" form="saveFormJury">
							<span class="btn-labeled-icon bg-black bg-opacity-20"><i class="ph-check-circle"></i></span>
							Зберегти
						</button>	
						
					</div>
				</div>		
		
				<div class="card-body">
					<form @submit.prevent="saveForm" id="saveFormJury">
						<fieldset v-if="  role == 'admin' || role == 'artist'  ">
							<legend class="fs-base fw-bold border-bottom pb-2 mb-3  mt-4">Основна інформація</legend>
							
							<div class="row mb-3">
								<label class="col-lg-3 col-form-label"><span class='form-asterics'>*</span>Назва:</label>
								<div class="col-lg-9">
									<input type = 'text' class = 'form-control' id = 'title_element' v-model = 'curr_record.title' required />
								</div>
							</div>							
						</fieldset>
						
						<fieldset>
							<legend class="fs-base fw-bold border-bottom pb-2 mb-3  mt-4">Додані файли та записи</legend>
							<inno-uploader v-model=" curr_record.avatar " :editable=" role == 'admin' || role == 'artist' "></inno-uploader>
						</fieldset>						
						
						<fieldset v-if="  role == 'admin' || role == 'artist'  ">
							<legend class="fs-base fw-bold border-bottom pb-2 mb-3  mt-4">Метадані</legend>
							
							

							
							<div class="row mb-3">
								<label class="col-lg-3 col-form-label">Дата і час дзвінка/чату:</label>
								<div class="col-lg-3">
									<input type = 'datetime-local' class = 'form-control' id = 'time_record_element' v-model = 'curr_record.time_record'  />
								</div>
								<label class="col-lg-3 col-form-label">Тривалість ( в секундах ):</label>
								<div class="col-lg-3">
									<input type = 'number' class = 'form-control' id = 'duration_element' v-model = 'curr_record.duration'  />
								</div>
							</div>
							
							<div class="row mb-3">
								<label class="col-lg-3 col-form-label">Телефон з якого дзвонили:</label>
								<div class="col-lg-3">
									<input type = 'text' class = 'form-control' id = 'phone_from_element' v-model = 'curr_record.phone_from'  />
								</div>
								<label class="col-lg-3 col-form-label">Телефон на який  дзвонили:</label>
								<div class="col-lg-3">
									<input type = 'text' class = 'form-control' id = 'phone_to_element' v-model = 'curr_record.phone_to'  />
								</div>
							</div>	

							<div class="row mb-3">
								<label class="col-lg-3 col-form-label">Додаткова iнформацiя:</label>
								<div class="col-lg-9">
									<textarea style="min-height: 150px" type = 'text' class = 'form-control' id = 'description_element' v-model = 'curr_record.description'  ></textarea>
								</div>
							</div>							
							
						</fieldset>						
					
					</form>
					
				</div>	


				
				
			</div>	
			
		</div>
		
	</div>
	
	<rates-list v-if=" method == 'patch' && ['admin', 'jury', 'artist', 'customer2', 'customer3'].includes(crole)  " :records_id="item_id"></rates-list>
	
</page-wrapper>

	`
	
};