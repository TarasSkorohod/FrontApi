"use strict";

const RecordPage = {
	
	mixins: [globalMixin],
	
	data: function () {
		return {

		}
	},	
	
	
	computed: {
		item_id() { return this.$route.params.item_id; },
		
		curr_record() {
			return this.$store.getters.records.find( item =>  +item.id == +this.item_id  );
		},
		
	},
	
	methods: {
	

	
		
	},
	
	mounted() {
		

	},

	template: `	
<!-- Content area -->
<div class="content">

	<!-- Inner container -->
	<div v-if=" curr_record " class="d-lg-flex align-items-lg-start">

		<artist-left-column :users_id="curr_record.users_id" :records_id="curr_record.id" :editable="false"></artist-left-column>


		<!-- Right content -->
		<div class="tab-content flex-fill">
			<div class="tab-pane fade active show" id="profile">
				
				<v-media src="/uploads/1.mp4"></v-media>
				

				
				
				<v-chat></v-chat>
					
				<!-- Account settings
				<div class="card">
					<div class="card-header">
						<h5 class="mb-0">Account settings</h5>
					</div>

					<div class="card-body">

					
					</div>
				</div>
				 /account settings -->

			</div>

		
		</div>
		<!-- /right content -->

	</div>
	<!-- /inner container -->

</div>
<!-- /content area -->
	`
	
};
