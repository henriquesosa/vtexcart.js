/**
 * @license MIT
 * @fileOverview jquery.vtexcart
 * @author Henrique Sosa, henriquesosa@gmail.com
 * @version 1.0.0
 */

/**
 * @param {Object} Options
 * @example
 * $('body').vtexcart({parameters});
 */

(function($) {
	'use strict';

	var settings = {
		effect: 'overlay'
	};
	
	var cart = null;

	var helper = {
		openCart : function(){
			var width = $(cart).width() * -1;

			if(settings.effect == "push"){
				$(settings.wrapper).animate({
					marginLeft:width
				});
			}

			$(cart).animate({
				right:0
			});

			$('.sta-cart-overlay').fadeIn();
		},
		closeCart : function(){
			var width = $(cart).width() * -1;

			if(settings.effect == "push"){
				$(settings.wrapper).animate({
					marginLeft:0
				});
			}

			$(cart).animate({
				right:width
			});

			$('.sta-cart-overlay').fadeOut();
		},
		fillCart : function(){
			vtexjs.checkout.getOrderForm().done(function(orderForm) {

				if(orderForm.items.length > 0){
					$(cart).find(ul).append('<li></li>');
				}
			});
		},
		addItem : function(){
			helper.openCart();
		}
	};

	$.fn.vtexcart = function(parameters) {

		var el = this;

		settings = $.extend(settings, parameters);

		var cartHtml = '<div class="sta-cart-overlay" style="display:none;width:100%;height:100vh;position:fixed;top:0;left:0;z-index:9999;background:rgba(0,0,0,0.6);"></div><div class="sta-cart-container" style="width:355px;height:100vh;position:fixed;top:0;right:-355px;z-index:99999;background:#fff"> <div class="sta-cart-title"> <button class="sta-cart-close"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><polygon fill="#fff" points="88.711,86.588 52.121,50 88.709,13.412 86.588,11.291 50,47.878 13.41,11.291 11.289,13.412   47.878,50 11.289,86.588 13.41,88.709 50,52.12 86.59,88.709 "/></svg></button> <h3>Meu Carrinho</h3> </div> <div class="sta-cart-items"> <ul></ul> </div> <div class="sta-cart-resume"> <span class="sta-cart-sub">Subtotal<strong>R$ 0,00</strong></span> <span class="sta-cart-freight">Frete<strong></strong></span> <span class="sta-cart-total">Total<strong>R$ 0,00</strong></span> <a href="/checkout/#/cart">Proceder para checkout</a> </div> </div>'; 

		$(el).append(cartHtml);

		cart = $(el).find('.sta-cart-container');

		helper.fillCart();

		//DIRECTIVES

		$(settings.cartButton).on('click', function(event){
			helper.addItem();

			event.preventDefault();
		});

		$('.sta-cart-close, .sta-cart-overlay').on('click', function(){
			helper.closeCart();
		});
	};

	

} (jQuery));



$(window).ready(function(){
	$('body').vtexcart({
		cartButton : $('.buy-button'),
		wrapper: $('.sta-wrapper'),
		effect: 'overlay' //default overlay
	});
});