"use strict";

const MediesPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {

		}
	},
	
	computed: {
		
		
		
		
		artists() {
			return [
				{ id: 1, fullname: "Олександр Тимчик", position: "Виконавець", "image": "../../../assets/images/demo/users/face1.jpg", "rate": 3 },
				{ id: 2, fullname: "Вiктор Козак", position: "Спiвак", "image": "../../../assets/images/demo/users/face2.jpg", "rate": 15 },
				{ id: 3, fullname: "Леся Самойлова", position: "Органiзатор", "image": "../../../assets/images/demo/users/face3.jpg", "rate": 8 },
				{ id: 4, fullname: "Ольга Верник", position: "Виконавець", "image": "../../../assets/images/demo/users/face4.jpg", "rate": 17 },
			];
		},	
	},

	
	methods: {
		
	
		
	},
	
	mounted() {

	},

	template: `	
<!-- Content area -->
<div class="content">

		<div class="mb-3 pt-2">
			<h6 class="mb-0">Список записів</h6>
			<span class="text-muted">Список записів усіх виконавців</span>
		</div>


		<div class="row">
			<div class="col-xl-4 col-sm-6">
				<v-media src="/uploads/1.mp4" title="Переможець Голосу країни-13 Михайло Панчишин присвятив пісню захисникам"></v-media>
			</div>
			<div class="col-xl-4 col-sm-6">
				<v-media src="/uploads/2.mp4" title="Наталья Могилевская Я завелась выбор вслепую Голос страны 7 сезон"></v-media>
			</div>
			<div class="col-xl-4 col-sm-6">
				<v-media src="/uploads/3.mp4" title="Юрий Ткач Я і Сара выбор вслепую Голос страны 8 сезон"></v-media>
			</div>
			<div class="col-xl-4 col-sm-6">
				<v-media src="/uploads/4.mp4" title="Мама Дана Балана спела на сцене Голоса страны"></v-media>
			</div>
		</div>		

</div>
<!-- /content area -->
	`
	
};
