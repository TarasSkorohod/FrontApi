"use strict";

Vue.component('inno-uploader', {
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		value: { required: true },	
		editable: { type: Boolean, default: true },
		

		
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			items: [],
		}
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				computed
	computed: {
		
		editable_class() { return this.editable ? "" : "not-editable" },
		
		comp_value() {
			if ( this.value == "" ) return "";
			
			this.items = this.value;
			let res = JSON.stringify( this.value );

			return res;
		},		

	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				methods
	methods: {
		
		
		addData( data, item ) {
			
			if ( data.isSuccess && data.files[0] ) {
				let save_res = {
					name: item.name,
					size: item.size,
					title: item.title,
					file: '/uploads/' + item.name,
					type: item.type
				};
				
				this.items.push( save_res );
				
				console.info( this.items );
				
				this.$emit( 'input', this.items );
			};				
		},
		
		
		removeItem( name ) {
			let index = this.items.findIndex( item => item.name == name);
			if ( index != -1 ) {
				this.items.splice(index, 1);
				console.info( this.items );
				this.$emit( 'input', this.items );
			};
		},
		
		
		
		createPlugin() {
			
			let el = this.$refs.el;
			let Vue = this;
			
			var remove_btn1 = 	Vue.editable ? 
								   '<div class="actions-holder">' +
									   '<button type="button" class="fileuploader-action fileuploader-action-remove" title="${captions.remove}"><i class="fileuploader-icon-remove"></i></button>' +
								   '</div>' : "";
				
			var remove_btn2 = 	Vue.editable ? 
									  '<button type="button" class="fileuploader-action fileuploader-action-remove" title="${captions.remove}"><i class="fileuploader-icon-remove"></i></button>' : "";
									  
			var remove_btn3 = 	Vue.editable ? 
									  '<li>' +
										  '<button data-action="remove">' + 
											  '<i class="fileuploader-icon-trash"></i> ${captions.remove}' + 
										  '</button>' + 
									  '</li>' : "";							   
								   

			
			$( el ).fileuploader({
				limit: 20,
				maxSize: 50,
			

				changeInput: ' ',
				theme: 'thumbnails',
				enableApi: true,
				addMore: true,
				
				
				
				// changeInput: false,
				
				
				thumbnails: {
					box: '<div class="fileuploader-items">' +
							  '<ul class="fileuploader-items-list">' +
								  '<li class="fileuploader-thumbnails-input"><div class="fileuploader-thumbnails-input-inner"><i>+</i></div></li>' +
							  '</ul>' +
						  '</div>',
					item: '<li class="fileuploader-item">' +
							   '<div class="fileuploader-item-inner">' +
								   '<div class="type-holder">${extension}</div>' +
								   
								   remove_btn1 + 
								   
								   '<div class="thumbnail-holder">' +
									   '${image}' +
									   '<span class="fileuploader-action-popup"></span>' +
								   '</div>' +
								   '<div class="content-holder"><h5>${name}</h5><span>${size2}</span></div>' +
								   '<div class="progress-holder">${progressBar}</div>' +
							   '</div>' +
						  '</li>',
					item2: '<li class="fileuploader-item">' +
							   '<div class="fileuploader-item-inner">' +
								   '<div class="type-holder">${extension}</div>' +
								   
								   
								   '<div class="actions-holder">' + 
									   '<a href="${file}" class="fileuploader-action fileuploader-action-download" title="${captions.download}" download><i class="fileuploader-icon-download"></i></a>' + 
										remove_btn2 + 									  
								   '</div>' + 

								   '<div class="thumbnail-holder">' +
									   '${image}' +
									   '<span class="fileuploader-action-popup"></span>' +
								   '</div>' +
								   '<div class="content-holder"><h5 title="${name}">${name}</h5><span>${size2}</span></div>' +
								   '<div class="progress-holder">${progressBar}</div>' +
							   '</div>' +
						   '</li>',
					startImageRenderer: true,
					canvasImage: false,
					_selectors: {
						list: '.fileuploader-items-list',
						item: '.fileuploader-item',
						start: '.fileuploader-action-start',
						retry: '.fileuploader-action-retry',
						remove: '.fileuploader-action-remove'
					},
					onItemShow: function(item, listEl, parentEl, newInputEl, inputEl) {
						var plusInput = listEl.find('.fileuploader-thumbnails-input'),
							api = $.fileuploader.getInstance(inputEl.get(0));
						
						plusInput.insertAfter(item.html)[api.getOptions().limit && api.getChoosedFiles().length >= api.getOptions().limit ? 'hide' : 'show']();
						
						if(item.format == 'image') {
							item.html.find('.fileuploader-item-icon').hide();
						}
					},
					onItemRemove: function(html, listEl, parentEl, newInputEl, inputEl) {
						var plusInput = listEl.find('.fileuploader-thumbnails-input'),
							api = $.fileuploader.getInstance(inputEl.get(0));
					
						html.children().animate({'opacity': 0}, 200, function() {
							html.remove();
							
							if (api.getOptions().limit && api.getChoosedFiles().length - 1 < api.getOptions().limit)
								plusInput.show();
						});
					},
					
					// popup 
					
					popup: {
						// popup append to container {String, jQuery Object}
						container: 'body',

						// enable arrows {Boolean}
						arrows: true,

						// loop the arrows {Boolean}
						loop: true,

						// popup HTML {String, Function}
						template: function(data) { return '<div class="fileuploader-popup-preview">' +
						  '<button class="fileuploader-popup-move" data-action="prev"><i class="fileuploader-icon-arrow-left"></i></button>' +
						  '<div class="fileuploader-popup-node  node-image is-zoomed ${format}">' +
							  '${reader.node}' +
						  '</div>' +
						  '<div class="fileuploader-popup-content">' +
							  '<div class="fileuploader-popup-footer">' +
								  '<ul class="fileuploader-popup-tools">' +
									  (data.format == 'image' && data.reader.node && data.editor ? (data.editor.cropper ? '<li>' +
										  '<button data-action="crop">' +
											  '<i class="fileuploader-icon-crop"></i> ${captions.crop}' +
										  '</button>' +
									  '</li>' : '') +
									  (data.editor.rotate ? '<li>' +
										  '<button data-action="rotate-cw">' +
											  '<i class="fileuploader-icon-rotate"></i> ${captions.rotate}' +
										  '</button>' +
									  '</li>' : '') : ''
									  ) +
									  (data.format == 'image' ?
									  '<li class="fileuploader-popup-zoomer">' +
										  '<button data-action="zoom-out">&minus;</button>' +
										  '<input type="range" min="0" max="100" value="50">' +
										  '<button data-action="zoom-in">&plus;</button>' +
										  '<span></span> ' +
									  '</li>' : ''
									  ) +
									  (data.data.url ? '<li>' +
										  '<a href="'+ data.file +'" data-action target="_blank">' +
											  '<i class="fileuploader-icon-external"></i> ${captions.open}' +
										  '</a>' +
									  '</li>' : ''
									  ) +
									  remove_btn3 + 
								  '</ul>' +
							  '</div>' +
							  '<div class="fileuploader-popup-header">' +
								  '<ul class="fileuploader-popup-meta">' +
									  '<li>' +
										  '<span>${captions.name}:</span>' +
										  '<h5>${name}</h5>' +
									  '</li>' +
									  '<li>' +
										  '<span>${captions.type}:</span>' +
										  '<h5>${extension.toUpperCase()}</h5>' +
									  '</li>' +
									  '<li>' +
										  '<span>${captions.size}:</span>' +
										  '<h5>${size2}</h5>' +
									  '</li>' +
									  (data.reader && data.reader.width ? '<li>' +
										  '<span>${captions.dimensions}:</span>' +
										  '<h5>${reader.width}x${reader.height}px</h5>' +
									  '</li>' : ''
									  ) +
									  (data.reader && data.reader.duration ? '<li>' +
										  '<span>${captions.duration}:</span>' +
										  '<h5>${reader.duration2}</h5>' +
									  '</li>' : ''
									  ) +
								  '</ul>' +
								  '<div class="fileuploader-popup-info"></div>' +
								  '<ul class="fileuploader-popup-buttons">' +
									  '<li><button class="fileuploader-popup-button" data-action="cancel">${captions.cancel}</a></li>' +
									  (data.editor ? '<li><button class="fileuploader-popup-button button-success" data-action="save">${captions.confirm}</button></li>' : ''
									  ) +
								  '</ul>' +
							  '</div>' +
						  '</div>' +
						  '<button class="fileuploader-popup-move" data-action="next"><i class="fileuploader-icon-arrow-right"></i></button>' +
					  '</div>'; },
					  
						// Callback fired after creating the popup
						// we will trigger by default buttons with custom actions
						onShow: function(item) {
							item.popup.html.on('click', '[data-action="remove"]', function(e) {
								item.popup.close();
								item.remove();
							}).on('click', '[data-action="cancel"]', function(e) {
								item.popup.close();
							}).on('click', '[data-action="save"]', function(e) {
								if (item.editor)
									item.editor.save();
								if (item.popup.close)
									item.popup.close();
							});
						},

						// Callback fired after closing the popup
						onHide: null					  
					  
					},					
				
				
				
				
				
				
				},
				dragDrop: {
					container: '.fileuploader-thumbnails-input'
				},
				afterRender: function(listEl, parentEl, newInputEl, inputEl) {
					var plusInput = listEl.find('.fileuploader-thumbnails-input'),
						api = $.fileuploader.getInstance(inputEl.get(0));
				
					plusInput.on('click', function() {
						api.open();
					});
					
					api.getOptions().dragDrop.container = plusInput;
				},
				
				
				
				upload: {
					url: '/php/ajax_upload_file.php',
					data: { a:1, b: 2},
					type: 'POST',
					enctype: 'multipart/form-data',
					start: true,
					synchron: true,
					beforeSend: null,
					onSuccess: function(result, item) {
						

						var data = {};
						
						// get data
						if (result && result.files)
							data = result;
						else
							data.hasWarnings = true;
						
						// if success
						if (data.isSuccess && data.files[0]) {
							item.name = data.files[0].name;
							item.html.find('.column-title > div:first-child').text(data.files[0].name).attr('title', data.files[0].name);
						}
						
						// if warnings
						if (data.hasWarnings) {
							for (var warning in data.warnings) {
								alert(data.warnings[warning]);
							}
							
							item.html.removeClass('upload-successful').addClass('upload-failed');
							// go out from success function by calling onError function
							// in this case we have a animation there
							// you can also response in PHP with 404
							return this.onError ? this.onError(item) : null;
						}
						
						Vue.addData( data, item );
						
						item.html.find('.fileuploader-action-remove').addClass('fileuploader-action-success');
						setTimeout(function() {
							item.html.find('.progress-bar2').fadeOut(400);
						}, 400);
						
						
						
					},
					onError: function(item) {
						var progressBar = item.html.find('.progress-bar2');
						
						if(progressBar.length) {
							progressBar.find('span').html(0 + "%");
							progressBar.find('.fileuploader-progressbar .bar').width(0 + "%");
							item.html.find('.progress-bar2').fadeOut(400);
						}
						
						item.upload.status != 'cancelled' && item.html.find('.fileuploader-action-retry').length == 0 ? item.html.find('.column-actions').prepend(
							'<button type="button" class="fileuploader-action fileuploader-action-retry" title="Retry"><i class="fileuploader-icon-retry"></i></button>'
						) : null;
					},
					onProgress: function(data, item) {
						var progressBar = item.html.find('.progress-bar2');
						
						if(progressBar.length > 0) {
							progressBar.show();
							progressBar.find('span').html(data.percentage + "%");
							progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + "%");
						}
					},
					onComplete: null,
				},
				onRemove: function(item) {
					$.post('./php/ajax_remove_file.php', {
						file: item.name
					});
					
					Vue.removeItem( item.name );
				},
				captions: $.extend(true, {}, $.fn.fileuploader.languages['en'], {
					feedback: 'Drag and drop files here',
					feedback2: 'Drag and drop files here',
					drop: 'Drag and drop files here',
					or: 'or',
					button: 'Browse files',
				}),
			});			
			
		},
		
	},	
	
	mounted() {
		
		if (document.readyState === "complete") {
			this.createPlugin();
		} else {
			window.addEventListener("DOMContentLoaded", this.createPlugin());
		}
		
	},
	
	
	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `

	<div class="fileuploader-wrapper" :class="editable_class">
		<input :data-fileuploader-files="comp_value" type="file" name="files" class="files" ref="el">
	</div>





`
});


