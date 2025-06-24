// overlay-script.js
function setHumburgerMenu() {
  const hamburger = document.querySelector('.hamburger-overlay');
  const nav = document.querySelector('.nav-overlay');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    
    const isOpen = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    nav.setAttribute('aria-hidden', !isOpen);
    
    // メニューオープン時に背景スクロールを防止
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  
  // ESCキーでメニューを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
      nav.setAttribute('aria-hidden', true);
      document.body.style.overflow = '';
    }
  });
};


fetch("http://127.0.0.1:5500/docs/common/index.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("common-header").innerHTML = html;

    // 描画が終わったらハンバーガーメニュー初期化
    requestAnimationFrame(() => {
      setHumburgerMenu();
    });
  });