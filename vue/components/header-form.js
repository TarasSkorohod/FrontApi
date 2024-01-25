"use strict";

Vue.component('header-form', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		server_response: { required: true },
		method: { required: true },
		
		//back_link: { type: String },
		//post_title: { type: String, default: "Додати" },
		//patch_title: { type: String, default: "Редагувати" },
		
		//onBack: {},
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {

		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		

	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
		
		back() {
			if ( this.$listeners["on-back"] ) this.$emit('on-back');
			else router.go(-1);
		},
		
		remove() { 
			if ( this.$listeners["on-remove"] ) this.$emit('on-remove')
			else {
				if ( confirm( 'Ви впевнені, що хочете це видалити?' )) {
					this.$store.dispatch("deleteUsers", { id: this.item_id});
					this.back();
				}
			}
		},		
		
	},	
	
	mounted() {
	},
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
<div>

	<b-page404res v-if=" server_response == 'fail' "></b-page404res>

	<div  v-if=" server_response == 'success' " class="card-header d-flex py-0  pt-2 pb-2">
		<!--
		<h6 v-if= " method == 'post' " class="py-3 mb-0">{{post_title}}</h6>
		<h6 v-else class="py-3 mb-0">patch_title</h6>
		-->
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
				Додати
			</button>	
			<button v-else class="btn btn-success btn-labeled btn-labeled-start" form="saveFormJury">
				<span class="btn-labeled-icon bg-black bg-opacity-20"><i class="ph-check-circle"></i></span>
				Зберегти
			</button>	
			
		</div>
	</div>

</div>		

`
});


/*

	<header-form
		:server_response="server_response"
		:method="method"
		@on-back = "back"
		
	></header-form>
	
*/