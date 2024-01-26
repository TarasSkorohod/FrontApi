
const testPage3 = {
    mixins: [globalMixin],

    data() {
        return {
            wavesurfer: null,
            imagesGlobal:[
                { src: "assets/images/favicon.png", alt: "Опис зображення 2" },
            ],
            galleryImages: [
                { src: "assets/images/favicon.png", alt: "Опис зображення 2" },

            ],
            selectedImageG: null,
            selectedImage: null,
            fullscreenImageSrc: null,
            isGalleryFullscreen: false,
            currentImageIndex: 0,
        };
    },

    mounted() {
        this.initWaveSurfer();
        this.initThumbnailClickHandlers();
        this.showImageGlobal();
        this.showImage(document.querySelector('.modal img'));
    },


    methods: {
        initWaveSurfer() {
            this.wavesurfer = WaveSurfer.create({
                container: "#audiowave",
                waveColor: "#525252",
                progressColor: "#262828",
                height: 150,
                responsive: true,
                hideScrollbar: true,
                cursorColor: "#5d5b5b",
                cursorWidth: 2,
                barWidth: 5,
                barGap: 1.5,
                skipLength: 5
            });

            this.wavesurfer.load("https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3");

            $(".btn-toggle-pause").on("click", () => this.wavesurfer.playPause());
            $(".btn-backward").on("click", () => this.wavesurfer.skipBackward());
            $(".btn-forward").on("click", () => this.wavesurfer.skipForward());
            $(".btn-toggle-mute").on("click", () => this.wavesurfer.toggleMute());
            $(".btn-stop").on("click", () => this.wavesurfer.stop());
        },

        initThumbnailClickHandlers() {
            const thumbnails = document.querySelectorAll('.thumbnail');

            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', () => this.openFullscreen(thumbnail.src));
            });
        },

        openFullscreen(imageSrc) {
            const modal = document.querySelector('.modal');
            const modalImage = modal.querySelector('img');
            modalImage.src = imageSrc;
            modal.style.display = 'flex';
            modal.addEventListener('click', this.closeFullscreen);
        },

        closeFullscreen() {
            const modal = document.querySelector('.modal');
            modal.style.display = 'none';
            modal.removeEventListener('click', this.closeFullscreen);
        },

        selectImage(image) {
            this.selectedImage = image;
        },
        showImageGlobal() {
            const currentImage = this.imagesGlobal[this.currentImageIndex];
            this.$refs.modalImage.src = currentImage.src;
        },
        selectImageG(image) {
            this.selectedImageG = image;
        },
        showImage(modalImage) {
            const currentImage = this.galleryImages[this.currentImageIndex];
            modalImage.src = currentImage.src;
        },

        prevImage() {
            console.log("Prev Image Clicked");
            if (this.currentImageIndex > 0) {
                this.currentImageIndex--;
            } else {
                this.currentImageIndex = this.galleryImages.length - 1;
            }
            const modalImage = document.querySelector('.modal-image');
            console.log("Modal Image Element:", modalImage);
            this.showImage(modalImage);
        },


        nextImage() {
            if (this.currentImageIndex < this.galleryImages.length - 1) {
                this.currentImageIndex++;
            } else {
                this.currentImageIndex = 0;
            }
            this.showImage(document.querySelector('.modal-image'));
        },
    },


