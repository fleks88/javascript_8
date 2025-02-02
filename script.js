document.addEventListener("DOMContentLoaded", () => {
    const crosswalk = {
        road: document.querySelector(".road"),
        roadElements: document.querySelectorAll('.road > div'),
        white: document.querySelectorAll('.white_color'),
        modal: document.getElementById("modal"),
        openModalBtn: document.getElementById("openModalBtn"),
        submitDirectionBtn: document.getElementById("submitDirection"),
        greenLight: document.querySelector(".green"),
        zebraInterval: null,


        init() {
            this.road.style.border = "2px solid black";
            
            this.roadElements.forEach((element) => {
                if (element.classList.contains('black_color')) {
                    element.style.backgroundColor = 'black';
                }
            });

            this.addEventListeners();
        },

        changeTheLight(e) {
            if (e.previousElementSibling) {
                e.previousElementSibling.classList.remove('active');
            } else if (e.nextElementSibling) {
                e.nextElementSibling.classList.remove('active');
            }

            e.classList.add('active');
        },

        startZebraFlashing() {
            let toggleRed = true;

            this.zebraInterval = setInterval(() => {
                document.querySelectorAll('.white_color').forEach((element) => {
                    if (toggleRed) {
                        element.classList.add('red');
                    } else {
                        element.classList.remove('red');
                    }
                });

                toggleRed = !toggleRed;
            }, 300);

            setTimeout(() => {
                clearInterval(this.zebraInterval);
                document.querySelectorAll('.white_color').forEach((element) => {
                    element.classList.remove('red');
                });
            }, 2000);
        },

        openModal() {
            this.modal.style.display = "block";
        },

        closeModal() {
            this.modal.style.display = "none";
        },

        checkGreenLight() {
            if (this.greenLight.classList.contains('active')) {
                this.openModal();
            } else {
                this.startZebraFlashing();
            }
        },

        submitDirection(event) {
            event.preventDefault();

            const selectedDirection = document.querySelector('input[name="direction"]:checked');
            
            if (selectedDirection) {
                const direction = selectedDirection.value;

                this.white.forEach((element) => {
                    element.innerHTML = '';
                });

                this.white.forEach((element) => {
                    let image = document.createElement('IMG');
                    if (direction === 'up') {
                        image.src = 'up.svg';
                    } else {
                        image.src = 'up.svg';
                        image.style.transform = 'rotate(180deg)';
                    }
                    element.append(image);
                });

                this.modal.style.display = "none";
            }
        },

        addEventListeners() {
            this.openModalBtn.addEventListener("click", () => {
                this.checkGreenLight();
            });

            this.submitDirectionBtn.addEventListener("click", (event) => {
                this.submitDirection(event);
            });

            window.onclick = (event) => {
                if (event.target === this.modal) {
                    this.closeModal();
                }
            };

            const lightContainer = document.querySelector('.light');
            lightContainer.addEventListener('click', (e) => {
                if (e.target && e.target.classList.contains('light-color')) {
                    this.changeTheLight(e.target);
                }
            });
        }
    };

    crosswalk.init();
});