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

				var items = orderForm.items;
				var i;

				$(cart).find('.sta-cart-sub strong').html('R$ ' + helper.toReal(orderForm.value));
				$(cart).find('.sta-cart-total strong').html('R$ ' + helper.toReal(orderForm.value));

				$('.openCart').text(items.length);

				$(cart).find('ul').html('');

				if(items.length > 0){

					$('.sta-cart-resume a').removeClass('disabled');

					for(i = 0; i < items.length; i++){

						$(cart).find('ul').append('<li> <div class="sta-cart-pdt-image"><img src="'+items[i].imageUrl+'" /></div> <div class="sta-cart-pdt-info"> <h4>'+items[i].name+'</h4> <button class="remove-item" data-index="'+i+'"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><polygon fill="#000" points="88.711,86.588 52.121,50 88.709,13.412 86.588,11.291 50,47.878 13.41,11.291 11.289,13.412   47.878,50 11.289,86.588 13.41,88.709 50,52.12 86.59,88.709 "/></svg></button> <div class="sta-cart-pdt-qtd"></div> <p>'+items[i].formattedPrice+'</p> </div> </li>');
					}
				}else{
					$('.sta-cart-resume a').addClass('disabled');

					helper.closeCart();
				}
			});
		},
		addItem : function(el){
			var urlTest = ["javascript",":","alert('Por favor, selecione o modelo desejado.');"].join('');
			var url = $(el).attr('href');

			if(url == urlTest){
				alert('Por favor, selecione o modelo desejado.');
				return false;
			}else{
				helper.openCar();

				$.ajax({
					url: url.replace('true','false'),
					type: 'GET',
					crossDomain: true,
					dataType: 'html',
					success: function(){
						helper.fillCart();
						
					}
				});
				
			}
		},
		removeItem : function(index){
			if (confirm('Deseja realmente remover o item do carrinho?')) {
                vtexjs.checkout.getOrderForm().then(function (orderForm) {
                    var item = orderForm.items[index];
                    item.index = index;
                    return vtexjs.checkout.removeItems([item]);
                }).done(function (orderForm) {
                    helper.fillCart();
                });
            }
		},
		toReal : function(val){
			val = val / 100;
			val = val.toFixed(2).toString().replace('.',',');		
			return val;
		}
	};

	$.fn.vtexcart = function(parameters) {

		var el = this;

		settings = $.extend(settings, parameters);

		var cartHtml = '<div class="sta-cart-overlay"></div><div class="sta-cart-container"> <div class="sta-cart-title"> <button class="sta-cart-close"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><polygon fill="#fff" points="88.711,86.588 52.121,50 88.709,13.412 86.588,11.291 50,47.878 13.41,11.291 11.289,13.412   47.878,50 11.289,86.588 13.41,88.709 50,52.12 86.59,88.709 "/></svg></button> <h3>Meu Carrinho</h3> </div> <div class="sta-cart-items"> <ul></ul> </div> <div class="sta-cart-resume"> <span class="sta-cart-sub">Subtotal<strong>R$ 0,00</strong></span> <span class="sta-cart-freight">Frete<strong style="display:none">0</strong><button>Calcular</button><input type="text" /></span> <span class="sta-cart-total">Total<strong>R$ 0,00</strong></span> <a href="/checkout/#/email">Proceder para checkout</a> </div> </div>';

		var miniCartHtml = '<a href="#" class="openCart"><span></span></a>';

		$(el).append(cartHtml);

		console.log(settings);

		if(settings.cartButton){
			$(settings.cartButton).append(miniCartHtml);
		}

		cart = $(el).find('.sta-cart-container');

		helper.fillCart();

		//DIRECTIVES

		$(settings.buyButton).on('click', function(event){
			helper.addItem($(this));

			event.preventDefault();
		});

		$('.openCart').on('click', function(event){
			helper.openCart();

			event.preventDefault();
		});

		$('.sta-cart-close, .sta-cart-overlay').on('click', function(){
			helper.closeCart();
		});

		$('.sta-cart-container').on('click','.remove-item', function(){
			var index = $(this).data('index');
			helper.removeItem(index);
		});

		$('.sta-cart-resume a').on('click', function(){
			if($(this).hasClass('disabled')){
				return false;
			}else{
				return true;
			}
		});
	};

	

} (jQuery));



$(window).ready(function(){
	$('body').vtexcart({
		buyButton : $('.buy-button'),
		wrapper: $('.sta-wrapper'),
		effect: 'push',
		cartButton: $('.sta-cart') //default overlay
	});
});