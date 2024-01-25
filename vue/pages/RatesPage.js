"use strict";

const RatesPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {

		}		
	},	
	
	computed: {

		role() { return this.$store.getters.role },
		crole() {  return this.$store.getters.crole },		
	
	},
	
	methods: {
	

	
		
	},
	
	mounted() {
		

	},

	template: `	



<rates-list v-if=" ['admin', 'jury', 'customer2', 'customer3'].includes(crole) "></rates-list>
<b-page403 v-else></b-page403>

	`

	
};
