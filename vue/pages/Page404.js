"use strict";

const Page404 = {
	
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


	<b-page404></b-page404>

</div>
	`
	
};
