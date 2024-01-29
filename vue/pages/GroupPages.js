"use strict";


const GroupPages = {
    mixins: [globalMixin],

    data: function () {
        return {
            searchInput: '',
            selectedPosition: '',
            currentPage: 1,
            itemsPerPage: 5,
            isDropdownOpen: false,
            rowsPerPageOptions: [5, 10, 25, 50, 100, 200],
            groups: [
                { id: 1, name: "Група 2023", segments: 1, cases: 1 },
                { id: 2, name: "Група 2022", segments: 2, cases: 2 },
                { id: 3, name: "Група 2023", segments: 1, cases: 1 },
                { id: 4, name: "Група 2023", segments: 1, cases: 1 },
                { id: 5, name: "Група 2022", segments: 2, cases: 2 },
                { id: 6, name: "Група 2023", segments: 1, cases: 1 },
                { id: 7, name: "Група 2023", segments: 1, cases: 1 },
                { id: 8, name: "Група 2022", segments: 2, cases: 2 },
                { id: 9, name: "Група 2023", segments: 1, cases: 1 },
                { id: 10, name: "Група 2022", segments: 2, cases: 2 },
                { id: 11, name: "Група 2023", segments: 1, cases: 1 },
                { id: 12, name: "Група 2023", segments: 1, cases: 1 },
                { id: 13, name: "Група 2022", segments: 2, cases: 2 },
                { id: 14, name: "Група 2023", segments: 1, cases: 1 },
                // ... інші групи
            ],
        };
    },

    computed: {
        totalPages() {
            return Math.ceil(this.groups.length / this.itemsPerPage);
        },
        itemsPerPage() {
            const windowHeight = window.innerHeight;
            const estimatedRowHeight = 40; // Adjust this based on your actual row height
            const rowsPerPage = Math.floor(windowHeight / estimatedRowHeight);

            return Math.max(Math.min(rowsPerPage, Math.min(...this.rowsPerPageOptions)), 1);
        },
        filteredGroups() {
            const searchLower = this.searchInput.toLowerCase();
            return this.groups.filter(group =>
                (group.name.toLowerCase().includes(searchLower) ||
                    group.segments.toString().includes(searchLower) ||
                    group.cases.toString().includes(searchLower)) &&
                (this.selectedPosition === '' || group.position === this.selectedPosition)
            );
        },

        paginatedGroups() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredGroups.slice(start, end);
        },
    },

    methods: {
        changePage(page) {
            this.currentPage = page;
        },

        viewDetails(group) {
            // Здійснюємо перехід на окрему сторінку для перегляду деталей групи
            this.$router.push({ name: 'groupDetails', params: { groupId: group.id } });
        },
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
                  <div class="left-table-serch card-body d-inline-flex justify-content-start">
                    <input type="text" class="form-control" v-model="searchInput" placeholder="Пошук" aria-label="svv" aria-describedby="search">
                   
                   <div class="d-none d-xl-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                      <div class="d-flex flex-column justify-content-around">
                        <div class="dropdown">
                       <a class="btn btn-secondary dropdown-toggle p-0 bg-transparent border-0 text-dark shadow-none font-weight-medium" href="#" role="button" id="dropdownMenuLinkA" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <h5 class="mb-0 d-inline-block">{{ itemsPerPage }} рядків</h5>
                    </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuLinkA">
                       <a v-for="option in rowsPerPageOptions" :key="option" class="dropdown-item" href="#" @click="changePageSize(option)">{{ option }} рядків</a>
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
                          <th>Кількість сегментів</th>
                          <th>Кількість кейсів</th>
                          <th>Деталі</th>
                        </tr>
                      </thead>
                      <tbody id="tableBody">
                        <tr v-for="(group, index) in paginatedGroups" :key="index">
                          <td>{{ group.name }}</td>
                          <td>{{ group.segments }}</td>
                          <td>{{ group.cases }}</td>
                          <td>
                            <button @click="viewDetails(group)" class="btn btn-primary">Деталі</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <nav aria-label="Page navigation example">
                      <ul class="pagination">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                          <a class="page-link" href="#" @click.prevent="prevPage" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                          <a class="page-link" href="#" @click.prevent="nextPage" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
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

