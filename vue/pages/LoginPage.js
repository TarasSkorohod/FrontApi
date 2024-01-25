"use strict";

const LoginPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {
			login: "",
			confirm_email_code: "",
			stage: 1,
			auth_type: "",
		}
	},	
	
	computed: {
	
		
	},
	
	
	// get/check/tlg/auth
	
	methods: {
		
		async checkTlgAuth() {
			let res = await FW.action.request( { login: this.login }, "post/check/tlg/auth" );
			
			if ( res.data && +res.data.auth == 1 ) { 
				clearTimeout( this.tlg_timer_id );
				this.$store.dispatch("postAuth", { login: this.login, confirm_email_code: "" })
			}
		},
		
		
		async postAuth() {
			let res; 
			
			if ( this.stage == 1 ) {
				res = await FW.action.request( { login: this.login }, "post/user/confirm_code" );
				
				if ( res.success ) this.stage = 2;
				this.auth_type = res.data.auth_type;
				
				if ( this.auth_type == "telegram" ) {
					this.tlg_timer_id = setInterval(() => { this.checkTlgAuth() }, 5000);
				};
				
			} else {
				this.$store.dispatch("postAuth", { login: this.login, confirm_email_code: this.confirm_email_code })
			};
			
			return false;
		},
	
		
	},
	
	mounted() {

	},

	template: `	



				<!-- Content area -->
				<div class="content d-flex justify-content-center align-items-center">

					<!-- Login form -->
					<form class="login-form"  @submit.prevent="postAuth">
						<div class="card mb-0">
							<div class="card-body">
								<div class="text-center mb-3">
									<div class="d-inline-flex align-items-center justify-content-center mb-3 mt-2">
											<img class="mt-1" src="/assets/images/icon-fest.png"  style=" max-height: 100px;"/>
									</div>
									<h5 class="mb-0">Особистий кабінет</h5>
									<span class="d-block text-muted">Введіть свої облікові дані</span>
								</div>

								<div class="mb-3">
									<label class="form-label">Ваша адреса електронної пошти або номер телефону</label>
									<div class="form-control-feedback form-control-feedback-start">
										<input v-model="login"  type="text" class="form-control" placeholder="" required>
										<div class="form-control-feedback-icon">
											<i class="ph-user-circle text-muted"></i>
										</div>
									</div>
								</div>

								
								<div v-if=" stage == 2 && auth_type == 'email' " class="mb-3">
									<label class="form-label">Код підтвердження з електронного повідомлення</label>
									<div class="form-control-feedback form-control-feedback-start">
										<input v-model="confirm_email_code" class="form-control" required>
										<div class="form-control-feedback-icon">
											<i class="ph-lock text-muted"></i>
										</div>
									</div>
								</div>

								<div v-if=" auth_type == 'email' || auth_type == '' " class="mb-3">
									<button type="submit" class="btn btn-primary w-100">Увійдіть</button>
								</div>

<!--
								<div class="text-center">
									<a href="login_password_recover.html">Forgot password?</a>
								</div>
-->
							</div>
						</div>
					</form>
					<!-- /login form -->

				</div>
				<!-- /content area -->




	`
	
};
