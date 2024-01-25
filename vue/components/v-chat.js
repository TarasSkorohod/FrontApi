"use strict";

Vue.component('v-chat', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		title: { default: "Залишити коментар" }
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			
		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		
		comments() {
			
			return [
				{ "id": 1, "text": "Юрію, дякую за Вашу щирість, за Ваше серце, голос, творчість, мужність і справжність! Неймовірний у Вас голос, хай Бог береже Вас і усіх наших захисників!", "fullname": "Олександр Тимчик", "image": "../../../assets/images/demo/users/face1.jpg"},
				{ "id": 2, "text": "Коли дивишся на таку людину як  Юрій то віриш в те, що ще існує добро і щирість....Побільше б таких людей і тоді світ не мав би війн!)", "fullname": "Вiктор Козак", "image": "../../../assets/images/demo/users/face2.jpg"},
				{ "id": 3, "text": "Голос оксамитовий!) Приємно слухати. Героям слава! Бережіть себе та побратимів! Дякуємо за захист", "fullname": "Леся Самойлова", "image": "../../../assets/images/demo/users/face3.jpg"},
				{ "id": 4, "text": "\"Як тебе не любити Києве мій\". Дуже гарна пісня. Юрій заспівав гарно. Трохи чуттєвості не хватає. Треба співати йому у військовому оркестрі. Велика подяка Юрію за наш захист від ворогів. Він вже герой", "fullname": "Ольга Верник", "image": "../../../assets/images/demo/users/face4.jpg"},
				{ "id": 5, "text": "Всім серцем вболіваю за свого тезку! Успіхів Вам і дякую!", "fullname": "Олександр Тимчик", "image": "../../../assets/images/demo/users/face1.jpg"},
				{ "id": 6, "text": "Дякую Вам Юрій за все,я за Вас вболівала.Нехай Ваша співоча кар'єра продовжиться ,бо Ваш голос просто неперевершений.Нехай Боженька Вам допомагає у всьому і збереже Вас СЛАВА УКРАЇНІ!!!", "fullname": "Вiктор Козак", "image": "../../../assets/images/demo/users/face2.jpg"},
				{ "id": 7, "text": "Щира людина. Якщо вже вибирати з двох суперфіналістів-військовослужбовців то я обираю Юрія.", "fullname": "Леся Самойлова", "image": "../../../assets/images/demo/users/face3.jpg"},
				{ "id": 8, "text": "Я просто не можу пережити, як це гарно", "fullname": "Ольга Верник", "image": "../../../assets/images/demo/users/face4.jpg"},
				
				{ "id": 9, "text": "В мене шок від остаточного результату! Якщо це ГОЛОС країни, то найкрасивіші тембри голосів у Городецького і Пелиха. Якщо конкурс вокалу, то найсильніший спів у Авоян і Старикової. Якщо конкурс  наставників, то зрозуміло, пивоваров, за нього  усі його багаточисельні  підписники голосували) Але як можна навіть порівняти безголосого", "fullname": "Олександр Тимчик", "image": "../../../assets/images/demo/users/face1.jpg"},
				{ "id": 10, "text": "Український народний артист", "fullname": "Вiктор Козак", "image": "../../../assets/images/demo/users/face2.jpg"},
				{ "id": 11, "text": "Дуже гарно!", "fullname": "Леся Самойлова", "image": "../../../assets/images/demo/users/face3.jpg"},
				{ "id": 12, "text": "Я прям окунулась в цю пісню. Дякую за таку можливість Польщі", "fullname": "Ольга Верник", "image": "../../../assets/images/demo/users/face4.jpg"},

				{ "id": 13, "text": "Дивилась слухала і плакала.Плакала,дивилась і слухала.СЛАВА УКРАЇНІ!!!", "fullname": "Олександр Тимчик", "image": "../../../assets/images/demo/users/face1.jpg"},
				{ "id": 14, "text": "Красава, красивая песня. Классика", "fullname": "Вiктор Козак", "image": "../../../assets/images/demo/users/face2.jpg"},
				{ "id": 15, "text": "Хотілось би більше артистизму та емоційності у співі.", "fullname": "Леся Самойлова", "image": "../../../assets/images/demo/users/face3.jpg"},
				{ "id": 16, "text": "Так щиро і голосисто, до мурах! Ви для мене Переможець", "fullname": "Ольга Верник", "image": "../../../assets/images/demo/users/face4.jpg"},
			
			
			];
			
			
		},

	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
		
		createPlugin() {
	
			
		},
		
	},	
	
	mounted() {
		
		if (document.readyState === "complete") {
			this.createPlugin();
		} else {
			window.addEventListener("DOMContentLoaded", this.createPlugin());
		}
		
	},
	
	
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `



<div class="card">
	<div class="card-header">
		<h5 class="mb-0">{{title}}</h5>
	</div>

	<div class="card-body">
		<div class="media-chat-scrollable mb-3">
			<div class="media-chat vstack gap-3">
			
				<div class="text-muted">02.11, середа</div>

				<div v-for=" comment in comments " :data-id="comment.id" class="hstack align-items-start gap-3">
					<a href="#" class="d-block status-indicator-container">
						<img :src=" comment.image " class="w-40px h-40px rounded-pill" alt="">
						<!-- <span class="status-indicator bg-success"></span> -->
					</a>

					<div class="flex-fill">
						<div>
							<a href="#" class="fw-semibold">{{comment.fullname}}</a>
							<span class="text-muted fs-sm ms-2">15:24</span>
						</div>
						<div v-html=" comment.text "></div>
					</div>
				</div>
			
			</div>
		</div>

		<div class="form-control form-control-content mb-3" contenteditable="" data-placeholder="Введіть повідомлення тут і натисніть клавішу надiслати..."></div>

		<div class="d-flex align-items-center">
			<div>
			<!--
				<a href="#" class="btn btn-light btn-icon border-transparent rounded-pill btn-sm me-1" data-bs-popup="tooltip" title="Formatting">
					<i class="ph-text-aa"></i>
				</a>
				<a href="#" class="btn btn-light btn-icon border-transparent rounded-pill btn-sm me-1" data-bs-popup="tooltip" title="Emoji">
					<i class="ph-smiley"></i>
				</a>
				<a href="#" class="btn btn-light btn-icon border-transparent rounded-pill btn-sm me-1" data-bs-popup="tooltip" title="Send file">
					<i class="ph-paperclip"></i>
				</a>
			-->
			</div>

			<button type="button" class="btn btn-primary ms-auto">
				Надіслати коментар
				<i class="ph-paper-plane-tilt ms-2"></i>
			</button>
		</div>
	</div>
</div>






`
});


