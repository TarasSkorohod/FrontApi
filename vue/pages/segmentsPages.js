const segmentsPages = {
    mixins: [globalMixin],

    data: function () {
        return {
            searchInput: '',
            selectedPosition: '',
            groups: [
                { name: "Група 202323", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 202323", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Г3рупа 223023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Гр32упа 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },
                { name: "Група 2023", segments: 1, cases: 1, averageValue: "1", deadline: "2023-01-01" },

            ],
            isDropdownOpen: false,
            itemsPerPage: 5,
            currentPage: 1,
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

        totalPages() {
            return Math.ceil(this.filteredGroups.length / this.itemsPerPage);
        },

        paginatedGroups() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredGroups.slice(start, end);
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

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage += 1;
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
            }
        },

        changePageSize(size) {
            this.itemsPerPage = size;
            this.currentPage = 1;
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
                  <div class="left-table-serch card-body d-inline-flex justify-content-start" style="">
                    <input type="text" class="form-control" v-model="searchInput" placeholder="Пошук" aria-label="svv" aria-describedby="search">
                    <div class="d-none d-xl-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                      <div class="d-flex flex-column justify-content-around">
                        <div class="dropdown">
                          <a class="btn btn-secondary dropdown-toggle p-0 bg-transparent border-0 text-dark shadow-none font-weight-medium" href="#" role="button" id="dropdownMenuLinkA" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <h5 class="mb-0 d-inline-block">Позиції</h5>
                          </a>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuLinkA">
                            <a class="dropdown-item" href="#" @click="changePageSize(10)">10 рядків</a>
                            <a class="dropdown-item" href="#" @click="changePageSize(25)">25 рядків</a>
                            <a class="dropdown-item" href="#" @click="changePageSize(50)">50 рядків</a>
                            <a class="dropdown-item" href="#" @click="changePageSize(100)">100 рядків</a>
                            <a class="dropdown-item" href="#" @click="changePageSize(200)">200 рядків</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table id="recent-purchases-listing" class="table">
                      <thead>
                        <tr>
                          <th>Сегмент</th>
                          <th>Кількість сегментів</th>
                          <th>Оцінені роботи</th>
                          <th>Середнє значення</th>
                          <th>Дедлайн</th>
                        </tr>
                      </thead>
                      <tbody id="tableBody">
                        <tr v-for="(group, index) in paginatedGroups" :key="index">
                          <td>{{ group.name }}</td>
                          <td>{{ group.segments }}</td>
                          <td>{{ group.cases }}</td>
                          <td>{{ group.averageValue }}</td>
                          <td>{{ group.deadline }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <button class="btn" @click="prevPage" :disabled="currentPage === 1">Попередня сторінка</button>
                    <button class="btn" @click="nextPage" :disabled="currentPage === totalPages">Наступна сторінка</button>
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
