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

// モーダルウィンドウの動作
const workImages = document.querySelectorAll('#works .swiper-slide img');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-button');

workImages.forEach(image => {
  image.addEventListener('click', () => {
    const modalId = image.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  });
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    if (modal) {
      modal.style.display = 'none';
    }
  });
});

window.addEventListener('click', (event) => {
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
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
  autoplay: { // 自動再生の設定
    delay: 3000, // 各スライドの表示時間 (ミリ秒)
    disableOnInteraction: false, // ユーザー操作後に自動再生を停止しない
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

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const heroSection = document.getElementById('hero');
  const aboutSection = document.getElementById('about');
  const heroHeight = heroSection ? heroSection.offsetHeight : 0;

  // ヘッダーに loaded クラスを付与して文字をフェードインさせる (ページロード時)
  header.classList.add('loaded');

  // ヒーローイメージにも loaded クラスを付与して文字をフェードインさせる (ページロード時)
  if (heroSection) {
    heroSection.classList.add('loaded');
  }

  // Aboutセクションのフェードイン処理 (初期表示時とスクロール時)
  const handleAboutFadeIn = () => {
    if (aboutSection && !aboutSection.classList.contains('loaded')) {
      const aboutTop = aboutSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Aboutセクションが画面の下端に近づいたら loaded クラスを追加
      if (aboutTop < windowHeight * 0.8) {
        aboutSection.classList.add('loaded');
        window.removeEventListener('scroll', handleAboutFadeIn); // 一度表示したらイベントリスナーを削除
      }
    }
  };

  // ページ読み込み時に初期表示されていれば loaded クラスを付与
  if (aboutSection) {
    const aboutTopOnLoad = aboutSection.getBoundingClientRect().top;
    const windowHeightOnLoad = window.innerHeight;
    if (aboutTopOnLoad < windowHeightOnLoad) {
      aboutSection.classList.add('loaded');
    } else {
      window.addEventListener('scroll', handleAboutFadeIn); // 初期表示されていなければスクロール時に処理
    }
  }

  // スクロールによるヘッダーの背景色変更
  window.addEventListener('scroll', function() {
    if (heroSection && window.scrollY > heroHeight) {
      header.classList.remove('header-transparent');
    } else if (heroSection) {
      header.classList.add('header-transparent');
    }
  });
});