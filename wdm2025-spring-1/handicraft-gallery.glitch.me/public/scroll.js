document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('imageGallery');
  const prevBtn = document.querySelector('.prev-button');
  const nextBtn = document.querySelector('.next-button');

  // Amount to scroll each time
  const scrollAmount = 300;

  // Scroll left when prev button is clicked
  prevBtn.addEventListener('click', function() {
    gallery.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  // Scroll right when next button is clicked
  nextBtn.addEventListener('click', function() {
    gallery.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
});