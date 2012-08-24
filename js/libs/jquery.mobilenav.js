/* Mobile Nav jQuery plugin by mimi at mimiflynn dot com github.com/mimiflynn/mobile-nav */
(function($){

 	$.fn.extend({ 
 		
		//no options currently available
// 		mobilenav: function(options) {

 		mobilenav: function() {

			//Set the default values, use comma to separate the settings, example:
//			var defaults = {
//				navClass: mobile-nav
//			}
//				
//			var options =  $.extend(defaults, options);

    	return this.each(function() {
//				var o = options;

        //TODO: clean up and organize, namespace?
        
        var MB = MB || {
    
          addHeader: function (el) { //construct header that appears over regular header
    
            var mobileHeaderContainer = '<header id="mobile-header"></header>';
            var mobileBackLink = '<a href="#" id="mobile-back">Back</a>';
            var mobileCurrentHeader = '<h3 id="subnav"></h3>';
    
            if ($('#mobile-header').size() === 0) {
              $(el).before(mobileHeaderContainer);
              $('#mobile-header').append(mobileCurrentHeader, mobileBackLink);
            }
    
          },
    
          removeHeader: function() {
            $('#mobile-header').remove();
          },
    
          kill: function (el){
            if ($('.mobile-nav').size() != 0) { //check to see if mobile nav is exists
          
              var allEl = el + ' *';
          
              //kill mobile nav
              $(el).attr('style','').removeClass('mobile-nav');
              $(allEl).attr('style','');
              $('#mobile-header').detach();
              $('#mobile-nav-link').detach();
      
            }
    
          },
    
          paneReset: function() {

            //set width of menu panes
            var wWidth = $(window).width();

            var ulSize = new Array();

            $('.mobile-nav ul').each(function(){ //get height of menu all submenus
            
              var size = $(this).children().length;

              ulSize.push(size); //add height of individual menu to the array
            
            });

            var navMaxSize = Math.max.apply(Math,ulSize); //get size of biggest submenu
            
            var itemHeight = $('.mobile-nav li').height();

            var navHeight = navMaxSize * itemHeight;
          
            $('.mobile-nav').css({
              'width': wWidth,
              'height': navHeight
            });
            $('.mobile-nav li').css({
              'position': 'static'
            });
            $('.mobile-nav ul').css({
              'position': 'absolute',
              'top': 0,
              'left': 0,
              'z-index': 1,
              'height': navHeight,            
              'margin-left': wWidth
            });

          },

          action: function(el){ //when nav item with subnav is clicked
  
            var wWidth = $(window).width();
            var root = this;
            var submenu = $(root).parent().find('ul');
            var speed = 300;
            var subSection = $(root).html();
    
            $(submenu).animate({ //animate nested ul into view
              'margin-left': 0
            },speed, MB.addHeader(el));
  
            $('#subnav').text(subSection); //change subsection content to current submenu
  
            $('#mobile-back').click(function(){ //mobile back button clicked
              $(submenu).animate({ //animate nested ul out of view
                'margin-left': wWidth
              },speed, MB.removeHeader(el));
            });
  
          },

          activate: function(){ //When mobile-nav-link is tapped, do this - currently not in use

            $('.mobile-nav').toggle(); //show or hide menu

            paneReset();
            removeHeader(el);
          
          },

          init: function(el) {
    
            //set up mobile-nav
            var mobileNavLink = '<a href="#" id="mobile-nav-link">Navigation</a>';
            $(el).find('> ul').addClass('mobile-nav').hide();
            $(el).find('li:has(> ul) > a').addClass('has-subnav');
          
            if ($('#mobile-nav-link').size() === 0) {
              $(el).parent().append(mobileNavLink);
            }
    
            MB.paneReset();

            //Listen for the event and do stuff!
			
            $('#mobile-nav-link').click(function(){ //When mobile-nav-link is tapped, do this
              $('.mobile-nav').toggle(); //show or hide menu
  
              MB.paneReset();
              MB.removeHeader(el);
          
            });
          
            $('.mobile-nav a.has-subnav').hover(function(){ //when nav item with subnav is tapped but not clicked to allow for links when desktop
  
              var wWidth = $(window).width();
              var root = this;
              var submenu = $(root).parent().find('ul');
              var speed = 300;
              var subSection = $(root).html();
      
              $(submenu).animate({ //animate nested ul into view
                'margin-left': 0
              },speed, MB.addHeader(el));
    
              $('#subnav').text(subSection); //change subsection content to current submenu
    
              $('#mobile-back').hover(function(){ //mobile back button clicked
                $(submenu).animate({ //animate nested ul out of view
                  'margin-left': wWidth
                },speed, MB.removeHeader(el));
              });
  
            });
            
          }

        
        };

        //initialize plugin
        
        var el = this;

        MB.init(el);

      });
    }
	});
	
})(jQuery);

