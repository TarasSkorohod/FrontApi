"use strict";

Vue.component('b-page403', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {

		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {},	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				mounted
	mounted() {},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				watch
	watch: {},	
	

	template: `			
				<div class="content d-flex justify-content-center align-items-center">

					<!-- Container -->
					<div class="flex-fill">

						<!-- Error title -->
						<div class="text-center mb-4">
							<img src="/assets/images/error_bg.svg" class="img-fluid mb-3" height="230" alt="">
							<h1 class="display-3 fw-semibold lh-1 mb-3">403</h1>
							<h6 class="w-md-25 mx-md-auto">На жаль, сталася помилка. <br> Доступ до цього ресурсу на сервері заборонено.</h6>
						</div>
						<!-- /error title -->


						<!-- Error content -->
						<div class="text-center">
							<router-link to="/" class="btn btn-primary">
								<i class="ph-house me-2"></i>
								Повернутися на головну
							</router-link>
						</div>
						<!-- /error wrapper -->

					</div>
					<!-- /container -->

				</div>
`
});


