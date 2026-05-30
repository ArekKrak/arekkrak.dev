window.addEventListener('DOMContentLoaded', event => {

  // Activate scrollspy on the nav element
  const sideNavbar = document.body.querySelector('#sideNav');

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavs = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );

  responsiveNavs.map(function (responsiveNav) {
    responsiveNav.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });
});

// PRELOADER
window.addEventListener('load', () => {
  document.body.classList.remove('loading');
  document.body.classList.add('loaded');

  const preloader = document.querySelector('#preloader');

  if (preloader) {
    preloader.classList.add('preloader-hidden');

    setTimeout(() => {
      preloader.remove();
    }, 1000);
  }
});

// CONTACT FORM BUTTON
const contactForm = document.querySelector('#contactForm');
const button = document.querySelector('.button');

let getVar = variable => getComputedStyle(button).getPropertyValue(variable);

contactForm.addEventListener('submit', function (e) {

  e.preventDefault();

  if(!button.classList.contains('active')) {
    
    const formData = new FormData(contactForm);
    const yourName = formData.get("name").trim();
    const yourEmail = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();

    $('#formAlert').empty();

    if (!yourName || !yourEmail || !subject || !message) {
      $('#formAlert').html(`<div class="alert alert-danger" role="alert">All fields are mandatory</div>`);
      return;
    }

    button.classList.add('active');

    gsap.to(button, {
      keyframes: [{
        '--left-wing-first-x': 50,
        '--left-wing-first-y': 100,
        '--right-wing-second-x': 50,
        '--right-wing-second-y': 100,
        duration: .2,
        onComplete() {
          gsap.set(button, {
            '--left-wing-first-y': 0,
            '--left-wing-second-x': 40,
            '--left-wing-second-y': 100,
            '--left-wing-third-x': 0,
            '--left-wing-third-y': 100,
            '--left-body-third-x': 40,
            '--right-wing-first-x': 50,
            '--right-wing-first-y': 0,
            '--right-wing-second-x': 60,
            '--right-wing-second-y': 100,
            '--right-wing-third-x': 100,
            '--right-wing-third-y': 100,
            '--right-body-third-x': 60
          })
        }
      }, {
        '--left-wing-third-x': 20,
        '--left-wing-third-y': 90,
        '--left-wing-second-y': 90,
        '--left-body-third-y': 90,
        '--right-wing-third-x': 80,
        '--right-wing-third-y': 90,
        '--right-body-third-y': 90,
        '--right-wing-second-y': 90,
        duration: .2
      }, {
        '--rotate': 50,
        '--left-wing-third-y': 95,
        '--left-wing-third-x': 27,
        '--right-body-third-x': 45,
        '--right-wing-second-x': 45,
        '--right-wing-third-x': 60,
        '--right-wing-third-y': 83,
        duration: .25
      }, {
        '--rotate': 60,
        '--plane-x': -8,
        '--plane-y': 40,
        duration: .2
      }, {
        '--rotate': 40,
        '--plane-x': 45,
        '--plane-y': -300,
        '--plane-opacity': 0,
        duration: .375,
        onComplete() {
          setTimeout(() => {
            button.removeAttribute('style');
            gsap.fromTo(button, {
              opacity: 0,
              y: -8
            }, {
              opacity: 1,
              y: 0,
              clearProps: true,
              duration: .3,
              onComplete() {
                button.classList.remove('active');
              }
            })
          }, 3000)
        }
      }]
    })

    gsap.to(button, {
      keyframes: [{
        '--text-opacity': 0,
        '--border-radius': 0,
        '--left-wing-background': getVar('--primary-dark'),
        '--right-wing-background': getVar('--primary-dark'),
        duration: .11
      }, {
        '--left-wing-background': getVar('--primary'),
        '--right-wing-background': getVar('--primary'),
        duration: .14
      }, {
        '--left-body-background': getVar('--primary-dark'),
        '--right-body-background': getVar('--primary-darkest'),
        duration: .25,
        delay: .1
      }, {
        '--trails-stroke': 171,
        duration: .22,
        delay: .22
      }, {
        '--success-opacity': 1,
        '--success-x': 0,
        duration: .2,
        delay: .15
      }, {
        '--success-stroke': 0,
        duration: .15
      }]
    })

    setTimeout(function () {
      // SEND FORM DATA WITH FETCH/AJAX HERE
      const formData = new FormData(contactForm);
      
      fetch('php/contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          $('#formAlert').html(`<div class="alert alert-success" role="alert">Message sent</div>`);
          contactForm.reset();
          return;
        }
        if (data.status === 'error') {
          $('#formAlert').html(`<div class="alert alert-danger" role="alert">Error: No response</div>`);
          return;
        }
      })
      .catch(error => {
        console.error(error);
      });
    }, 2000);
  }
});

// DOWNLOAD BUTTON
function btn_active(){
  document.querySelector('.texto_centro').classList.add("active_txt");
  document.querySelector('.cont_centrar').classList.add("activebtn");
  setTimeout(function () {
    document.querySelector('.cont_centrar').classList.remove("activebtn");
    document.querySelector('.cont_centrar').classList.add("activebtn_fin");
    document.querySelector('.texto_centro').classList.remove("active_txt");
    document.querySelector('.texto_centro').classList.add('op_0');
    setTimeout(function () {
      document.querySelector('.cont_centrar').classList.remove("activebtn_fin");
      document.querySelector('.texto_centro').classList.remove('op_0');
    }, 11500);
  },9000);
}

// NAV CLICK
const navLinks = document.querySelectorAll('#sideNav .nav-link');
const sections = document.querySelectorAll('section.resume-section');

function getScrollOffset() {
  const profileImg = document.querySelector('#sideNav .img-profile');

  if (window.innerWidth >= 992 && profileImg) {
    return profileImg.getBoundingClientRect().top;
  }

  return document.querySelector('#sideNav').offsetHeight + 16;
}

function setActiveLink(id) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - getScrollOffset();

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    setActiveLink(target.id);
    this.blur();
  });
});

window.addEventListener('scroll', () => {
  let current = sections[0].id;
  const marker = getScrollOffset() + 20;

  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= marker) {
      current = section.id
    }
  });

  setActiveLink(current);
});