"use strict";

const StatPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {

			current_char_history_month: moment().format("YYYY-MM"),
			current_branch_chart: "",
			current_branch_table: "",
			current_table_month: moment().format("MM"),
			current_table_year: moment().format("YYYY"),
		}
	},	
	
	computed: {
	
		history_dates() {
			return [  
				{ value: "2023-02", label: "Лютий 2023" },
				{ value: "2023-03", label: "Березень 2023" },
				{ value: "2023-04", label: "Квітень 2023" },
				{ value: "2023-05", label: "Травень 2023" },
				{ value: "2023-06", label: "Червень 2023" },
				{ value: "2023-07", label: "Липень 2023" },
				{ value: "2023-08", label: "Серпень 2023" },
				{ value: "2023-09", label: "Вересень 2023" },
			];
		
		},
	
		history() {
			var 
				res = [],
				curr_year = +this.current_table_year,
				curr_month = +this.current_table_month,
				curr_branch = this.current_branch_table;
				
			if ( this.$store.getters.production_history !== undefined ) {			
				this.$store.getters.production_history.filter( item => {
					let 
						year = +moment( item.date ).format("YYYY"),
						month = +moment( item.date ).format("MM");
						
					if (
						( curr_branch == "" || curr_branch == item.title ) && 
						year == curr_year && 
						( curr_month == 0 || curr_month == month ) )
					res.push( item );
					
				});
			};

			return res;
		},
		
		branches() {
			return [
				{ label: "Усi цеха", value: "" },
				{ label: "Панели", value: "Панели" },
				{ label: "Комплектующие", value: "Комплектующие" },
				{ label: "Пружины", value: "Пружины" },
				{ label: "Металлы", value: "Металлы" },
			];			
			
		},
		
		line_chart_data_history() {
			
			let res = { data: [], series: [] };
			
			if ( this.current_branch_chart == "" ) {
				res.series = [
					{ valueField: "Панели", name: "Панели" },
					{ valueField: "Комплектующие", name: "Комплектующие" },
					{ valueField: "Пружины", name: "Пружины" },
					{ valueField: "Металлы", name: "Металлы" },
				];
			} else {
				res.series = [
					{ valueField: this.current_branch_chart, name: this.current_branch_chart },
				];
			};
			
			
			if ( !this.$store.getters.production_history ) return res;
		
			let temp = {};
			console.log( 'this.current_char_history_month=' + this.current_char_history_month );
			
			this.$store.getters.production_history.forEach( item => {
				
				let 
					day = moment( item.date ).format("YYYY-MM-DD"),
					month = moment( item.date ).format("YYYY-MM");
					
					console.log( month );
				if ( month == this.current_char_history_month ) {
				
					if ( temp[ day ] === undefined ) temp[ day ] = { day };
					temp[ day ][ item.title ] = +item.count;
					
				};
			});
			
			for ( let day in temp ) {
				res.data.push( temp[ day ] );
			};
		
			console.info( res );
		
			return res;
		},
		
		def_table_production_history() {  
			let def = {	
			
				columnDefs: [
					{"name": "id", "title": "№", "width": "1%", "render": Delphi.dt.render.cell},
					{"name": "title", "title": "Цех", "render": Delphi.dt.render.cell},
					{"name": "count", "title": "Кiлькiсть", "render": Delphi.dt.render.cell},
					{"name": "date", "title": "Дата", "render": Delphi.dt.render.date},				
				],
				"order": [[ 3, "desc" ]],
				createdRow: function( row, data, dataIndex ) {
					//$(row).find("[data-fw-push]").attr("data-fw-push", "/shops-edit");
				},
			};
			
			return def;
		},		
		
	},
	
	methods: {

		
	},
	
	mounted() {
		

		/*
		setInterval( () => {
			
			this.value_widget1 = Math.random();	
			
			
		}, 2000);
		*/
	},

	template: `	
<div>
	
	<inproduction-widgets></inproduction-widgets>

	<production-history-widgets></production-history-widgets>

	<div class="row">
		<div class="col-sm-12">
		
			<div class="card">
				<!--
				<div class="card-header d-sm-flex align-items-sm-center py-sm-0">
					<h6 class="py-sm-3 mb-sm-0">Вибір діапазону років</h6>
					<div class="ms-sm-auto my-sm-auto">
					</div>
				</div>
				-->

			</div>
							
		</div>
	</div>
	
	
	
	<div class="row">
		<div class="col-xl-12">
			<div class="card" style="width: 100%">
				<div class="card-header d-flex py-0">
					<h6 class="py-3 mb-0">Звiтнiсть цехiв по днях</h6>
					<div class="d-inline-flex align-items-center ms-auto d-flex">
						
						<select class="form-control me-3" v-model="current_branch_table">
							<option v-for=" item in branches " :value="item.value" :key="item.value">{{item.label}}</option>
						</select>

						<select class="form-control me-3" v-model="current_table_month">
							<option v-for=" item in $store.getters.month_list " :value="item.value" :key="item.value">{{item.label}}</option>
						</select>
						
						<select class="form-control" v-model="current_table_year">
							<option v-for=" item in $store.getters.year_list " :value="item.value" :key="item.value">{{item.label}}</option>
						</select>						
						
						
					</div>
				</div>
				<div class="card-body" v-if=" history ">
						<v-datatable
							id = "production_history1"
							entity = "production_history"
							:value = "history"
							:def = "def_table_production_history"
						></v-datatable>				
				</div>
			</div>		
		</div>
	</div>
	
	
	<div class="row">
		<div class="col-sm-12">
		
			<div class="card">
				<div class="card-header d-sm-flex align-items-sm-center py-sm-0">
					<h6 class="py-sm-3 mb-sm-0">Статистика виробництва по цехам</h6>
					<div class="ms-sm-auto my-sm-auto d-flex">

						<select class="form-control me-3" v-model="current_branch_chart">
							<option v-for=" item in branches " :value="item.value" :key="item.value">{{item.label}}</option>
						</select>					
					
						<select class="form-control" v-model="current_char_history_month">
							<option v-for=" item in history_dates " :value="item.value" :key="item.value">{{item.label}}</option>
						</select>					
					</div>
				</div>
				<div  class="card-body">
					<dev-line-chart
						id="line-chart-history"
						:data=" line_chart_data_history "
						argumentField="day"
						title = 'Статистика виробництва'
					></dev-line-chart>
					
				</div>
			</div>
							
		</div>
	</div>	
	
	
	
	
	
	
	<!--
	<div class="row">
		<div class="col-sm-3">
			<rounded-progress-bar 
				id="widget1" 
				:value="value_widget1"
				color = "#26a69a"
			></rounded-progress-bar>
		</div>
		<div class="col-sm-3">
			<rounded-progress-bar
				id="widget2" 
				:value="value_widget2"
				color = "#26a69a"
				:transparent="false"
			></rounded-progress-bar>
		</div>
	</div>
	-->	


</div>
	`
	
};
