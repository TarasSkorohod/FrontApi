"use strict";

Vue.component('color-scheme', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		drop_pos: { default: "right" },
		theme: { default: "light" },
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {

		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		
        primaryTheme() { return this.theme },
        secondaryTheme() { return this.theme == 'dark' ? 'light' : 'dark'  },
        storageKey() { return 'theme' },
        colorscheme() { return document.getElementsByName('main-theme') },
        mql() { return window.matchMedia('(prefers-color-scheme: ' + this.primaryTheme + ')') },
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {

        // Handles the media query evaluation, so it expects a media query as parameter
        autoTheme(e) {
            var current = localStorage.getItem( this.storageKey );
            var mode = this.primaryTheme;
            var indicate = this.primaryTheme;
            // User set preference has priority
            if ( current != null) {
                indicate = mode = current;
            }
            else if (e != null && e.matches) {
                mode = primaryTheme;
            }
            this.applyTheme(mode);
            this.indicateTheme(indicate);
            setTimeout(function() {
                document.documentElement.classList.remove('no-transitions');
            }, 100);
        },

		
        indicateTheme(mode) {
			
			let colorscheme = this.colorscheme;
			
            for(var i = colorscheme.length; i--; ) {
                if(colorscheme[i].value == mode) {
                    colorscheme[i].checked = true;
                    colorscheme[i].closest('.list-group-item').classList.add('bg-primary', 'bg-opacity-10', 'border-primary');
                }
                else {
                    colorscheme[i].closest('.list-group-item').classList.remove('bg-primary', 'bg-opacity-10', 'border-primary');
                }
            }
        },

        // Turns alt stylesheet on/off
        applyTheme(mode) {
            var st = document.documentElement;
            if (mode == this.primaryTheme) {
                st.removeAttribute('data-color-theme');
            }
            else if (mode == this.secondaryTheme) {
                st.setAttribute('data-color-theme', 'dark');
            }
            else {
                if (!this.mql.matches) {
                    st.setAttribute('data-color-theme', 'dark');
                }
                else {
                    st.removeAttribute('data-color-theme');
                }
            }
        },
		
        // Handles radiobutton clicks
        setTheme( mode ) {
			// console.log( "setTheme( ${mode} )" );
			
            document.documentElement.classList.add('no-transitions');
            if ((mode == this.primaryTheme)) {
                localStorage.removeItem( this.storageKey );
            }
            else {
				// console.log( this.storageKey, mode );
                localStorage.setItem( this.storageKey, mode);
            }
            // When the auto button was clicked the auto-switcher needs to kick in
            this.autoTheme( this.mql );
        },

		
		createPlugin() {
			
			((localStorage.getItem('theme') == 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage.getItem('theme') == 'dark') && document.documentElement.setAttribute('data-color-theme', 'dark');
			localStorage.getItem('direction') == 'rtl' && document.getElementById("stylesheet").setAttribute('href', 'assets/css/rtl/all.min.css');
			localStorage.getItem('direction') == 'rtl' && document.documentElement.setAttribute('dir', 'rtl');

			this.autoTheme();	
		},		

		
	},	
	
	mounted() {
		
		this.createPlugin();
		
	},
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
	
					<li class="nav-item nav-item-dropdown-lg dropdown ms-lg-2">
						<a href="#" class="navbar-nav-link navbar-nav-link-icon rounded-pill" data-bs-toggle="dropdown" data-bs-auto-close="outside">
							<i class="ph-sun"></i>
						</a>

						<div class="dropdown-menu wmin-lg-400 p-0" :style=" drop_pos == 'left' ?  'right: 0; left: auto' : ''">
							<div class="d-flex align-items-center p-3">
								<h6 class="mb-0">Color mode</h6>
							</div>

							<div class="dropdown-menu-scrollable pb-2">
								<a @click=" setTheme('light') " href="#" class="list-group-item dropdown-item align-items-start text-wrap py-2">
									<div class="status-indicator-container me-3">
										<i class="ph-sun p-2"></i>
									</div>

									<div class="flex-1">
										<span class="fw-semibold">Light theme</span>
										<span class="text-muted float-end fs-sm px-3">
											<input type="radio" class="form-check-input cursor-pointer ms-auto" name="main-theme" value="light">
										</span>
										<div class="text-muted">Set light theme or reset to default</div>
									</div>
								</a>
								
								<a @click=" setTheme('dark') " href="#" class="list-group-item dropdown-item align-items-start text-wrap py-2">
									<div class="status-indicator-container me-3">
										<i class="ph-moon p-2"></i>
									</div>

									<div class="flex-1">
										<span class="fw-semibold">Dark theme</span>
										<span class="text-muted float-end fs-sm px-3">
											<input type="radio" class="form-check-input cursor-pointer ms-auto" name="main-theme" value="dark">
										</span>
										<div class="text-muted">Switch to dark theme</div>
									</div>
								</a>								

								<a @click=" setTheme('auto') " href="#" class="list-group-item dropdown-item align-items-start text-wrap py-2">
									<div class="status-indicator-container me-3">
										<i class="ph-translate p-2"></i>
									</div>

									<div class="flex-1">
										<span class="fw-semibold">Auto theme</span>
										<span class="text-muted float-end fs-sm px-3">
											<input type="radio" class="form-check-input cursor-pointer ms-auto" name="main-theme" value="auto">
										</span>
										<div class="text-muted">Set theme based on system mode</div>
									</div>
								</a>

							</div>

						</div>
					</li>	

`
});


