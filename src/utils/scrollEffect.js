export const handleScroll = () => {
  let lastScrollTop = 0; 
  const stickyElement = document.querySelector('.header');

  window.addEventListener('scroll', function () {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    

    if (currentScrollTop > lastScrollTop) {
      stickyElement.style.transform = 'translateY(-100%)';
    } else if (currentScrollTop < lastScrollTop) {
      stickyElement.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  });
};
