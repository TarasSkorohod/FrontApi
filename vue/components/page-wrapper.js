"use strict";

Vue.component('page-wrapper', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		roles: { type: Array, default: () => ['admin', 'administrator'] },
		response: { default: "success" },
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {

		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		//account() { return this.$store.getters["account/data"] },
		role() { 
			let role = this.$store.getters["account/role"];
			return role;
		},
		allowed() { return this.roles.length == 0 ? true : this.roles.includes( this.role ) },
		error404() {
			return this.response == 'fail'; 
		},
		content() {
			return this.response == 'success'; 
		},
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {},	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				mounted
	mounted() {},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				watch
	watch: {},	
	

	template: `			
	<div>
		<b-page404res v-if=" error404 "></b-page404res>
		<template v-else-if=" role ===  undefined "></template>
		<b-page403 v-else-if=" !allowed "></b-page403>
		
		<slot v-else-if="content"></slot>
	</div>
`
});


