/*
    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
*/
function noEffect(a,b){a&&(a.style.display="none");b&&(b.style.display="block")}function crossFade(a,b,c){b&&new Effect.Appear(b.id,{duration:c});a&&new Effect.Fade(a.id,{duration:c})}function blindDown(a,b,c){b&&(b.style.zIndex="2");a&&(a.style.zIndex="1");b&&new Effect.BlindDown(b.id,{duration:c});a&&new Effect.Fade(a.id,{duration:c})}function blindUp(a,b,c){b&&(b.style.zIndex="1");a&&(a.style.zIndex="2");b&&new Effect.Appear(b.id,{duration:c});a&&new Effect.BlindUp(a.id,{duration:c})}
function InteraktingSlider(){this.slides=[];this.delay=5;this.currentSlide=this.chrono=0;this.previousSlide=null;this.mode="mixte";this.transition="none";this.speed=1;this.height=100;this.width=200;return this}InteraktingSlider.prototype.setDelay=function(a){0<a&&(this.delay=a)};InteraktingSlider.prototype.setMode=function(a){this.mode=a};InteraktingSlider.prototype.isAutoMode=function(){return"manual"!=this.mode?!0:!1};
InteraktingSlider.prototype.isManualMode=function(){return 1>this.countSlides()?!1:"auto"!=this.mode?!0:!1};InteraktingSlider.prototype.setChrono=function(a){this.chrono=a};InteraktingSlider.prototype.setTransition=function(a){this.transition=a};InteraktingSlider.prototype.setSpeed=function(a){0<a&&(this.speed=a/1E3)};
InteraktingSlider.prototype.addSlide=function(a){var b=document.getElementById("slide-content");if(b){var c=this.countSlides();b.innerHTML+="<div id='slide-"+c+"' class='slide' style='display:none;position:absolute;'>"+a+"</div>"}this.slides.push(c)};InteraktingSlider.prototype.countSlides=function(){return this.slides.length};InteraktingSlider.prototype.getCurrentSlide=function(){return this.slides[this.currentSlide]};
InteraktingSlider.prototype.setCurrentSlide=function(a){this.previousSlide=this.currentSlide;this.currentSlide=a};InteraktingSlider.prototype.isCurrentSlide=function(a){return this.currentSlide==a};InteraktingSlider.prototype.setCurrentSlideUp=function(){this.previousSlide=this.currentSlide;this.currentSlide++};InteraktingSlider.prototype.setCurrentSlideDown=function(){this.previousSlide=this.currentSlide;this.currentSlide--};
InteraktingSlider.prototype.turnLeft=function(){var a=this.countSlides();0==this.currentSlide?this.goTo(a-1):this.setCurrentSlideDown();this.refresh()};InteraktingSlider.prototype.turnRight=function(){this.currentSlide==this.countSlides()-1?this.goTo(0):this.setCurrentSlideUp();this.refresh()};InteraktingSlider.prototype.goTo=function(a){a!=this.currentSlide&&(this.setCurrentSlide(a),this.refresh())};
InteraktingSlider.prototype.getCommande=function(){var a;a="<a href='#' id='prev' class='normal' onclick='interaktingslider.turnLeft();return false;'><span>&lt;</span></a>";for(i=0;i<this.countSlides();i++)a+="<a href='#' id='button"+i+"' onclick='interaktingslider.goTo("+i+");return false;'><span>"+(i+1)+"</span></a>";return a+"<a href='#' id='next' class='normal' onclick='interaktingslider.turnRight();return false;'><span>&gt;</span></a>"};
InteraktingSlider.prototype.setCurrentButton=function(){for(i=0;i<this.countSlides();i++){var a=document.getElementById("button"+i);this.isCurrentSlide(i)?(a.setAttribute("class","active"),a.setAttribute("className","active")):(a.setAttribute("class","normal"),a.setAttribute("className","normal"))}};
InteraktingSlider.prototype.show=function(){if(this.isManualMode()&&(div=document.getElementById("middle-center")))div.innerHTML+='<div id="slide-commands">'+this.getCommande()+"</div>";0<this.countSlides()&&(this.refresh(),this.run())};InteraktingSlider.prototype.changeSlide=function(){this.isManualMode()&&this.setCurrentButton();"random"==this.transition?this.makeTransition(this.getRandomTransition()):this.makeTransition(this.transition)};
InteraktingSlider.prototype.makeTransition=function(a){var b=document.getElementById("slide-"+this.previousSlide),c=document.getElementById("slide-"+this.currentSlide);switch(a){case "up":blindUp(b,c,this.speed);break;case "down":blindDown(b,c,this.speed);break;case "fade":crossFade(b,c,this.speed);break;default:noEffect(b,c,this.speed)}};InteraktingSlider.prototype.refresh=function(){this.changeSlide();this.setChrono(this.delay)};
InteraktingSlider.prototype.run=function(){0==this.chrono?this.turnRight():this.chrono--;this.isAutoMode()&&setTimeout("interaktingslider.run()",1E3)};
