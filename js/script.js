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

  const worksSection = document.getElementById('works');
  const body = document.body;
  const originalOverflowY = window.getComputedStyle(body).overflowY;

  if (worksSection) {
    worksSection.addEventListener('mouseenter', () => {
      body.style.overflowY = 'auto';
    });

    worksSection.addEventListener('mouseleave', () => {
      body.style.overflowY = originalOverflowY;
    });
  }
});

const worksListItems = document.querySelectorAll('.works-list li');
const swiperContainers = document.querySelectorAll('.swiper-container');
let currentSwiper;

// 最初のカルーセルを初期化
if (swiperContainers.length > 0) {
  currentSwiper = new Swiper(swiperContainers[0].querySelector('.swiper'), {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
}

worksListItems.forEach(item => {
  item.addEventListener('click', function() {
    const carouselId = this.dataset.carousel;
    const targetCarousel = document.getElementById(carouselId);

    // すべてのカルーセルを非表示
    swiperContainers.forEach(container => {
      container.style.display = 'none';
    });

    // クリックされたカルーセルを表示
    if (targetCarousel) {
      targetCarousel.style.display = 'block';

      // カルーセルを再初期化 (必要に応じて)
      const existingSwiper = targetCarousel.querySelector('.swiper').swiper;
      if (existingSwiper) {
        existingSwiper.update();
      } else {
        currentSwiper = new Swiper(targetCarousel.querySelector('.swiper'), {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 30,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
        });
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const cocricotButton = document.getElementById('cocricot-button');
  if (cocricotButton) {
      cocricotButton.addEventListener('click', function() {
          window.open('https://cocricot.pics', '_blank'); // 新しいタブで開く
          // または、同じタブで開く場合は window.location.href = 'https://cocricot.pics';
      });
  }
});