"use strict";


const store = new Vuex.Store({
	
	modules: {
		account: store_account,
		alert: store_alert,
	},	
	
	state: {
		server_time: 0,
		lang: "en",
		
		page_title: "Home",
		page_role: undefined,
		prev_route_path: undefined,
		currentRoute: undefined,
		
		companies: [],
		users: [],
		records: [],
		rates: [],
		
	}, 
	getters: {

		lang: state => { return state.lang },
		page_title: state => { return state.page_title },
		
		companies: state => { return state.companies },
		users: state => { return state.users },
		records: state => { return state.records },
		rates: state => { return state.rates },
		currentRoute: state => { return state.currentRoute },
		
		account: ( state, getters ) => { return getters["account/data"] },
		role: ( state, getters ) => { return getters["account/role"] },
		crole: ( state, getters ) => { 

			let 
				role = getters["account/role"],
				payment = getters["account/data"]["payment"];
			
			if ( role == "customer" ) {
				if ( payment == "no" ) role = "customer1";
				else if ( payment == "my" ) role = "customer2";
				else if ( payment == "all" ) role = "customer3";
				else role = "public";
			};
			
			console.info(role);
			
			return role;

		},
	},
	
	mutations: {
		updateYearFrom( state, data ) { state.year_from = data  },	
		updateMonthFrom( state, data ) { state.month_from = data  },
		
		setLang( state, data ) { state.lang = data  },	
		set_curr_time( state, data ) { state.curr_time = data  },	
		setPageTitle( state, data ) { document.title = state.page_title = data; 	},	
		setPageRole( state, data ) { state.page_role = data },
		setCurrentRoute( state, data ) { state.currentRoute = data;  },
		
		setData( state, data ) {
			state.companies = data.companies;
			state.users = data.users;
			state.records = data.records;
			state.rates = data.rates;
			
 		},		


		patchCompanies( state, data ) { FW.mutation.patchById( state, data, "companies" ) },			
		postCompanies( state, data ) { FW.mutation.post( state, data, "companies" ) },
		deleteCompanies( state, data ) { FW.mutation.deleteById( state, data, "companies" ) },

		patchUsers( state, data ) { FW.mutation.patchById( state, data, "users" ) },			
		postUsers( state, data ) { FW.mutation.post( state, data, "users" ) },
		deleteUsers( state, data ) { FW.mutation.deleteById( state, data, "users" ) },	

		patchRecords( state, data ) { FW.mutation.patchById( state, data, "records" ) },			
		postRecords( state, data ) { console.info( data ); FW.mutation.post( state, data, "records" ) },
		deleteRecords( state, data ) { FW.mutation.deleteById( state, data, "records" ) },

		patchRates( state, data ) { FW.mutation.patchById( state, data, "rates" ) },			
		postRates( state, data ) { FW.mutation.post( state, data, "rates" ) },
		deleteRates( state, data ) { FW.mutation.deleteById( state, data, "rates" ) },		
		
	},
	
	actions: {
		
		init( context ) {	
			async function initialization() {
				await context.dispatch("account/getAccount");
				await context.dispatch("getData");
			};		
			initialization();
		},

		
		
		async getData( context, params ) { 
			let 
				out = {};

		
			return FW.action.common( context, out, "get/data" ); 
		},	


		async postAuth( context, params ) {
			await context.dispatch("account/postAuth", params );
			await context.dispatch("init" );
		},		
		
		
		async patchCompanies( context, params ) {	return FW.action.common( context, params, "patch/companies", "params" ) },
		async postCompanies( context, params ) { return FW.action.common( context, params, "post/companies" ) },
		async deleteCompanies( context, params ) { return FW.action.common( context, params, "delete/companies", "params" ) },		
		
		async patchUsers( context, params ) {	return FW.action.common( context, params, "patch/users", "params" ) },
		async postUsers( context, params ) { return FW.action.common( context, params, "post/users" ) },
		async deleteUsers( context, params ) { return FW.action.common( context, params, "delete/users", "params" ) },		

		async patchRecords( context, params ) {	return FW.action.common( context, params, "patch/records", "params" ) },
		async postRecords( context, params ) { return FW.action.common( context, params, "post/records" ) },
		async deleteRecords( context, params ) { return FW.action.common( context, params, "delete/records", "params" ) },		

		async patchRates( context, params ) { return FW.action.common( context, params, "patch/rates", "params" ) },
		async postRates( context, params ) { return FW.action.common( context, params, "post/rates" ) },
		async deleteRates( context, params ) { return FW.action.common( context, params, "delete/rates", "params" ) },		
			
		
	}
	
});


