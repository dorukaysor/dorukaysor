//Open
$('#colorWrapper').removeClass();
$('#colorWrapper').addClass('gemBlue');

//Generic
$('.button').on("click", function(){
     $('#colorWrapper').removeClass();
});  
//Specific
$('.whtSlate_B').on("click", function(){
     $('#colorWrapper').addClass('whtSlate');
});
$('.honeyComb_B').on("click", function(){
     $('#colorWrapper').addClass('honeyComb');
});
$('.phosGreen-II_B').on("click", function(){
     $('#colorWrapper').addClass('phosGreen-II');
});
$('.gemBlue_B').on("click", function(){
     $('#colorWrapper').addClass('gemBlue');
});


// COLOR Options [#top, #right, #left] top=bg
/* 
White Paper
$c: #fff #a9a9a9 #dcdcdc;

Dark Grey
$c: #252525 #1a1a1a #222;

Shadow
$c: #101010 #191919 #999; // background-color: #0d0d0d; }

Piano Keys
$c: #101010 #e3e3e3 #999; // background-color: #0d0d0d; }

Phosphorescent Green Machine
$c: #0b1515 #102928 #15f4c2;
$c: #0d1919 #102928 #15f4c2; (lighter top face) // background-color: #0b1515;
//NU vvv
$c: #0A1819 #102928 #15f4c2; // background-color: #0b1515;
$cL: #0E2D2D;
$BG: #0b1515;

// NU Blue Gem
$c: #101418 #333f80 #276EFF; 
$cL: #1E2448;
$BG: rgb(14, 12, 16);

// Slate on White
$c: #D0DAD9 #B9C6C7 #E4EDEC ; 
$cL: #D0DAD9;
$BG: rgb(250, 252, 251);

// Honey-Comb
$c: #FFF2D0 #FFD792  #FCB367 ; 
$cL: #FFF8E4;
$BG: rgb(250, 252, 251);

*/


 //// Ink-Ripple onCLick <a> 
      var parent, ink, d, x, y,
      AnchorClick = $(".inkAnchor");
  
AnchorClick.on('mousedown', function(e){
	
      parent = $(this);  // OR $(this).parent(); if I contain the a, but a is already display block, so place .ink inside of a's box

    //create .ink element if it doesn't exist
    if(parent.find(".ink").length == 0)
      parent.prepend("<span class='ink'></span>");

    ink = parent.find(".ink");
    //incase of quick double clicks stop the previous animation
    ink.removeClass("animateInk");

    //set size of .ink
    if(!ink.height() && !ink.width())
    {
      //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
     // d = Math.max(parent.outerWidth(), parent.outerHeight());
     // ink.css({height: d, width: d});
      ink.css({"height": '12em', "width": '12em'});
    }

    //get click coordinates
    //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
    x = e.pageX - parent.offset().left - ink.width()/2;
    y = e.pageY - parent.offset().top - ink.height()/2;

    //set the position and add class .animate
    ink.css({top: y+'px', left: x+'px'}).addClass("animateInk");
});