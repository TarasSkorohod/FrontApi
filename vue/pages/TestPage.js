"use strict";

const TestPage = {
	mixins: [globalMixin],

	data: function () {
		return {
			searchInput: '',
			selectedPosition: '',
			groups: [
				{ name: "Група 2023", position: "1", segments: 1, cases: 1 },
				{ name: "Група 2022", position: "2", segments: 2, cases: 2 },
				{ name: "Група 2021", position: "3", segments: 3, cases: 3 },
				{ name: "Група 2020", position: "1", segments: 4, cases: 4 },
			],
			isDropdownOpen: false,
		};
	},

	computed: {
		filteredGroups() {
			const searchLower = this.searchInput.toLowerCase();
			return this.groups.filter(group =>
				(group.name.toLowerCase().includes(searchLower) ||
					group.segments.toString().includes(searchLower) ||
					group.cases.toString().includes(searchLower)) &&
				(this.selectedPosition === '' || group.position === this.selectedPosition)
			);
		},
	},

	methods: {
		toggleDropdown() {
			this.isDropdownOpen = !this.isDropdownOpen;
		},

		updatePositionFilter(position) {
			this.selectedPosition = position;
			this.isDropdownOpen = false;
		},
	},

	template: `
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="left-table-search card-body d-inline-flex justify-content-start">
                    <input type="text" class="form-control" v-model="searchInput" placeholder="Пошук" aria-label="svv" aria-describedby="search">
                    <div class="d-none d-xl-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                      <div class="d-flex flex-column justify-content-around">
                        <div class="dropdown">
                          <button @click="toggleDropdown" class="btn btn-secondary dropdown-toggle p-0 bg-transparent border-0 text-dark shadow-none font-weight-medium" type="button" id="dropdownMenuLinkA" :aria-expanded="isDropdownOpen.toString()">
                            <h5 class="mb-0 d-inline-block">Позиції</h5>
                          </button>
                          <div v-if="isDropdownOpen" class="dropdown-menu-1" aria-labelledby="dropdownMenuLinkA">
                            <a @click="updatePositionFilter('')" class="dropdown-item-1" href="#">Усі</a>
                            <a @click="updatePositionFilter('1')" class="dropdown-item-1" href="#">1</a>
                            <a @click="updatePositionFilter('2')" class="dropdown-item-1" href="#">2</a>
                            <a @click="updatePositionFilter('3')" class="dropdown-item-1" href="#">3</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table id="recent-purchases-listing" class="table">
                      <thead>
                        <tr>
                          <th>Назва</th>
                          <th>Позиції</th>
                          <th>Кількість сегментів</th>
                          <th>Кількість кейсів</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(group, index) in filteredGroups" :key="index">
                          <td><a class="link-item" :href="'./pages/segments/segments.html?group=' + group.name">{{ group.name }}</a></td>
                          <td>{{ group.position }}</td>
                          <td><a class="link-item" :href="'./pages/segments/segments.html?group=' + group.name">{{ group.segments }}</a></td>
                          <td><a class="link-item" :href="'./pages/segments/segments.html?group=' + group.name">{{ group.cases }}</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

