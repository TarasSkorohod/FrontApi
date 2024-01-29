"use strict";
const FinancesPages = {
    mixins: [globalMixin],

    data: function () {
        return {
            searchInput: '',
            selectedPosition: '',
            currentPage: 1,
            itemsPerPage: 5,
            isRatingModalOpen: false,
            rating: 5,
            isEditModalOpen: false, // Додаємо новий флаг для відстеження модального вікна редагування
            editedGroup: {
                id: null,
                name: '',
            },
            isDropdownOpen: false,
            rowsPerPageOptions: [5, 10, 25, 50, 100, 200],
            groups: [
                { id: 1, name: "А-банк", editableRating: null, cases: true, detailsPageName: 'serviceDetails', date: new Date() },
                { id: 2, name: "А-банк", editableRating: null, cases: true, detailsPageName: 'serviceDetails', date: new Date() },
                { id: 3, name: "А-банк", editableRating: null, cases: true, detailsPageName: 'serviceDetails', date: new Date() },
                { id: 4, name: "А-банк", editableRating: null, cases: false, detailsPageName: 'editDetails', date: new Date() },
                { id: 5, name: "А-банк", editableRating: null, cases: true, detailsPageName: 'serviceDetails', date: new Date() },
                { id: 6, name: "МОНО", editableRating: null, cases: true, detailsPageName: 'serviceDetails', date: new Date() },
                { id: 7, name: "Приват", editableRating: null, cases: true, detailsPageName: 'editDetails', date: new Date() },
            ],
            currentGroupId: null,
        };
    },

    computed: {
        totalPages() {
            return Math.ceil(this.groups.length / this.itemsPerPage);
        },
        filteredGroups() {
            const searchLower = this.searchInput.toLowerCase();
            return this.groups.filter(group =>
                (group.name.toLowerCase().includes(searchLower) ||
                    (group.editableRating !== null && group.editableRating.toString().includes(searchLower)) ||
                    group.cases.toString().includes(searchLower)) &&
                (this.selectedPosition === '' || group.id === this.selectedPosition)
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

        startRating(group) {
            this.currentGroupId = group.id;
            this.rating = group.editableRating !== null ? group.editableRating : 5;
            this.isRatingModalOpen = true;
        },
        editRating(group) {
            this.currentGroupId = group.id;
            this.rating = group.editableRating !== null ? group.editableRating : 5;
            this.isRatingModalOpen = true;
        },

        viewDetails(group) {
            if (group.cases === 'Оцінити') {
                this.currentGroupId = group.id;
                this.rating = group.editableRating !== null ? group.editableRating : 5;
                this.isRatingModalOpen = true;
            }
        },

        viewDetailsPage(group) {
            const detailsPageName = group.detailsPageName || 'serviceDetails';
            this.$router.push({ name: detailsPageName, params: { groupId: group.id } });
        },

        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },

        closeRatingModal() {
            this.isRatingModalOpen = false;
            this.currentGroupId = null;
            this.rating = 5;
        },

        submitRating() {
            console.log('Submitted Rating:', this.rating);
            const groupIndex = this.groups.findIndex(g => g.id === this.currentGroupId);
            if (groupIndex !== -1) {
                this.$set(this.groups, groupIndex, { ...this.groups[groupIndex], editableRating: this.rating });
            }
            this.closeRatingModal();
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

        // Новий метод для відкриття модального вікна редагування
        editGroup(group) {
            this.editedGroup = { ...group };
            this.isEditModalOpen = true;
        },

        // Новий метод для збереження редагованої групи
        saveEditedGroup() {
            const groupIndex = this.groups.findIndex(g => g.id === this.editedGroup.id);
            if (groupIndex !== -1) {
                this.$set(this.groups, groupIndex, { ...this.groups[groupIndex], name: this.editedGroup.name });
            }
            this.closeEditModal();
        },

        // Новий метод для закриття модального вікна редагування
        closeEditModal() {
            this.isEditModalOpen = false;
            this.editedGroup = {
                id: null,
                name: '',
            };
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
                                    <input type="text" class="form-control" v-model="searchInput"
                                        placeholder="Пошук" aria-label="svv" aria-describedby="search">

                                    <div class="d-none d-xl-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                                        <div class="d-flex flex-column justify-content-around">
                                            <div class="dropdown">
                                                <a class="btn btn-secondary dropdown-toggle p-0 bg-transparent border-0 text-dark shadow-none font-weight-medium"
                                                    href="#" role="button" id="dropdownMenuLinkA" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <h5 class="mb-0 d-inline-block">{{ itemsPerPage }} рядків</h5>
                                                </a>
                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLinkA">
                                                    <a v-for="option in rowsPerPageOptions" :key="option" class="dropdown-item"
                                                        href="#" @click="changePageSize(option)">{{ option }} рядків</a>
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
                                                <th>Оцінка</th>
                                                <th>Статус</th>
                                                <th>Деталі</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tableBody">
<!-- ... -->

<tr v-for="(group, index) in paginatedGroups" :key="index">
    <td>{{ group.name }}</td>
   <!-- ... -->
<td>
    <span v-if="group.id === currentGroupId">{{ rating }}</span>
    <span v-else>{{ group.editableRating !== null ? group.editableRating : 'Не оцінено' }}</span>
</td>
<td>
    <button v-if="group.editableRating === null" @click="startRating(group)" class="btn btn-primary">Оцінити</button>
    <button v-else-if="group.cases" @click="editGroup(group)" class="btn btn-success">Редагувати стовпець</button>
    <button v-else-if="group.editableRating !== null" @click="editRating(group)" class="btn btn-warning">Редагувати оцінку</button>
</td>
<!-- ... -->

    <td>
        <button @click="viewDetailsPage(group)" class="btn btn-primary">Деталі</button>
    </td>
</tr>

<!-- ... -->


                                        </tbody>
                                    </table>
                                    <div class="modal" v-if="isRatingModalOpen" style="z-index: 9999;">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Оцінка</h5>
                                                    <button type="button" class="btn-close" @click="closeRatingModal"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <label for="ratingSelect" class="form-label">Оберіть оцінку:</label>
                                                    <select id="ratingSelect" class="form-select" v-model="rating">
                                                        <option v-for="option in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="option">{{ option }}</option>
                                                    </select>
                                                    <p class="text-center mt-3">Ваша обрана оцінка: {{ rating }}</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-primary" @click="submitRating">Зберегти</button>
                                                    <button type="button" class="btn btn-secondary" @click="closeRatingModal">Закрити</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Модальне вікно редагування -->
                                    <div class="modal" v-if="isEditModalOpen" style="z-index: 9999;">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Редагування імені</h5>
                                                    <button type="button" class="btn-close" @click="closeEditModal"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <label for="groupNameInput" class="form-label">Нове ім'я групи:</label>
                                                    <input type="text" id="groupNameInput" class="form-control" v-model="editedGroup.name">
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-primary" @click="saveEditedGroup">Зберегти</button>
                                                    <button type="button" class="btn btn-secondary" @click="closeEditModal">Закрити</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- ... -->
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination">
                                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                                <a class="page-link" href="#" @click.prevent="prevPage"
                                                    aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li class="page-item" v-for="page in totalPages" :key="page"
                                                :class="{ active: currentPage === page }">
                                                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                            </li>
                                            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                                <a class="page-link" href="#" @click.prevent="nextPage"
                                                    aria-label="Next">
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
