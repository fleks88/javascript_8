let light = document.querySelector('.light')
let go = document.querySelector('.go')
let container = document.querySelector('.container')
let modal = document.querySelector('.modal')
let submit_button = document.querySelector('.submit_button')
let form = document.querySelector('form')
let white = document.querySelectorAll('.white-stripe');

const crosswalk = {
    container: container,
    modal: modal,
    form: form,
    white: white,

    close() {
        console.log(this.container)
        this.container.classList.remove('active')
        this.modal.classList.remove('active')
    },

    changeTheLight(lightCircle) {

        if (lightCircle.previousElementSibling) {
            lightCircle.previousElementSibling.classList.remove('active')
        } else {
            lightCircle.nextElementSibling.classList.remove('active')
        }

        lightCircle.classList.add('active')

    },

    openModal() {
        this.container.classList.add('active')
        this.modal.classList.add('active')
        this.container.addEventListener('click', function(e) {
            if (!e.target.closest('.modal')) {
                crosswalk.close()
            }
        })
        let close_icon = document.querySelector('.header_close')
        close_icon.addEventListener('click', function() { crosswalk.close() })
    },

    goThroughTheLight() {

        let green = document.querySelector('#green')

        if (green.classList.contains('active')) {
            this.openModal()
        } else {
            let road = document.querySelector('.road')
            let interval = setInterval(function() {
                road.classList.toggle('red')
            }, 300);

            setTimeout(() => clearInterval(interval), 2000)
        }
    },

    submitDirection() {

        let data = new FormData(this.form);
        let direction = ''

        for (const entry of data) {
            direction = entry[1]
        };

        if (direction == 'up') {
            for (let i = 0; i < this.white.length; i++) {
                this.white[i].innerHTML = '';
                let image = document.createElement('IMG');
                image.src = 'Upward.svg'
                this.white[i].append(image)
            }
        } else {
            for (let i = 0; i < this.white.length; i++) {
                this.white[i].innerHTML = '';
                let image = document.createElement('IMG');
                image.src = 'Upward.svg';
                image.style.transform = 'rotate(180deg)';
                this.white[i].append(image);
            }
        }

    },

}

go.addEventListener('click', function() {
    crosswalk.goThroughTheLight();
})

light.addEventListener('click', function(e) {
    crosswalk.changeTheLight(e.target);
})

submit_button.addEventListener('click', function(e) {
    e.preventDefault();
    crosswalk.submitDirection();
    crosswalk.close();
})
