// ページ読み込み完了後に '.fade-in' クラスを持つ要素に 'loaded' クラスを追加してフェードイン
window.addEventListener('load', () => {
  const fadeIns = document.querySelectorAll('.fade-in');
  fadeIns.forEach(fadeIn => {
    fadeIn.classList.add('loaded');
  });
});

// アコーディオンメニューの動作
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const accordionItem = header.parentNode;
    accordionItem.classList.toggle('open');
  });
});

// カルーセルの初期化 (Swiper)
const swiper = new Swiper('.swiper', {
  loop: true, // 無限ループ
  slidesPerView: 1, // 一度に表示するスライド数
  spaceBetween: 30, // スライド間の余白
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // ページネーションをクリック可能にする
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

// ハンバーガーメニューの動作
const hamburgerMenu = document.querySelector('.hamburger-menu');
const globalNav = document.querySelector('.global-nav');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('open');
  globalNav.classList.toggle('open');
});

// スムーススクロール (ナビゲーションリンク用)
const navLinks = document.querySelectorAll('header a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60, // ヘッダーの高さ分オフセット
        behavior: 'smooth'
      });

      // ハンバーガーメニューが開いている場合は閉じる
      if (hamburgerMenu.classList.contains('open')) {
        hamburgerMenu.classList.remove('open');
        globalNav.classList.remove('open');
      }
    }
  });
});