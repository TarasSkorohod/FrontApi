<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="shortcut icon" type="image/png" href="/assets/images/icon-fest.png"/>
	
	<!-- Global stylesheets -->
	<link href="./assets/fonts/inter/inter.css" rel="stylesheet" type="text/css">
	<link href="./assets/icons/phosphor/styles.min.css" rel="stylesheet" type="text/css">
	<link href="./assets/css/ltr/all.min.css" id="stylesheet" rel="stylesheet" type="text/css">
	<link href="./assets/css/ltr/styles.css" id="stylesheet" rel="stylesheet" type="text/css">
	<!-- /global stylesheets -->
<!--    <link href="./assets/css/style2.css">-->
<!---->
    <link href="./assets/css/style2.css" id="stylesheet" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">

	<!-- Core JS files -->
	<script src="./assets/js/bootstrap/bootstrap.bundle.min.js"></script>
	<!-- /core JS files -->

	<!-- Theme JS files -->
	<script src="./assets/js/jquery/jquery.min.js"></script>
<!--	 <script src="./assets/js/vendor/forms/selects/select2.min.js"></script> -->
	<script src="./assets/js/app.js"></script>
	<!-- <script src="../../../assets/demo/pages/form_layouts.js"></script> -->
	<!-- /theme JS files -->
	
	<!-- Vue JS files -->
	<script src="./assets/js/vue/axios.min.0.19.2.js"></script>
	<script src="./assets/js/vue/vue-dist.2.6.11.js"></script>
	<script src="./assets/js/vue/vuex.3.6.2.js"></script>
	<script src="./assets/js/vue/vue-router.3.3.1.min.js"></script>
	<!-- /vue JS files -->
    <link rel="stylesheet" href="./assets/file/datatables.net-bs4/dataTables.bootstrap4.css">

	<script src="./assets/js/plugins/awesome-notifications/index.js"></script>
	<link href="./assets/js/plugins/awesome-notifications/style.css" rel="stylesheet" type="text/css">
	
	<script src="./assets/js/plugins/moment/moment.2.27.0.min.js"></script>
	<script src="./assets/js/plugins/moment/uk.min.js"></script>
	
	<!-- D3 files -->
	<script src="./assets/js/plugins/d3/d3.min.js"></script>
	<script src="./assets/js/plugins/d3/d3_tooltip.js"></script>
	<!-- /d3 files -->
	

	<script src="./vue/vue.utils.js?v<?=time()?>"></script>

	<script src="./assets/js/plugins/datatables/datatables.min.js"></script>
	<!-- <script src="/assets/js/plugins/datatables/extensions/jszip/jszip.min.js"></script> -->
	<script src="./assets/js/plugins/datatables/extensions/pdfmake/pdfmake.min.js"></script>
	<script src="./assets/js/plugins/datatables/extensions/pdfmake/vfs_fonts.min.js"></script>
	<script src="./assets/js/plugins/datatables/extensions/buttons.min.js"></script>


	<!-- Inno uploader -->
	<link href="./assets/js/plugins/fileuploader-2.2/dist/font/font-fileuploader.css" media="all" rel="stylesheet">
	<link href="./assets/js/plugins/fileuploader-2.2/dist/jquery.fileuploader.min.css" media="all" rel="stylesheet">
	<script src="./assets/js/plugins/fileuploader-2.2/dist/jquery.fileuploader.min.js" type="text/javascript"></script>
	<link href="./assets/js/plugins/fileuploader-2.2/dist/script.css" media="all" rel="stylesheet">
	<link href="./assets/js/plugins/fileuploader-2.2/examples/thumbnails/css/jquery.fileuploader-theme-thumbnails.css" media="all" rel="stylesheet">
	<link href="./assets/js/plugins/fileuploader-2.2/examples/gallery/css/jquery.fileuploader-theme-gallery.css" media="all" rel="stylesheet">
	<link href="./assets/js/plugins/fileuploader-2.2/examples/avatar/css/jquery.fileuploader-theme-avatar.css" media="all" rel="stylesheet">
	<!--/ inno uploader -->
	


    <!-- DevExtreme 
    <link rel="stylesheet" href="https://cdn3.devexpress.com/jslib/21.2.7/css/dx.light.css">
    <script type="text/javascript" src="https://cdn3.devexpress.com/jslib/21.2.7/js/dx.all.js"></script>	
	-->

	<script src="./vue/store/vue-store-alert.js?v<?=time()?>"></script>
	<script src="./vue/store/vue-store-account.js?v<?=time()?>"></script>
	<script src="./vue/store/vue-store-demo.js?v<?=time()?>"></script>
	<script src="./vue/store/vue-store.js?v<?=time()?>"></script>


