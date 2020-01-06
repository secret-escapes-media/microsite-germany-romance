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
video.prepend(
  '<div class="thumbnail__bg bg--img" style="background-image: url(\'' +
    videoImgPath +
    '\');"><div class="thumbnail__play-icon"></div></div>'
);

// remove thumbnail and play video
function playVideo() {
  $('.thumbnail__bg').fadeOut(250);
  videoEl.css({
    visibility: 'visible',
    opacity: '1',
    transition: 'opacity 1.5s ease'
  });
  videoEl[0].play();
}

// watch events to play video
video.on('click', playVideo);
video.on('keydown', function(e) {
  if (e.code == 'Enter') playVideo();
});


////////////////////////////////////////////////////////////////////////////////
//  image attribution
////////////////////////////////////////////////////////////////////////////////

$('.js-image-attribution').each(function() {
  var $this = $(this);
  var contents = $this.html();
  $this.css('cursor', 'pointer');
  $this.html(
    '<img style="width: 15px; height: 15px;" src="' +
      window.location.pathname.split('/', 4).join('/') +
      '/_assets/img/icons/info.svg" alt="picture attribution information">'
  );
  $this.on('click', function() {
    $this.html(contents);
    $this.css('cursor', 'auto');
  });
});