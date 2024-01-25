"use strict";

const ArtistPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {

		}
	},	
	
	
	computed: {
		
		last_rates() {
			let res = [
				{ id: 1, fullname: "Олександр Тимчик", position: "Виконавець", "image": "../../../assets/images/demo/users/face1.jpg", "rate": 3, "song": "Мама Дана Балана спела на сцене Голоса страны", "song_id": 1 },
				{ id: 2, fullname: "Вiктор Козак", position: "Спiвак", "image": "../../../assets/images/demo/users/face2.jpg", "rate": 6, "song": "Юрий Ткач Я і Сара выбор вслепую Голос страны 8 сезон", "song_id": 1 },
				{ id: 3, fullname: "Леся Самойлова", position: "Органiзатор", "image": "../../../assets/images/demo/users/face3.jpg", "rate": 7, "song": "Переможець Голосу країни-13 Михайло Панчишин присвятив пісню захисникам", "song_id": 1 },
				{ id: 4, fullname: "Ольга Верник", position: "Виконавець", "image": "../../../assets/images/demo/users/face4.jpg", "rate": 5, "song": "Переможець Голосу країни-13 Михайло Панчишин присвятив пісню захисникам", "song_id": 1 },
				{ id: 5, fullname: "Олександр Тимчик", position: "Виконавець", "image": "../../../assets/images/demo/users/face1.jpg", "rate": 4, "song": "Мама Дана Балана спела на сцене Голоса страны", "song_id": 1 },
				{ id: 6, fullname: "Вiктор Козак", position: "Спiвак", "image": "../../../assets/images/demo/users/face2.jpg", "rate": 1, "song": "Юрий Ткач Я і Сара выбор вслепую Голос страны 8 сезон", "song_id": 1 },
				{ id: 7, fullname: "Леся Самойлова", position: "Органiзатор", "image": "../../../assets/images/demo/users/face3.jpg", "rate": 7, "song": "Переможець Голосу країни-13 Михайло Панчишин присвятив пісню захисникам", "song_id": 1 },
				{ id: 8, fullname: "Ольга Верник", position: "Виконавець", "image": "../../../assets/images/demo/users/face4.jpg", "rate": 5, "song": "Мама Дана Балана спела на сцене Голоса страны", "song_id": 1 },
			];
			
			
			res.forEach( ( item, key ) => {
				if ( +item.rate <= 2 ) res[ key ]["rate_bg"] = "bg-danger";
				else if (+item.rate <= 3.9 ) res[ key ]["rate_bg"] = "bg-warning";
				else if ( +item.rate <= 5 ) res[ key ]["rate_bg"] = "bg-info";
				else if ( +item.rate <= 6 ) res[ key ]["rate_bg"] = "bg-secondary";
				else res[ key ]["rate_bg"] = "bg-success";
			});
			
			
			return res;
		},	
		
	},
	
	methods: {
	

	
		
	},
	
	mounted() {
		

	},

	template: `	
<!-- Content area -->
<div class="content">

	<!-- Inner container -->
	<div class="d-lg-flex align-items-lg-start">

		<!-- Left sidebar component -->
		<div class="sidebar sidebar-component sidebar-expand-lg bg-transparent shadow-none me-lg-3">

			<!-- Sidebar content -->
			<div class="sidebar-content">

				<!-- Navigation -->
				<div class="card">
					<div class="sidebar-section-body text-center">
						<div class="card-img-actions d-inline-block mb-3">
							<avatar-inno-uploader></avatar-inno-uploader>
						</div>

						<h6 class="mb-0">Олександр Тимчик</h6>
						<span class="text-muted">Виконавець</span>
					</div>

					<ul class="nav nav-sidebar">
						<li class="nav-item">
							<a href="#" class="nav-link active" data-bs-toggle="tab">
								<i class="ph-user me-2"></i>
								 Мій профіль
							</a>
						</li>
						<li class="nav-item">
							<a href="#schedule" class="nav-link" data-bs-toggle="tab">
								<i class="ph-calendar me-2"></i>
								Оновлення
								<span class="fs-sm fw-normal text-muted ms-auto">15:21</span>
							</a>
						</li>
					
						
						<li class="nav-item">
							<a href="#inbox" class="nav-link" data-bs-toggle="tab">
								<i class="ph-envelope me-2"></i>
								Розмов
								<span class="badge bg-secondary bg-opacity-20 text-secondary rounded-pill ms-auto">29</span>
							</a>
						</li>
						
						<li class="nav-item">
							<a href="#inbox" class="nav-link" data-bs-toggle="tab">
								<i class="ph-envelope me-2"></i>
								Скрiни
								<span class="badge bg-secondary bg-opacity-20 text-secondary rounded-pill ms-auto">17</span>
							</a>
						</li>
						<li class="nav-item">
							<a href="#inbox" class="nav-link" data-bs-toggle="tab">
								<i class="ph-envelope me-2"></i>
								Коментарiв
								<span class="badge bg-primary bg-opacity-20 text-primary rounded-pill ms-auto">7</span>
							</a>
						</li>	
						<li class="nav-item">
							<a href="#inbox" class="nav-link" data-bs-toggle="tab">
								<i class="ph-envelope me-2"></i>
								Середнiй бал
								<span class="badge bg-success bg-opacity-20 text-success rounded-pill ms-auto">5.2</span>
							</a>
						</li>						
						
	
						<li class="nav-item-divider"></li>
						<li class="nav-item">
						
							<a @click.prevent=" $store.dispatch('account/deleteAuth') "  href="#" class="nav-link" data-bs-toggle="tab">
								<i class="ph-sign-out me-2"></i>
								Вийти
							</a>
						</li>
					</ul>
				</div>
				<!-- /navigation -->


				<!-- Online users -->
				<div class="card">
					<div class="sidebar-section-header d-flex border-bottom">
						<span class="fw-semibold">Останні оцінки</span>
						<div class="ms-auto">
							<span class="badge bg-success rounded-pill">5.2</span>
						</div>
					</div>

					<div class="sidebar-section-body">
					
					
					

						<div v-for=" rate in last_rates "class="hstack gap-3 mb-3">
							<img :src=" rate.image " class="rounded-circle" width="40" height="40" alt="">

							<div class="flex-fill">
								<a href="#" class="fw-semibold">{{rate.fullname}}</a>
								<router-link :to=" '/song/' + rate.song_id"> <div class="fs-sm text-muted">«{{rate.song}}»</div></router-link>
							</div>

							<div class="">
								<span class="badge rounded-pill" :class="rate.rate_bg">{{rate.rate}}</span>
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
				<!-- /online users -->


				<!-- Latest connections 
				<div class="card">

				</div>
				 /latest connections -->

			</div>
			<!-- /sidebar content -->

		</div>
		<!-- /left sidebar component -->


		<!-- Right content -->
		<div class="tab-content flex-fill">
			<div class="tab-pane fade active show" id="profile">

				<!-- Sales stats -->
				<div class="card">
					<div class="card-header d-sm-flex">
						<h5 class="mb-0">Галерея</h5>
						<div class="mt-2 mt-sm-0 ms-auto">
							<span>
								<i class="ph-clock-counter-clockwise me-1"></i>
								Останнє оновлення 5 годин тому
							</span>
						</div>
					</div>

				<!-- Profile navigation -->
				<div class="navbar navbar-expand-lg border-bottom py-2">
					<div class="container-fluid">
						<ul class="nav navbar-nav flex-row flex-fill">
							<li class="nav-item me-1">
								<a href="#activity" class="navbar-nav-link navbar-nav-link-icon active rounded" data-bs-toggle="tab">
									<div class="d-flex align-items-center mx-lg-1">
										<i class="ph-clipboard-text me-2"></i>
										<span class="d-none d-lg-inline-block ms-2">Компанiя 1</span>
										<span class="badge bg-success rounded-pill ms-auto ms-lg-2">4</span>
									</div>
								</a>
							</li>
							<li class="nav-item me-1">
								<a href="#schedule" class="navbar-nav-link navbar-nav-link-icon rounded" data-bs-toggle="tab">
									<div class="d-flex align-items-center mx-lg-1">
										<i class="ph-clipboard-text me-2"></i>
										<span class="d-none d-lg-inline-block ms-2">
											Компанiя 2
											<span class="badge bg-success rounded-pill ms-auto ms-lg-2">2</span>
										</span>
									</div>
								</a>
							</li>
							<li class="nav-item me-1">
								<a href="#settings" class="navbar-nav-link navbar-nav-link-icon rounded" data-bs-toggle="tab">
									<div class="d-flex align-items-center mx-lg-1">
										<i class="ph-clipboard-text me-2"></i>
										<span class="d-none d-lg-inline-block ms-2">Компанiя 3</span>
										<span class="badge bg-success rounded-pill ms-auto ms-lg-2">3</span>
									</div>
								</a>
							</li>

							<li class="nav-item d-lg-none ms-auto">
								<a href="#profile_nav" class="navbar-nav-link navbar-nav-link-icon collapsed rounded" data-bs-toggle="collapse">
									<i class="ph-caret-down collapsible-indicator"></i>
								</a>
							</li>
						</ul>
<!--
						<div class="navbar-collapse collapse" id="profile_nav">
							<ul class="navbar-nav ms-lg-auto mt-2 mt-lg-0">
								<li class="nav-item ms-lg-1">
									<a href="#" class="navbar-nav-link rounded">
										<i class="ph-note me-2"></i>
										Notes
									</a>
								</li>
								<li class="nav-item ms-lg-1">
									<a href="#" class="navbar-nav-link rounded">
										<i class="ph-users me-2"></i>
										Friends
									</a>
								</li>
								<li class="nav-item ms-lg-1">
									<a href="#" class="navbar-nav-link rounded">
										<i class="ph-image me-2"></i>
										Photos
									</a>
								</li>
								
								<li class="nav-item dropdown ms-lg-1">
									<a href="#" class="navbar-nav-link rounded dropdown-toggle" data-bs-toggle="dropdown">
										<i class="ph-gear"></i>
										<span class="d-lg-none ms-2">More</span>
									</a>

									<div class="dropdown-menu dropdown-menu-end">
										<a href="#" class="dropdown-item">
											<i class="ph-image me-2"></i>
											Update cover
										</a>
										<a href="#" class="dropdown-item">
											<i class="ph-clipboard-text me-2"></i>
											Update info
										</a>
										<a href="#" class="dropdown-item">
											<i class="ph-rows me-2"></i>
											Manage sections
										</a>
										<div class="dropdown-divider"></div>
										<a href="#" class="dropdown-item">
											<i class="ph-activity me-2"></i>
											Activity log
										</a>
										<a href="#" class="dropdown-item">
											<i class="ph-gear me-2"></i>
											Profile settings
										</a>
									</div>
								</li>
								
							</ul>
						</div>
					-->
					
					</div>
				</div>
				<!-- /profile navigation -->


					<div class="card-body">
						<div class="tab-content flex-fill order-2 order-lg-1">
							<div class="tab-pane fade active show" id="activity">

								<thumbnails-inno-uploader
									data-fileuploader-files='[
										{"name":"Переможець Голосу країни-13 Михайло Панчишин присвятив пісню захисникам", "size": "62610033", "type":"video/mp4","file":"/uploads/1.mp4"}, 
										{"name":"Наталья Могилевская Я завелась выбор вслепую Голос страны 7 сезон", "size": "34419670", "type":"video/mp4","file":"/uploads/2.mp4"},							
										{"name":"Юрий Ткач Я і Сара выбор вслепую Голос страны 8 сезон", "size": "41366013", "type":"video/mp4","file":"/uploads/3.mp4"},							
										{"name":"Мама Дана Балана спела на сцене Голоса страны", "size": "54131739", "type":"video/mp4","file":"/uploads/4.mp4"}							
									]'					
								></thumbnails-inno-uploader>
								
								
								<thumbnails-inno-uploader
									data-fileuploader-files='{"name":"Переможець Голосу країни-13 Михайло Панчишин присвятив пісню захисникам", "size": "62610033", "type":"video/mp4","file":"/uploads/1.mp4"}								'
								></thumbnails-inno-uploader>								

							</div>
							
							<div class="tab-pane fade" id="schedule">
								
								<thumbnails-inno-uploader
									data-fileuploader-files='[
										{"name":"dictionary.pdf", "size": "5516086", "type":"application/pdf","file":"/uploads/dictionary.pdf"}, 
										{"name":"index.pdf", "size": "30921", "type":"application/pdf","file":"/uploads/index.pdf"} 
									]'					
								></thumbnails-inno-uploader>
								
							</div>
							
							<div class="tab-pane fade" id="settings">
							
								<thumbnails-inno-uploader
									data-fileuploader-files='[
										{"name":"somatosensory.pdf", "size": "145349", "type":"application/pdf","file":"/uploads/somatosensory.pdf"}, 
										{"name":"invoicesample.pdf", "size": "202725", "type":"application/pdf","file":"/uploads/invoicesample.pdf"}, 
										{"name":"Голос", "size": "153890", "type":"image/jpeg","file":"/uploads/голос.jpeg"} 
										
									]'					
								></thumbnails-inno-uploader>							
							
							</div>							
							
						</div>
					</div>
				</div>
				<!-- /sales stats -->


				<!-- Profile info -->
				<div class="card">
					<div class="card-header">
						<h5 class="mb-0">Інформація про профіль</h5>
					</div>

					<div class="card-body">
						<form action="#">
							<div class="row">
								<div class="col-lg-6">
									<div class="mb-3">
										<label class="form-label">Логiн</label>
										<input type="text" value="" class="form-control">
									</div>
								</div>
								<div class="col-lg-6">
									<div class="mb-3">
										<label class="form-label">Повне ім'я</label>
										<input type="text" value="" class="form-control">
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-lg-6">
									<div class="mb-3">
										<label class="form-label">Мiсто</label>
										<input type="text" value="" class="form-control">
									</div>
								</div>
								<div class="col-lg-6">
									<div class="mb-3">
										<label class="form-label">Адреса</label>
										<input type="text" value="" class="form-control">
									</div>
								</div>
							</div>


							<!--
							<div class="row">
								<div class="col-lg-4">
									<div class="mb-3">
										<label class="form-label">City</label>
										<input type="text" value="Munich" class="form-control">
									</div>
								</div>
								<div class="col-lg-4">
									<div class="mb-3">
										<label class="form-label">State/Province</label>
										<input type="text" value="Bayern" class="form-control">
									</div>
								</div>
								<div class="col-lg-4">
									<div class="mb-3">
										<label class="form-label">ZIP code</label>
										<input type="text" value="1031" class="form-control">
									</div>
								</div>
							</div>
							-->
							<div class="row">
								<div class="col-lg-6">
									<div class="mb-3">
										<label class="form-label">Email</label>
										<input type="email" value="" class="form-control">
									</div>
								</div>
								<div class="col-lg-6">
									<div class="mb-3">
										<label class="form-label">Телефон</label>
										<input type="email" value="" class="form-control">
									</div>
								</div>								
								<!--
								readonly="readonly" 
								<div class="col-lg-6">
									<div class="mb-3">
										<label class="form-label">Your country</label>
										<select class="form-select">
											<option value="germany" selected="">Germany</option> 
											<option value="france">France</option> 
											<option value="spain">Spain</option> 
											<option value="netherlands">Netherlands</option> 
											<option value="other">...</option> 
											<option value="uk">United Kingdom</option> 
										</select>
									</div>
								</div>
								-->
							</div>



							<div class="text-end">
								<button type="button" class="btn btn-primary">Зберегти зміни</button>
							</div>
						</form>
					</div>
				</div>
				<!-- /profile info -->


				<!-- Account settings
				<div class="card">
					<div class="card-header">
						<h5 class="mb-0">Account settings</h5>
					</div>

					<div class="card-body">

					
					</div>
				</div>
				 /account settings -->

			</div>

		
		</div>
		<!-- /right content -->

	</div>
	<!-- /inner container -->

</div>
<!-- /content area -->
	`
	
};
