"use strict";

const GraphPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {
			graph_data: {},
		}
	},	
	
	computed: {
	
		year_chart_from: {
			get() { return this.$store.getters.diapazon.chart_line.from },
			set( value ) { 
				this.$store.commit('setDiapazon', { chart_line: { "from": value }} );
				this.updateData();
			}
		},
		year_chart_to: {
			get() { return this.$store.getters.diapazon.chart_line.to },
			set( value ) { 
				this.$store.commit('setDiapazon', { chart_line: { "to": value }} );
				this.updateData();
			}
		},		
	

		line_chart_data() {
			
			let res = { data: [], series: [] };
			
			if ( !this.graph_data || !this.graph_data.line ) return false;
			
			let 
				temp = {},
				series = {},
				arg_field_name = "month";
				
			this.graph_data.line.forEach( item => {
				
				let
					arg_field_value = item.month,
					serie_name = item.year,
					serie_title = item.year;
				
				
				if ( temp[ arg_field_value ] === undefined ) {
					temp[ arg_field_value ] = {};
					temp[ arg_field_value ][ arg_field_name ] = arg_field_value;
				};
				temp[ arg_field_value ][ serie_name ] = +item.count;
				
				
				if ( series[ serie_name ] === undefined ) series[ serie_name ] = { "name": serie_name, "title": serie_name };
			});

			// заполняем информацию про серии	
			for ( let serie_name in series ) {
				let item = series[ serie_name ];
				res.series.push({ valueField: item.name, name: item.title });	
			};
			
			// дополняем отсутствующие данные
			//temp.forEach( ( item, key ) => {
			for ( let arg_field_value in temp ) {	
				for ( let serie_name in series ) {
					if ( temp[ arg_field_value ][ serie_name ] === undefined  ) temp[ arg_field_value ][ serie_name ] = 0;
				};				
				res.data.push( temp[ arg_field_value ] );
				
			};
			
			console.info( res );
			return res;
			
		},
		
		
		line_chart_data1() {
			
			let res = { data: [], series: [] };
			
			if ( !this.graph_data || !this.graph_data.line1 ) return false;
			
			let 
				temp = {},
				series = {},
				arg_field_name = "month";
				
			this.graph_data.line1.forEach( item => {
				
				let
					arg_field_value = item.month,
					serie_name = item.year,
					serie_title = item.year;
				
				
				if ( temp[ arg_field_value ] === undefined ) {
					temp[ arg_field_value ] = {};
					temp[ arg_field_value ][ arg_field_name ] = arg_field_value;
				};
				temp[ arg_field_value ][ serie_name ] = +item.count;
				
				
				if ( series[ serie_name ] === undefined ) series[ serie_name ] = { "name": serie_name, "title": serie_name };
			});

			// заполняем информацию про серии	
			for ( let serie_name in series ) {
				let item = series[ serie_name ];
				res.series.push({ valueField: item.name, name: item.title });	
			};
			
			// дополняем отсутствующие данные
			//temp.forEach( ( item, key ) => {
			for ( let arg_field_value in temp ) {	
				for ( let serie_name in series ) {
					if ( temp[ arg_field_value ][ serie_name ] === undefined  ) temp[ arg_field_value ][ serie_name ] = 0;
				};				
				res.data.push( temp[ arg_field_value ] );
				
			};
			
			//console.info( res );
			return res;
			
		},		
		
	},
	
	methods: {
		
		async updateData() {
			let response = await FW.action.request( { year_from: this.year_chart_from, year_to: this.year_chart_to,  }, "get/graph" );		
			this.graph_data = response.data;
		},
	
		
	},
	
	mounted() {
		
		this.updateData();
	
	},

	template: `	
<div>


	<div class="row">
		<div class="col-sm-12">
			<div class="card">
				<div class="card-header d-sm-flex align-items-sm-center py-sm-0">
					<h6 class="py-sm-3 mb-sm-0">Вибір діапазону років</h6>
					<div class="ms-sm-auto my-sm-auto">
								<div class="d-lg-flex mb-2 mb-lg-0">
									<div class="d-flex align-items-center text-body py-2">
										<select v-model="year_chart_from" class="form-control">
											<option value="2014">2014</option>
											<option value="2015">2015</option>
											<option value="2016">2016</option>
											<option value="2017">2017</option>
											<option value="2018">2018</option>
											<option value="2019">2019</option>
											<option value="2020">2020</option>
											<option value="2021">2021</option>
											<option value="2022">2022</option>
											<option value="2023">2023</option>
										</select>
									</div>
									
									<div><i class="ph-minus ph-2x mx-2 mt-2"></i></div>
									
									<div class="d-flex align-items-center text-body py-2">
										<select v-model="year_chart_to" class="form-control">
											<option value="2014">2014</option>
											<option value="2015">2015</option>
											<option value="2016">2016</option>
											<option value="2017">2017</option>
											<option value="2018">2018</option>
											<option value="2019">2019</option>
											<option value="2020">2020</option>
											<option value="2021">2021</option>
											<option value="2022">2022</option>
											<option value="2023">2023</option>
										</select>
									</div>
								</div>			
					
					</div>
				</div>

			</div>
		</div>
	</div>



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
				<div  class="card-body">
					<dev-line-chart
						id="line-chart"
						:data=" line_chart_data "
						argumentField="month"
						title = 'Кількість проданих воріт за роками'
					></dev-line-chart>
					
				</div>
			</div>
							
		</div>
	</div>
	

	<div class="row">
		<div class="col-sm-12">
		
			<div class="card">

				<div class="card-body">
					<dev-line-chart
						id="line-chart1"
						:data=" line_chart_data1 "
						argumentField="month"
						title = 'Кількість проданої автоматики за роками'
					></dev-line-chart>
					
				</div>
			</div>
							
		</div>
	</div>	



	
	

	<div class="row">
		<div class="col-xl-12">

		</div>

	</div>	
</div>
	`
	
};