template: `

<div class="bb_color">

    <div class="block_text_top">
        <div class="border_bot">
            <p class="color_text_p">
        <span class="color_text_span">
            (Легенда. Зроблено непомітною, щоб не привертати увагу, тому що вона буде однаковою для всіх кейсів)
        </span>Одного разу я вирішив відвідати новий ресторан у місті, який був відомий своєю сучасною кухнею та затишною атмосферою. З почуттям цікавості і голоду, я разом з друзями прийшов у цей заклад. Вже від початку ми помітили, що обслуговування залишає бажати кращого. Офіціанти не були дуже уважними і виявилося складно привернути їхню увагу. Замовлення ми отримали досить швидко, але наше замовлення було неправильним. Одна страва виявилася холодною, інша — не тієї, яку ми замовляли.</p>
        </div>
    </div>

    <div class="text_block_info">
        <span class="data">14 грудня 2023</span>

        <div class="block_text_m">
           <h1 class="title__inform">ПриватБанк. Обслуговування клієнтів</h1>
       </div>
    </div>
    <div class="text_block_p">
        <p class="text_block_info_p">
            (Саммары) Одного разу я вирішив відвідати новий ресторан у місті, який був відомий своєю сучасною кухнею та затишною атмосферою. З почуттям цікавості і голоду, я разом з друзями прийшов у цей заклад.
        </p>
        <p class="text_block_info_p">
            Вже від початку ми помітили, що обслуговування залишає бажати кращого. Офіціанти не були дуже уважними і виявилося складно привернути їхню увагу. Замовлення ми отримали досить швидко, але наше замовлення було неправильним. Одна страва виявилася холодною, інша — не тієї, яку ми замовляли.
        </p>
    </div>


    <div class="audio">
        <div class="player-wrap">
            <div id="audiowave"></div>
            <div class="audio-controls">
                <button type="button" class="btn-toggle-pause">
                    <i class="fa fa-play"></i> <i class="fa fa-pause"></i>
                </button>
                <button type="button" class="btn-stop">
                    <i class="fa fa-stop"></i>
                </button>
            </div>
        </div>
    </div>
   <div class="img">
    <img class="img_bb" :src="imagesGlobal[currentImageIndex].src" :alt="imagesGlobal[currentImageIndex].alt" @click="selectImageG(imagesGlobal[currentImageIndex])">
</div>

    <div>
    
 
       </div>
    <div class="b_grid_im">
        <div class="card-grid">
            <div class="card_g">
                           <img class="thumbnail" v-for="image in galleryImages" :src="image.src" :alt="image.alt" @click="selectImage(image)">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path d="M22.9167 39.5833C32.1214 39.5833 39.5833 32.1214 39.5833 22.9167C39.5833 13.7119 32.1214 6.25 22.9167 6.25C13.7119 6.25 6.25 13.7119 6.25 22.9167C6.25 32.1214 13.7119 39.5833 22.9167 39.5833Z" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M43.75 43.75L34.6875 34.6875" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22.9165 16.6666V29.1666" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.6665 22.9166H29.1665" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        

<!--            <div class="card_g">-->
<!--                           <img class="thumbnail" v-for="image in galleryImages" :src="image.src" :alt="image.alt" @click="selectImage(image)">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">-->
<!--                    <path d="M22.9167 39.5833C32.1214 39.5833 39.5833 32.1214 39.5833 22.9167C39.5833 13.7119 32.1214 6.25 22.9167 6.25C13.7119 6.25 6.25 13.7119 6.25 22.9167C6.25 32.1214 13.7119 39.5833 22.9167 39.5833Z" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M43.75 43.75L34.6875 34.6875" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M22.9165 16.6666V29.1666" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M16.6665 22.9166H29.1665" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                </svg>-->
<!--            </div>-->
<!--            <div class="card_g">-->
<!--                           <img class="thumbnail" v-for="image in galleryImages" :src="image.src" :alt="image.alt" @click="selectImage(image)">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">-->
<!--                    <path d="M22.9167 39.5833C32.1214 39.5833 39.5833 32.1214 39.5833 22.9167C39.5833 13.7119 32.1214 6.25 22.9167 6.25C13.7119 6.25 6.25 13.7119 6.25 22.9167C6.25 32.1214 13.7119 39.5833 22.9167 39.5833Z" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M43.75 43.75L34.6875 34.6875" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M22.9165 16.6666V29.1666" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M16.6665 22.9166H29.1665" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                </svg>-->
<!--            </div>-->
<!--            <div class="card_g">-->
<!--                           <img class="thumbnail" v-for="image in galleryImages" :src="image.src" :alt="image.alt" @click="selectImage(image)">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">-->
<!--                    <path d="M22.9167 39.5833C32.1214 39.5833 39.5833 32.1214 39.5833 22.9167C39.5833 13.7119 32.1214 6.25 22.9167 6.25C13.7119 6.25 6.25 13.7119 6.25 22.9167C6.25 32.1214 13.7119 39.5833 22.9167 39.5833Z" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M43.75 43.75L34.6875 34.6875" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M22.9165 16.6666V29.1666" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M16.6665 22.9166H29.1665" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                </svg>-->
<!--            </div>-->
<!--            <div class="card_g">-->
<!--                           <img class="thumbnail" v-for="image in galleryImages" :src="image.src" :alt="image.alt" @click="selectImage(image)">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">-->
<!--                    <path d="M22.9167 39.5833C32.1214 39.5833 39.5833 32.1214 39.5833 22.9167C39.5833 13.7119 32.1214 6.25 22.9167 6.25C13.7119 6.25 6.25 13.7119 6.25 22.9167C6.25 32.1214 13.7119 39.5833 22.9167 39.5833Z" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M43.75 43.75L34.6875 34.6875" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M22.9165 16.6666V29.1666" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M16.6665 22.9166H29.1665" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                </svg>-->
<!--            </div>-->
<!--         <div class="card_g" v-for="image in galleryImages" :key="image.src" @click="selectImage(image)">-->
<!--                <img class="thumbnail" :src="image.src" :alt="image.alt">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">-->
<!--                    <path d="M22.9167 39.5833C32.1214 39.5833 39.5833 32.1214 39.5833 22.9167C39.5833 13.7119 32.1214 6.25 22.9167 6.25C13.7119 6.25 6.25 13.7119 6.25 22.9167C6.25 32.1214 13.7119 39.5833 22.9167 39.5833Z" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M43.75 43.75L34.6875 34.6875" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M22.9165 16.6666V29.1666" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                    <path d="M16.6665 22.9166H29.1665" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                </svg>-->
<!--            </div>-->

        </div>
    </div>
    <span class="data_bb">14 грудня 2023</span>

    <div class="text_block_info">
    </div>

<!--    card-->
    <h1 class="title">Оцініть, будь ласка, кейс, за тьрома параметрами:</h1>
    <div class="container_c">
        <div class="card_c">
            <p>Обслуговування:</p>
            <div class="rating">
                <div class="rating-item">
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                </div>
            </div>
            <p>Ваша оцінка: <strong class="count">5.0</strong></p>
        </div>
        <div class="card_c">
            <p>Обслуговування:</p>
            <div class="rating">
                <div class="rating-item">
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                </div>
            </div>
            <p>Ваша оцінка: <strong class="count">5.0</strong></p>
        </div>
        <div class="card_c">
            <p>Обслуговування:</p>
            <div class="rating">
                <div class="rating-item">
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>
                    <span class="rating-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="33" viewBox="0 0 24 23" fill="none">
                            <path d="M12 0L15.708 7.37245L24 8.56194L18 14.2974L19.416 22.4L12 18.5725L4.584 22.4L6 14.2974L0 8.56194L8.292 7.37245L12 0Z" fill="#FBB41A"/>
                        </svg>
                    </span>

                </div>
            </div>
            <p>Ваша оцінка: <strong class="count">5.0</strong></p>
        </div>

    </div>
    <div class="btn__bloc">
        <div>
            <button class="btn_green">Зберегти</button>
        </div>
        <div>
            <button class="btn__grey">Перейти до наступного</button>
        </div>
    </div>
    <div class="modal">
        <img>
         <button class="modal-prev" @click="prevImage">&#8249;</button>
<button class="modal-next" @click="nextImage">&#8250;</button>

    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
       
    </svg>
    </div>


</div>


    `,
};