</head>

<body>

<div id="vue-app-container" style="overflow-y: auto" v-cloak>


    <!-- Main navbar -->
    <div v-if="auth" class="navbar navbar-dark navbar-expand-lg navbar-static border-bottom border-bottom-white border-opacity-10">


        <div class="container-fluid">
            <div class="d-flex d-lg-none me-2">
                <button type="button" class="navbar-toggler sidebar-mobile-main-toggle rounded-pill">
                    <i class="ph-list"></i>
                </button>
            </div>

            <div class="navbar-brand flex-1 flex-lg-0" style="padding-top: 2px;padding-bottom: 5px;font-size: 18px;">
                <router-link to="/" aria-current="page" class="d-inline-flex align-items-center active " style="color: white;">
                    <img src="/assets/images/favicon.png" alt="" style="margin-right: 15px;margin-top: 4px;height: 28px;">
                    <span>Особистий кабінет</span>
                </router-link>
            </div>


            <ul class="nav flex-row">
                <li class="nav-item d-lg-none">
                    <a href="#navbar_search" class="navbar-nav-link navbar-nav-link-icon rounded-pill" data-bs-toggle="collapse">
                        <i class="ph-magnifying-glass"></i>
                    </a>
                </li>


                <color-scheme></color-scheme>


            </ul>

            <div class="navbar-collapse justify-content-center flex-lg-1 order-2 order-lg-1 collapse" id="navbar_search" style="visibility: hidden">
                <div class="navbar-search flex-fill position-relative mt-2 mt-lg-0 mx-lg-3">

                    <a href="#" class="navbar-nav-link align-items-center justify-content-center w-40px h-32px rounded-pill position-absolute end-0 top-50 translate-middle-y p-0 me-1" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                        <i class="ph-faders-horizontal"></i>
                    </a>


                    <!--- search -->
                </div>
            </div>

            <ul class="nav flex-row justify-content-end order-1 order-lg-2">


                <li class="nav-item nav-item-dropdown-lg dropdown ms-lg-2">
                    <a href="#" class="navbar-nav-link align-items-center rounded-pill p-1" data-bs-toggle="dropdown">
                        <div class="status-indicator-container">
                            <img :src=" avatar_src " class="w-32px h-32px rounded-pill" alt="">
                            <span class="status-indicator bg-success"></span>
                            <!--
                            <i class="ph-user-circle"></i>
                            <span class="status-indicator bg-success"></span>
                            -->
                        </div>
                        <span class="d-none d-lg-inline-block mx-lg-2">{{name}}</span>
                    </a>

                    <div class="dropdown-menu dropdown-menu-end">
                        <a @click.prevent=" $store.dispatch('account/deleteAuth') " href="#" class="dropdown-item">
                            <i class="ph-sign-out me-2"></i>
                            Вийти
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <!-- /main navbar -->
    <!-- Main navbar -->
    <div v-else class="navbar navbar-dark navbar-static py-2">
        <div class="container-fluid">

            <div class="navbar-brand" style="padding-top: 2px;padding-bottom: 5px;font-size: 18px;">
                <router-link to="/" aria-current="page" class="d-inline-flex align-items-center active " style="color: white;">
                    <img src="/assets/images/favicon.png" alt="" style="margin-right: 15px;margin-top: 4px;height: 28px;">
                    <span>Особистий кабінет</span>
                </router-link>
            </div>

            <!--
            <div class="navbar-brand">
                <router-link to="/" class="d-inline-flex align-items-center">
                    <img src="/assets/images/logo_icon.svg" alt="">
                    <img src="/assets/images/logo_text_light.svg" class="d-none d-sm-inline-block h-16px ms-3" alt="">
                </a>
            </div>
            -->

            <div class="d-flex justify-content-end align-items-center ms-auto">

                <ul class="nav flex-row">
                    <color-scheme drop_pos='left'></color-scheme>
                    <!--
                    <li class="nav-item">
                        <a href="#" class="navbar-nav-link navbar-nav-link-icon rounded ms-1">
                            <div class="d-flex align-items-center mx-md-1">
                            <i class="ph-lifebuoy"></i>
                            <span class="d-none d-md-inline-block ms-2">Support</span>
                        </div>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="navbar-nav-link navbar-nav-link-icon rounded ms-1">
                            <div class="d-flex align-items-center mx-md-1">
                            <i class="ph-user-circle-plus"></i>
                            <span class="d-none d-md-inline-block ms-2">Register</span>
                        </div>
                        </a>
                    </li>
                    -->
                    <li class="nav-item">
                        <router-link to="/login" class="navbar-nav-link navbar-nav-link-icon rounded ms-1">
                            <div class="d-flex align-items-center mx-md-1">
                                <i class="ph-user-circle"></i>
                                <span class="d-none d-md-inline-block ms-2">Увійти</span>
                            </div>
                        </router-link>
                    </li>


                </ul>

            </div>
        </div>
    </div>
    <!-- /main navbar -->


    <!-- Page content -->
    <div class="page-content">

        <!-- Main sidebar -->

        <!-- /main sidebar -->


        <!-- Main content -->
        <div class="content-wrapper">

            <!-- Inner content -->
            <div class="content-inner">

                <!-- Page header -->
                <div v-if="auth" class="page-header page-header-light shadow">
                    <div class="page-header-content d-lg-flex">
                        <div class="d-flex">
                            <h4 class="page-title mb-0">
                                {{page_title}}
                            </h4>

                            <a href="#page_header" class="btn btn-light align-self-center collapsed d-lg-none border-transparent rounded-pill p-0 ms-auto" data-bs-toggle="collapse">
                                <i class="ph-caret-down collapsible-indicator ph-sm m-1"></i>
                            </a>
                        </div>

                        <div class="collapse d-lg-block my-lg-auto ms-lg-auto" id="page_header">
                            <div class="d-sm-flex align-items-center mb-3 mb-lg-0 ms-lg-3">

                            </div>
                        </div>
                    </div>

                    <div class="page-header-content d-lg-flex border-top">
                        <div class="d-flex">

                            <div class="breadcrumb py-2">
                                <router-link to="/" class="breadcrumb-item"><i class="ph-house"></i></router-link>
                                <router-link to="/" class="breadcrumb-item">Головна</router-link>
                                <span v-if=" currentRoute.path != '/' " class="breadcrumb-item active">{{page_title}}</span>
                            </div>


                        </div>


                        <div class="collapse d-lg-block ms-lg-auto" id="breadcrumb_elements">

                            <div v-if=" role == 'admin' " class="d-lg-flex mb-2 mb-lg-0">
                                <router-link to="/rates" class="d-flex align-items-center text-body py-2">
                                    <i class="ph-circle-wavy-check  me-2"></i>Коментарі
                                </router-link>
                                <router-link to="/records" class="d-flex align-items-center text-body py-2 ms-4">
                                    <i class="ph-headset    me-2"></i>Записи
                                </router-link>
                                <router-link to="/companies" class="d-flex align-items-center text-body py-2 ms-4">
                                    <i class="ph-shopping-bag   me-2"></i>Компанії
                                </router-link>

                                <router-link to="/jury" class="d-flex align-items-center text-body py-2 ms-4">
                                    <i class="ph-user-circle-gear    me-2"></i>Журі
                                </router-link>
                                <router-link to="/artists-list" class="d-flex align-items-center text-body py-2 ms-4">
                                    <i class="ph-user-square    me-2"></i>Учасники
                                </router-link>
                                <router-link to="/administrators" class="d-flex align-items-center text-body py-2 ms-4">
                                    <i class="ph-user    me-2"></i>Адмiнiстратори
                                </router-link>
                            </div>


                        </div>

                    </div>
                </div>
                <!-- /page header -->


                <!-- Content area -->
                <div class="content">
                    <!-- Content area -->

                    <template v-if = " role === undefined "></template>
                    <page-login v-else-if=" role == 'public' && currentRoute.path == '/login' "></page-login>
                    <page-home v-else-if=" role == 'public' "></page-home>
                    <router-view v-else></router-view>




                    <router-view></router-view>

                    <router-view v-if="auth === true"></router-view>
                    <page-login v-else-if=" currentRoute && currentRoute.path == '/login' "></page-login>
                    <page-public v-else></page-public>




                    <!-- /content area -->
                </div>
                <!-- /content area -->


                <!-- Footer -->
                <div v-if="auth" class="navbar navbar-sm navbar-footer border-top" style="padding-bottom: 15px;padding-top: 15px;">
                    <div class="container-fluid">
                        <span>&copy; 2023</span>

                        <ul class="nav">
                            <!--
                            <li class="nav-item">
                                <a href="https://kopyov.ticksy.com/" class="navbar-nav-link navbar-nav-link-icon rounded" target="_blank">
                                    <div class="d-flex align-items-center mx-md-1">
                                        <i class="ph-lifebuoy"></i>
                                        <span class="d-none d-md-inline-block ms-2">Support</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item ms-md-1">
                                <a href="https://demo.interface.club/limitless/demo/Documentation/index.html" class="navbar-nav-link navbar-nav-link-icon rounded" target="_blank">
                                    <div class="d-flex align-items-center mx-md-1">
                                        <i class="ph-file-text"></i>
                                        <span class="d-none d-md-inline-block ms-2">Docs</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item ms-md-1">
                                <a href="https://themeforest.net/item/limitless-responsive-web-application-kit/13080328?ref=kopyov" class="navbar-nav-link navbar-nav-link-icon text-primary bg-primary bg-opacity-10 fw-semibold rounded" target="_blank">
                                    <div class="d-flex align-items-center mx-md-1">
                                        <i class="ph-shopping-cart"></i>
                                        <span class="d-none d-md-inline-block ms-2">Purchase</span>
                                    </div>
                                </a>
                            </li>
                            -->
                        </ul>
                    </div>
                </div>
                <!-- /footer -->

            </div>
            <!-- /inner content -->

        </div>
        <!-- /main content -->

    </div>
    <!-- /page content -->



