// general js for the project that wouldn't be a reuseable component

////////////////////////////////////////////////////////////////////////////////
//  JS video thumbnail
////////////////////////////////////////////////////////////////////////////////

// set variables
var video = $('.js-video');
var videoEl = video.find('video');
var videoImgPath = videoEl.attr('poster');

// add thumbnail element
video.addClass('thumbnail');
video.prepend('<div class="thumbnail__bg bg--img" style="background-image: url(\'' + videoImgPath + '\');"><div class="thumbnail__play-icon"></div></div>');

// create click event to play video
video.on('click', function(){
  // NEED TO BUILD THIS PROPERLY
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // this is just a quick thing to show how it will work
  // I will eventually add in transitions for it all so it is nice and smooth
  // also need to consider the mobile behaviour as well
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  $('.thumbnail__bg').empty().remove();
  videoEl.css('visibility', 'visible');
  videoEl[0].play();
});


////////////////////////////////////////////////////////////////////////////////
//  image attribution
////////////////////////////////////////////////////////////////////////////////

$('.js-image-attribution').each(function() {
  var $this = $(this);
  var contents = $this.html();
  $this.css('cursor', 'pointer');
  $this.html('<img style="width: 15px; height: 15px;" src="' + window.location.pathname.split('/', 4).join('/') + '/_assets/img/icons/info.svg" alt="picture attribution information">');
  $this.on('click',function(){
    $this.html(contents);
    $this.css('cursor', 'auto');
  });
});