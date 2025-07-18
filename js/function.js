(function ($) {
	"use strict";

	var $window = $(window);
	var $body = $('body');

	/* Preloader Effect */
	$window.on('load', function () {
		$(".preloader").fadeOut(600);
	});

	/* Sticky Header */
	if ($('.active-sticky-header').length) {
		$window.on('resize', function () {
			setHeaderHeight();
		});

		function setHeaderHeight() {
			$("header.main-header").css("height", $('header .header-sticky').outerHeight());
		}

		$window.on("scroll", function () {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header .header-sticky').outerHeight()
			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}

	/* Slick Menu JS */
	$('#menu').slicknav({
		label: '',
		prependTo: '.responsive-menu'
	});

	if ($("a[href='#top']").length) {
		$(document).on("click", "a[href='#top']", function () {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Hero Slider Layout JS */
	const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
		effect: 'fade',
		slidesPerView: 1,
		speed: 1000,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		pagination: {
			el: '.hero-pagination',
			clickable: true,
		},
	});

	/* testimonial Slider JS */
	if ($('.specialization-slider').length) {
		const testimonial_slider = new Swiper('.specialization-slider .swiper', {
			slidesPerView: 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 4,
				}
			}
		});
	}

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView: 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.testimonial-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.testimonial-button-next',
				prevEl: '.testimonial-button-prev',
			},
			breakpoints: {
				768: {
					slidesPerView: 1,
				},
				991: {
					slidesPerView: 1,
				}
			}
		});
	}

	/* Testimonial Company Slider JS */
	if ($('.testimonial-company-slider').length) {
		const testimonial_company_slider = new Swiper('.testimonial-company-slider .swiper', {
			slidesPerView: 2,
			speed: 2000,
			spaceBetween: 40,
			loop: true,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				768: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 6,
				}
			}
		});
	}

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function () {
			$('.skillbar').each(function () {
				$(this).find('.count-bar').animate({
					width: $(this).attr('data-percent')
				}, 2000);
			});
		}, {
			offset: '70%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
		gsap.registerPlugin(ScrollTrigger);
		let revealContainers = document.querySelectorAll(".reveal");
		revealContainers.forEach((container) => {
			let image = container.querySelector("img");
			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					toggleActions: "play none none none"
				}
			});
			tl.set(container, {
				autoAlpha: 1
			});
			tl.from(container, 1, {
				xPercent: -100,
				ease: Power2.out
			});
			tl.from(image, 1, {
				xPercent: 100,
				scale: 1,
				delay: -1,
				ease: Power2.out
			});
		});
	}

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if ($parallaxie.length && ($window.width() > 991)) {
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Zoom Gallery screenshot */
	$('.gallery-items').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		image: {
			verticalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function (element) {
				return element.find('img');
			}
		}
	});

	/*Download CV*/
	$("#downloadCV").on('click', function (e) {
		const link = document.createElement("a");
		link.href = "files/Navjot_Singh_Resume.pdf";
		link.target = "_blank";
		link.download = "Navjot_Singh_CV.pdf";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	});

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({ focus: false }).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			var form = this;
			submitForm(form);
		}
	});

	function submitForm(form) {
		var fname = $('#contactForm #fname').val(),
			lname = $('#contactForm #lname').val(),
			email = $('#contactForm #email').val(),
			phone = $('#contactForm #phone').val(),
			message = $('#contactForm #message').val();

		var $span = $('button[type="submit"] span', form);

		(function () {
			emailjs.init('user_O16GDlk4DjbOdQqy1oImm');
		})();

		$span.addClass('spinner-border');
		emailjs.sendForm('service_f7am48g', 'template_04tj2yl', form)
			.then(function () {
				formSuccess();
				$span.removeClass('spinner-border');
				Swal.fire({
					icon: 'success',
					iconColor: "#366a5a",
					title: 'Message Received',
					text: 'Thank you! Your message has been successfully submitted.',
					confirmButtonText: 'Close',
					confirmButtonColor: "#163031",
					timer: 4000
				});
			}, function (error) {
				$span.removeClass('spinner-border');
				submitMSG(false, "Something went wrong");
			});

		/* Ajax call to submit form */
		// $.ajax({
		// 	type: "POST",
		// 	url: "form-process.php",
		// 	data: $contactform.serialize(),
		// 	success : function(text){
		// 		if (text === "success"){
		// 			formSuccess();
		// 		} else {
		// 			submitMSG(false,text);
		// 		}
		// 	}
		// });
	}

	function formSuccess() {
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg) {
		if (valid) {
			var msgClasses = "h4 text-success";
		} else {
			var msgClasses = "h4 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
		setTimeout(() => {
			$("#msgSubmit").removeClass(msgClasses).text("");
		}, 3000);
	}
	/* Contact form validation end */

	/* Our Portfolio (filtering) Start */
	$window.on("load", function () {
		if ($(".portfolio-item-boxes").length) {

			/* Init Isotope */
			var $menuitem = $(".portfolio-item-boxes").isotope({
				itemSelector: ".portfolio-item-box",
				layoutMode: "masonry",
				masonry: {
					// use outer width of grid-sizer for columnWidth
					columnWidth: 1,
				}
			});

			/* Filter items on click */
			var $menudisesnav = $(".our-portfolio-nav li a");
			$menudisesnav.on('click', function (e) {

				var filterValue = $(this).attr('data-filter');
				$menuitem.isotope({
					filter: filterValue
				});

				$menudisesnav.removeClass("active-btn");
				$(this).addClass("active-btn");
				e.preventDefault();
			});
			$menuitem.isotope({ filter: "*" });
		}
	});
	/* Our Portfolio (filtering) End */

	/* Animated Wow Js */
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}

	/* Our Feature List Active Start */
	var $our_feature_list = $('.our-feature-list');
	if ($our_feature_list.length) {
		var $feature_items = $our_feature_list.find('.feature-item');

		if ($feature_items.length) {
			$feature_items.on({
				mouseenter: function () {
					if (!$(this).hasClass('active')) {
						$feature_items.removeClass('active');
						$(this).addClass('active');
					}
				},
				mouseleave: function () {
					// Optional: Add logic for mouse leave if needed
				}
			});
		}
	}
	/* Our Feature List Active End */

})(jQuery);