</div>

	<script src="./vue/func.js?v<?=time()?>"></script>
	<script src="./assets/js/delphi.js?v<?=time()?>"></script>

	<script src="./vue/components/global-mixin.js?v<?=time()?>"></script>
	<script src="./vue/components/color-scheme.js?v<?=time()?>"></script>
	<script src="./vue/components/v-datatable.js?v<?=time()?>"></script>

	<script src="./vue/components/inno-uploader.js?v<?=time()?>"></script>
	<script src="./vue/components/thumbnails-inno-uploader.js?v<?=time()?>"></script>
	<script src="./vue/components/gallery-inno-uploader.js?v<?=time()?>"></script>
	<script src="./vue/components/avatar-inno-uploader.js?v<?=time()?>"></script>
	<!-- <script .src="/vue/components/star-rating.js?v<?=time()?>"></script>	 -->
	<script src="./vue/components/v-chat.js?v<?=time()?>"></script>
	<script src="./vue/components/v-media.js?v<?=time()?>"></script>

	<script src="./vue/components/artist-left-column.js?v<?=time()?>"></script>
	<script src="./vue/components/last-rates.js?v<?=time()?>"></script>
	<script src="./vue/components/b-vote.js?v<?=time()?>"></script>

	<script src="./vue/components/page-wrapper.js?v<?=time()?>"></script>
	<script src="./vue/components/b-page403.js?v<?=time()?>"></script>
	<script src="./vue/components/b-page404.js?v<?=time()?>"></script>
	<script src="./vue/components/b-page404res.js?v<?=time()?>"></script>

	<script src="./vue/components/records-list.js?v<?=time()?>"></script>
	<script src="./vue/components/media-list.js?v<?=time()?>"></script>
	<script src="./vue/components/rates-list.js?v<?=time()?>"></script>

	<script src="./vue/pages/NestedPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/HomePage.js?v<?=time()?>"></script>
	<script src="./vue/pages/LoginPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/UsersPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/FinancesTablePages.js?v<?=time()?>"></script>
    <script src="./vue/pages/segmentsPages.js?v<?=time()?>"></script>
    <script src="vue/pages/ServicePages.js?v<?=time()?>"></script>

	<script src="./vue/pages/Page404.js?v<?=time()?>"></script>

	<script src="./vue/pages/ArtistPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/RecordPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/MediesPage.js?v<?=time()?>"></script>

	<script src="./vue/pages/CompaniesPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/CompaniesPostPage.js?v<?=time()?>"></script>
	<!-- <script .src="/vue/pages/CompaniesPatchPage.js?v<?=time()?>"></script> -->

	<script src="./vue/pages/JuryPostPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/JuryPage.js?v<?=time()?>"></script>

	<script src="./vue/pages/ArtistPostPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/ArtistsPage.js?v<?=time()?>"></script>

	<script src="./vue/pages/AdminPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/AdminPostPage.js?v<?=time()?>"></script>

	<script src="./vue/pages/RecordsPostPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/RecordsPage.js?v<?=time()?>"></script>

	<script src="./vue/pages/RatesPostPage.js?v<?=time()?>"></script>
	<script src="./vue/pages/RatesPage.js?v<?=time()?>"></script>
	
	

	<script src="./vue/vue-router.js?v<?=time()?>"></script>
	<script src="./vue/vue-app.js?v<?=time()?>"></script>
<!---->
<!--    <script src="./assets/file/searchInput.js"></script>-->
<!--    <script src="./vendors/base/vendor.bundle.base.js"></script>-->
<!--    <script src="./vendors/datatables.net-bs4/dataTables.bootstrap4.js"></script>-->
<!--    <script src="./js/off-canvas.js"></script>-->
    <script src="./assets/file/datatables.net/jquery.dataTables.js"></script>
<script src="https://unpkg.com/wavesurfer.js"></script>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
</body>
</html>
