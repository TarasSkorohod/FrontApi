'use strict';

const routes = 
[

	// {path: '/', component: segmentsPages, meta: {title: "Фінанси"}},
	// {path: '/', component: ServicePages, meta: {title: "сервіс"}},
	{path: '/', component: FinancesTablePages, meta: {title: "сегменти"}}


	//{ path: '/', component: HomePage, meta: { title: "Головна" } },
	
	// { path: '/', component: RecordsPage, meta: { title: "Записи" } },
	
	// { path: '/', component: HomePage, meta: { title: "Головна" } },
	
	// { path: '/artists', component: TestPage, meta: { title: "Виконавцi" } },
	// { path: '/medies', component: MediesPage, meta: { title: "Записи" } },
	//
    // { "path": "/artist/:item_id", "component": ArtistPage,
	// 	"props": { "method": "patch" },
    //     "meta": { "title": "Виконавець" }
    // },
	//
    // {  "path": "/record/:item_id", "component": RecordPage, "props": { "method": "patch" }, "meta": { "title": "Запис" } },
	//
	//
	// { path: '/companies', component: CompaniesPage, meta: { title: "Компанії" } },
	// { path: "/companies-add", "component": CompaniesPostPage, "props": { "method": "post" }, "meta": { "title": "Додати компанiю" } },
    // { path: "/companies-edit/:item_id", "component": CompaniesPostPage, "props": { "method": "patch" }, "meta": { "title": "Редагувати компанiю" } },
	//
	// { path: "/jury-add", "component": JuryPostPage, "props": { "method": "post" }, "meta": { "title": "Додати члена журі" } },
	// { path: "/jury-edit/:item_id", "component": JuryPostPage, "props": { "method": "patch" }, "meta": { "title": "Редагувати члена журі" } },
	// { path: '/jury', component: JuryPage, meta: { title: "Члени журі" } },
	//
	// { path: "/artist-add", "component": ArtistPostPage, "props": { "method": "post" }, "meta": { "title": "Додати учасника конкурсу" } },
	// { path: "/artist-edit/:item_id", "component": ArtistPostPage, "props": { "method": "patch" }, "meta": { "title": "Редагувати учасника конкурсу" } },
	// { path: '/artists-list', component: ArtistsPage, meta: { title: "Учасники конкурсу" } },
	//
	// { path: "/admin-add", "component": AdminPostPage, "props": { "method": "post" }, "meta": { "title": "Додати адмiнiстратори" } },
	// { path: "/admin-edit/:item_id", "component": AdminPostPage, "props": { "method": "patch" }, "meta": { "title": "Редагувати адмiнiстратори" } },
	// { path: "/administrators", "component": AdminPage, "meta": { "title": "Адмiнiстратори" } },
	//
	//
	// { path: "/records-add/:users_id", "component": RecordsPostPage, "props": { "method": "post" }, "meta": { "title": "Додати запис" } },
	// { path: "/records-edit/:users_id", "component": RecordsPostPage, "props": { "method": "patch" }, "meta": { "title": "Редагувати запис" } },
	// { path: "/records", "component": RecordsPage, "meta": { "title": "Записи" } },
	//
	// { path: "/rates-edit/:item_id", "component": RatesPostPage, "props": { "method": "patch" }, "meta": { "title": "Редагувати коментар" } },
	// { path: "/rates", "component": RatesPage, "meta": { "title": "Оцiнки та кометарi" } },
	//
	//
	// { path: '/*', component: Page404, meta: { title: "Такої сторінки не існує." } },
	// records
	
];


const router = new VueRouter({
    base: '/',
    mode: 'history',	
	routes: routes,
	linkActiveClass: "",
	linkExactActiveClass: "active",	
});

	
router.beforeEach((to, from, next) => {
	
	if ( to.meta ) {
		store.commit("setPageTitle", to.meta.title);
		
		if ( to.meta.role ) store.commit("setPageRole", to.meta.role);
	};
	store.prev_route_path = from.path;
	
	store.commit("setCurrentRoute", to );
	
	next()
})	