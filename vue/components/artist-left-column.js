 "use strict";

Vue.component('artist-left-column', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		users_id: { required: true },
		records_id: { },
		editable: { type: Boolean, default: false },
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {

		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		
		account() { return this.$store.getters["account/data"] },	
		companies() { return this.$store.getters.companies; },
		curr_record() {
			let res = this.$store.getters.records.find( item => +item.id == +this.records_id );
			//console.info( res );
			return res;
		},

		rate() { if ( this.curr_record && this.curr_record.avg_rate ) return Number( this.curr_record.avg_rate ).toFixed(1) },
		rate_bg() { return FW.getBgRate( this.rate ); },

		
		curr_user() {
			
			let curr_user = this.$store.getters.users.find( item => +item.id == +this.users_id );
			let res;
			
			if ( curr_user ) {
				
				res = Object.assign({}, curr_user);
				
				
				res.company = this.companies.find( item => +item.id == +this.companies_id );
				res.records = this.$store.getters.records.filter( item => +item.users_id == +res.id );
				
				res.role_title = FW.userRole( res.role );
				
			};
			
			return res;
		},		

		/*
		users_prop() {
			// props.last_time_updated
		
		},
		
		rec_prop() {
		
		
		},
		*/
		
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
	},	
	
	mounted() {
	},
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `


		<!-- Left sidebar component -->
		<div class="sidebar sidebar-component sidebar-expand-lg bg-transparent shadow-none me-lg-3">

			<!-- Sidebar content -->
			<div v-if="curr_user" class="sidebar-content">

				<!-- Navigation -->
				<div class="card">
					<div class="sidebar-section-body text-center">
						<div class="card-img-actions d-inline-block mb-3">
							<avatar-inno-uploader v-model="curr_user.avatar" :editable="editable"></avatar-inno-uploader>
						</div>

						<h6 class="mb-0">{{curr_user.name}}</h6>
						<span class="text-muted">{{curr_user.role_title}}</span>
					</div>

					<ul class="nav nav-sidebar">
						<li v-if="curr_record" class="nav-item">
							<a href="#" class="nav-link active" data-bs-toggle="tab">
								<i class="ph-user me-2"></i>
								 Метаданi запису
							</a>
						</li>
						
						<li v-if="curr_record && curr_record.time_record" class="nav-item">
							<a href="#" class="nav-link">
								<i class="ph-calendar me-2"></i>
								Час дзвiнка
								<span class="fs-sm fw-normal text-muted ms-auto">{{curr_record.time_record}}</span>
							</a>
						</li>		
						<li v-if="curr_record && curr_record.phone_to" class="nav-item">
							<a href="#" class="nav-link">
								<i class="ph-user me-2"></i>
								 Кому
								 <span class="fs-sm fw-normal text-muted ms-auto">{{curr_record.phone_to}}</span>
							</a>
						</li>
						<li v-if="curr_record && curr_record.phone_from" class="nav-item">
							<a href="#" class="nav-link">
								<i class="ph-user me-2"></i>
								 Звiдки
								 <span class="fs-sm fw-normal text-muted ms-auto">{{curr_record.phone_from}}</span>
							</a>
						</li>							
						<li v-if="curr_record && curr_record.files_count" class="nav-item">
							<a href="#" class="nav-link">
								<i class="ph-user me-2"></i>
								 Закреплено файлiв
								 <span class="fs-sm fw-normal text-muted ms-auto">{{curr_record.files_count}}</span>
							</a>
						</li>						
						<li v-if="curr_record && curr_record.avg_rate" class="nav-item">
							<a href="#" class="nav-link">
								<i class="ph-user me-2"></i>
								 Оцiнка
								 <span class="badge bg-success rounded-pill fs-sm fw-normal ms-auto" :class="rate_bg">{{rate}}</span>
								 <!-- 
									<span class="fs-sm fw-normal text-muted ms-auto">{{curr_record.avg_rate}}</span>
								-->
							</a>
						</li>						
						<li v-if="curr_record && curr_record.votes_count" class="nav-item">
							<a href="#" class="nav-link">
								<i class="ph-user me-2"></i>
								 Проголосувало
								 <span class="fs-sm fw-normal text-muted ms-auto">{{curr_record.votes_count}}</span>
							</a>
						</li>						

					
						<li v-if="curr_user" class="nav-item">
							<a href="#" class="nav-link active" data-bs-toggle="tab">
								<i class="ph-user me-2"></i>
								 Профіль
							</a>
						</li>
						<li v-if="curr_user && curr_user.name" class="nav-item">
							<a href="#" class="nav-link">
								<i class="ph-user me-2"></i>
								 ПIБ
								 <span class="fs-sm fw-normal text-muted ms-auto">{{curr_user.name}}</span>
							</a>
						</li>	
						<li v-if="curr_user && curr_user.email" class="nav-item">
							<a href="#" class="nav-link">
								<i class="ph-user me-2"></i>
								 Email
								 <span class="fs-sm fw-normal text-muted ms-auto">{{curr_user.email}}</span>
							</a>
						</li>						
						<li v-if="curr_user && curr_user.address" class="nav-item">
							<a href="#" class="nav-link">
								<i class="ph-user me-2"></i>
								 Адреса
								 <span class="fs-sm fw-normal text-muted ms-auto">{{curr_user.address}}</span>
							</a>
						</li>	
						<li v-if="curr_user && curr_user.phone" class="nav-item">
							<a href="#" class="nav-link">
								<i class="ph-user me-2"></i>
								 Телефон
								 <span class="fs-sm fw-normal text-muted ms-auto">{{curr_user.phone}}</span>
							</a>
						</li>						
						<!--
						<li class="nav-item" v-if=" props.last_time_updated ">
							<a href="#" class="nav-link" data-bs-toggle="tab">
								<i class="ph-calendar me-2"></i>
								Останній запис
								<span class="fs-sm fw-normal text-muted ms-auto">{{props.last_time_updated}}</span>
							</a>
						</li>
					
						
						<li class="nav-item">
							<a href="#" class="nav-link" data-bs-toggle="tab">
								<i class="ph-envelope me-2"></i>
								Розмов
								<span class="badge bg-secondary bg-opacity-20 text-secondary rounded-pill ms-auto">29</span>
							</a>
						</li>
						
						<li class="nav-item">
							<a href="#" class="nav-link" data-bs-toggle="tab">
								<i class="ph-envelope me-2"></i>
								Скрiни
								<span class="badge bg-secondary bg-opacity-20 text-secondary rounded-pill ms-auto">17</span>
							</a>
						</li>
						<li class="nav-item">
							<a href="#" class="nav-link" data-bs-toggle="tab">
								<i class="ph-envelope me-2"></i>
								Коментарiв
								<span class="badge bg-primary bg-opacity-20 text-primary rounded-pill ms-auto">7</span>
							</a>
						</li>	
						<li class="nav-item">
							<a href="#" class="nav-link" data-bs-toggle="tab">
								<i class="ph-envelope me-2"></i>
								Середнiй бал
								<span class="badge bg-success bg-opacity-20 text-success rounded-pill ms-auto">5.2</span>
							</a>
						</li>						
						-->
	
						<li class="nav-item-divider"></li>
						<!--
						<li class="nav-item">
						
							<a @click.prevent=" $store.dispatch('account/deleteAuth') "  href="#" class="nav-link" data-bs-toggle="tab">
								<i class="ph-sign-out me-2"></i>
								Вийти
							</a>
						</li>
						-->
					</ul>
				</div>
				<!-- /navigation -->


				<!-- <last-rates :records_id="records_id"></last-rates> -->


				<!-- Latest connections 
				<div class="card">

				</div>
				 /latest connections -->

			</div>
			<!-- /sidebar content -->

		</div>
		<!-- /left sidebar component -->


`
});


