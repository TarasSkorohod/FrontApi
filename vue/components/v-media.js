"use strict";

Vue.component('v-media', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		src: { required: true },
		title: { required: true },
		company: { required: true },
		fromNow: { required: true },
		rate: { required: true },
		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			
		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		stars() {
			let res = [];
			for ( let i = 1; i <= 7; i++ ) {
				
				if ( +this.rate >= i ) res.push("full");
				else if ( +this.rate < i && Math.round( +this.rate ) == i ) res.push("half");
				else res.push( "empty" );	
			};
			
			return res;
		},

	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
		
	},	
	
	mounted() {

	},
	
	
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
				<div class="card">
					<div class="card-header">
						<h6 class="mb-0">{{title}}</h6>
					</div>
					<div class="card-body">
						<div style=" position: relative; height: 250px;background-size: cover;background-repeat: no-repeat;background-position: center;" :style=" 'background-image: url(' + src + ')' ">
							<div style="position: absolute;background-color: #ffffffb2;right: 0px;top: 0px;padding: 3px 10px;color: black;">{{company}}</div>	
						</div>					
							
					</div>
					<div class="card-footer bg-light hstack gap-3 justify-content-between">
						<div class="text-muted fs-sm">{{fromNow}}</div>

						<div class="hstack gap-1">
							
							<template v-for=" star in stars ">
								<svg v-if=" star == 'empty' " xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256"><path fill="#f58646" d="M239.2 97.29a16 16 0 0 0-13.81-11L166 81.17l-23.28-55.36a15.95 15.95 0 0 0-29.44 0L90.07 81.17l-59.46 5.15a16 16 0 0 0-9.11 28.06l45.11 39.42l-13.52 58.54a16 16 0 0 0 23.84 17.34l51-31l51.11 31a16 16 0 0 0 23.84-17.34l-13.51-58.6l45.1-39.36a16 16 0 0 0 4.73-17.09Zm-15.22 5l-45.1 39.36a16 16 0 0 0-5.08 15.71L187.35 216l-51.07-31a15.9 15.9 0 0 0-16.54 0l-51 31l13.46-58.6a16 16 0 0 0-5.08-15.71L32 102.35a.37.37 0 0 1 0-.09l59.44-5.14a16 16 0 0 0 13.35-9.75L128 32.08l23.2 55.29a16 16 0 0 0 13.35 9.75l59.45 5.14v.07Z"/></svg>													
								<svg v-else-if=" star == 'full' " xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256"><path fill="#f58646" d="m234.5 114.38l-45.1 39.36l13.51 58.6a16 16 0 0 1-23.84 17.34l-51.11-31l-51 31a16 16 0 0 1-23.84-17.34l13.49-58.54l-45.11-39.42a16 16 0 0 1 9.11-28.06l59.46-5.15l23.21-55.36a15.95 15.95 0 0 1 29.44 0L166 81.17l59.44 5.15a16 16 0 0 1 9.11 28.06Z"/></svg>
								<svg v-else-if=" star == 'half' " xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256"><path fill="#f58646" d="M239.2 97.29a16 16 0 0 0-13.81-11L166 81.17l-23.28-55.36a15.95 15.95 0 0 0-29.44 0L90.07 81.17l-59.46 5.14a16 16 0 0 0-9.11 28.07l45.11 39.42l-13.52 58.54a16 16 0 0 0 23.84 17.34l51-31l51.11 31a16 16 0 0 0 23.84-17.34l-13.51-58.6l45.1-39.36a16 16 0 0 0 4.73-17.09Zm-15.22 5l-45.1 39.36a16 16 0 0 0-5.08 15.71L187.35 216l-51.07-31a15.9 15.9 0 0 0-8.27-2.32V32.09l23.2 55.28a16 16 0 0 0 13.35 9.75l59.44 5.14v.07Z"/></svg>
							</template>

							<!-- <span class="text-muted ms-1">({{rate}})</span> -->
						</div>
					</div>					
					
					
				</div>




`
});


