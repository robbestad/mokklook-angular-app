$(document).ready(function(){
   //hide address bar if content is long (safari)
   MBP.hideUrlBarOnLoad();
   console.log("READY!");
   
      var myScroll;
      if ($('#pivotTabs').length> 0) {
         myScroll = new iScroll('pivotTabs', {
            snap: 'li',
            momentum: true,
            hScrollbar: false,
            vScrollbar: false
         });
      }

   
         var App = {
            init: function() {
               this.ENTER_KEY = 13;
               this.$duration = 700;
               
               this.Forms.bind();

               this.createAndCacheElements();
               this.bindEvents();
               
               $('li:last-child').addClass('last');
               $('li:first-child').addClass('first');
               
            
               var tabs = this.$tabs;
               $(tabs).find('li:first-child a').trigger('click');
                 
                 
               //portfolio - instruction
               
               if ($('#pagePortfolio').length > 0){
                  //$('.instruction').click(function(e){e.preventDefault(); $('.instruction').fadeOut(App.duration);});
                  $(window).load(function(){
                     $('.instruction').fadeIn(App.duration, function(){
                        setTimeout(function(){
                           //fade out the instruction after a few seconds? No.
                           //$('.instruction').fadeOut(App.duration);
                        }, 3500);
                     });
                  });
                  
                  
                  var options = {};
		  $('.portfolioProjects a.thumb').photoSwipe(options);
                  
                  $('#pagePortfolio .tab').hide();
                  $('#pagePortfolio .tabsPortfolio li:nth-child(2) a').trigger('click');
                  
               }
            },
            
            createAndCacheElements:function(){
               this.$tabs = $('#pivotTabs');
               
              
            },
            
            bindEvents: function(){
               var tabs = this.$tabs;
               tabs.on('click', 'li a', this.enablePivotTab);
               
               $('.tabsPortfolio').on('click', 'li a', this.portfolioTabChange)
               
               
               //if has website link, don't show the gallery
               $('.portfolioProjects').on('click', 'li', function(){
                  if ($(this).find('a.website').length == 0){
                     $(this).find('a.thumb').trigger('click');
                  }
               })
            },
            
            portfolioTabChange: function(e){
               e.preventDefault();
               
               if ($(this).hasClass('active')){
                  return;
               }
               
               $('.tabsPortfolio li a').removeClass('active');
               $(this).addClass('active');
               
               var classToAdd = $(this).attr('data-value');
               
               $('.portfolioProjects').show().animate({
                  'opacity': 0
               }, 200, function(){
                  var me = $(this);
                  if (classToAdd == "grid"){
                     $('.instruction').addClass('lefter');
                  } else{
                     $('.instruction').removeClass('lefter');                     
                  }
                  $(me).removeClass('list grid').addClass(classToAdd).animate({
                     'opacity': 1
                  }, 200);
               });
               
            },
            
            enablePivotTab: function(e){
               e.preventDefault();
               if ($(this).hasClass('active')){
                  return;
               }
               var me = $(this);
               if ($(this).hasClass('goToFirst')){
                  $(this).parents('ul').find('li:first-child a').trigger('click');
                  return false;
               }
               var myLi = $(this).parent();
               var myLiIndex = $(myLi).index() + 1;
               var activeIndex = $('#pivotTabs a.active').parent().index() + 1;
               var direction1 = "left";
               var direction2 = "right";
               
               if (myLiIndex > activeIndex){
                  direction1 = "left";
                  direction2 = "right";
               } else{
                  direction1 = "right";
                  direction2 = "left";
               }
               
               
               $(this).parents('ul').find('a').removeClass('active');
               $(this).addClass('active');
               
               
               //scroll all tabs and contents
               myScroll.scrollToElement('li:nth-child(' + myLiIndex + ')', 200);
               $('.pivotTab').slideUp(App.duration);
               $($(me).attr('data-value')).slideDown(App.duration);
            },
            
            
            
            Forms: {
               bind: function() {
                  // Add required class to inputs
                  $(':input[required]').addClass('required');
                  
                  // Block submit if there are invalid classes found
                  $('form:not(.html5enhanced)').addClass("html5enhanced").submit(function() {
                        var formEl = this;
                          $('input,textarea').each(function() {
                                  App.Forms.validate(this);
                          });
                          
                          if(($(this).find(".invalid").length) == 0){
                                  // Delete all placeholder text
                                  $('input,textarea').each(function() {
                                          if($(this).val() == $(this).attr('placeholder')) $(this).val('');
                                  });
                                  
                                  //now submit form via ajax
                                  $.ajax({
                                    url: $(formEl).attr("action"),
                                    type: $(formEl).attr("method"),
                                    data: $(formEl).serialize(),
                                    success: function(r) {
                                       $(".successMessage").slideDown('fast');
                                       $('html,body').stop().animate({
                                          scrollTop: $(".successMessage").offset().top - 30
                                       }, 300);
                                       
                                       $(formEl).find('input[type="text"], input[type="email"], input[type="tel"], select').val('');
                                       $(formEl).find('textarea').val('');
                                       setTimeout(function(){
                                          $(".successMessage").slideUp('fast');
                                       }, 4000);
                                    }
                                  })
                                  return false;
                          } else {
                                  return false;
                          }
                  });
         
               },
               is_email: function(value){
                 return (/^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/).test(value);
               },
               is_url: function(value){
                       return (/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i).test(value);
               },
               is_number: function(value){
                       return (typeof(value) === 'number' || typeof(value) === 'string') && value !== '' && !isNaN(value);
               },
               validate: function(element) {
                  var $$ = $(element);
                  var validator = element.getAttribute('type'); // Using pure javascript because jQuery always returns text in none HTML5 browsers
                  var valid = true;
                  var apply_class_to = $$;
                  
                  var required = element.getAttribute('required') == null ? false : true;
                  switch(validator){
                          case 'email': valid = App.Forms.is_email($$.val()); break;
                          case 'url': valid = App.Forms.is_url($$.val()); break;
                          case 'number': valid = App.Forms.is_number($$.val()); break;
                  }
                  
                  // Extra required validation
                  if(valid && required && $$.val().replace($$.attr('placeholder'), '') == ''){
                          valid = false;
                  }
                  
                  // Set input to valid of invalid
                  if(valid || (!required && $$.val() == '')){
                          apply_class_to.removeClass('invalid');
                          apply_class_to.addClass('valid');
                          return true;
                  }else{
                          apply_class_to.removeClass('valid');
                          apply_class_to.addClass('invalid');
                          return false;
                  }
               }
            }
            
         };
         App.init();





   //this section shows up for the Social Contact card (when you hover on the social bar)
   $('.qtipLinker').qtip({
      content: {
        text: $('.qtipLinks')
      },
       position: {
           my: 'top center',
           at: 'bottom center'
       },
      show: {
       modal: true
      },
      style: {
        classes: 'ui-tooltip-light ui-tooltip-shadow',
        tip: 'top center'
      }
   });


   
});