"use strict";

const HomePage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {

		}		
	},	
	
	computed: {
		role() { return this.$store.getters["account/role"] },
	
	},
	
	methods: {
	

	
		
	},
	
	mounted() {
		

	},

	template: `	
<div>


		<media-list v-if=" role == 'customer' || role == 'public' "></media-list>
		<page-records v-else></page-records>


</div>
	`
	
};
