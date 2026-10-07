// Aşağı kaydırınca header'ı gizler, yukarı kaydırınca gösterir.
// Dinleyiciyi kaldıran bir temizleme fonksiyonu döndürür.
export const handleScroll = () => {
  let lastScrollTop = 0;
  const stickyElement = document.querySelector('.header');
  if (!stickyElement) return () => {};

  const onScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      stickyElement.style.transform = 'translateY(-100%)';
    } else if (currentScrollTop < lastScrollTop) {
      stickyElement.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  };

  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
};
