"use strict";

axios.defaults.baseURL = '/api.php';

Vue.filter('datetime', function (value) {

	if ( !moment(value).isValid() ) return `-`;	

	let 
		formatter = new Intl.DateTimeFormat("default", {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',			
			hour: 'numeric',
			minute: 'numeric',			
		});

	return formatter.format( moment(value).toDate() );
});


Vue.component('page-login', LoginPage );
Vue.component('page-home', HomePage );
Vue.component('page-records', RecordsPage );


var vueApp = new Vue({
	el: '#vue-app-container',
	router,
	store,
	
	
	
	mounted() {
		
		
	},
	
	computed: {
		auth() { return this.$store.getters["account/auth"] },
		login() { return this.$store.getters["account/login"] },
		name() { return this.$store.getters["account/data"] ? this.$store.getters["account/data"].name : "" },
		role() { return this.$store.getters["account/role"] },
		page_title() { return  this.$store.getters.page_title },
		currentRoute() { return this.$store.getters.currentRoute },
		avatar_src() { return this.$store.getters["account/data"] ? this.$store.getters["account/data"]["avatar_src"] : "" },
	},

	created() {
		this.$store.dispatch("init");
		//this.$store.commit("lang/setLang", this.$route.meta.lang);
	},

	
});


