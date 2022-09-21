<template>
    <div class="carousel-wrapper">
    <div id="banner-slide">
      <VueSlickCarousel v-bind="slickOptions">
      <div class="slide">
        <img src="@/assets/images/banner/banner1.png" alt="" class="img-responsive" />
        <div data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out" class="slide-title">
          <h1 class="uppercase">Công ty cổ phần giải pháp công nghệ EZ</h1>
          <h4 class="uppercase">Đơn vị số 1 hoạt động trong lĩnh vực cung cấp các giải pháp đầu tư tài chính và dịch vụ công nghệ</h4>
          <button v-if="!$auth.loggedIn" class="button button-register" @click="handleLogin">Đăng ký ngay</button>
        </div>
        <div class="slide-content flex">
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/phone.svg" alt="phone">Hotline:
            <a href="tel:0933922291">093 3922 291</a>
          </div>
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/globe.svg" alt="phone">
            <a href="https://ezsolution.com.vn" target="_bank">ezsolution.com.vn</a>
          </div>
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/facebook.svg" alt="phone">
            <a href="https://facebook.com/ezsolutionsvn">facebook.com/ezsolutionsvn</a>
          </div>
        </div>
      </div>
      <div class="slide">
        <img src="@/assets/images/banner/banner2.png" alt="" class="img-responsive" />
        <div data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out" class="slide-title">
          <h1 class="uppercase">Công ty cổ phần giải pháp công nghệ EZ</h1>
          <h4 class="uppercase">Đơn vị số 1 hoạt động trong lĩnh vực cung cấp các giải pháp đầu tư tài chính và dịch vụ công nghệ</h4>
          <button v-if="!$auth.loggedIn" class="button button-register" @click="handleLogin">Đăng ký ngay</button>
        </div>
        <div class="slide-content flex">
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/phone.svg" alt="phone">Hotline:
            <a href="tel:0933922291">093 3922 291</a>
          </div>
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/globe.svg" alt="phone">
            <a href="https://ezsolution.com.vn" target="_bank">ezsolution.com.vn</a>
          </div>
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/facebook.svg" alt="phone">
            <a href="https://facebook.com/ezsolutionsvn">facebook.com/ezsolutionsvn</a>
          </div>
        </div>
      </div>
      <div class="slide">
        <img src="@/assets/images/banner/banner3.png" alt="" class="img-responsive" />
        <div data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out" class="slide-title">
          <h1 class="uppercase">Công ty cổ phần giải pháp công nghệ EZ</h1>
          <h4 class="uppercase">Đơn vị số 1 hoạt động trong lĩnh vực cung cấp các giải pháp đầu tư tài chính và dịch vụ công nghệ</h4>
          <button v-if="!$auth.loggedIn" class="button button-register" @click="handleLogin">Đăng ký ngay</button>
        </div>
        <div class="slide-content flex">
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/phone.svg" alt="phone">Hotline:
            <a href="tel:0933922291">093 3922 291</a>
          </div>
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/globe.svg" alt="phone">
            <a href="https://ezsolution.com.vn" target="_bank">ezsolution.com.vn</a>
          </div>
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/facebook.svg" alt="phone">
            <a href="https://facebook.com/ezsolutionsvn">facebook.com/ezsolutionsvn</a>
          </div>
        </div>
      </div>
      <div class="slide">
        <img src="@/assets/images/banner/banner4.png" alt="" class="img-responsive" />
        <div data-aos="zoom-in" data-aos-duration="1500" data-aos-easing="ease-in-out" class="slide-title">
          <h1 class="uppercase">Công ty cổ phần giải pháp công nghệ EZ</h1>
          <h4 class="uppercase">Đơn vị số 1 hoạt động trong lĩnh vực cung cấp các giải pháp đầu tư tài chính và dịch vụ công nghệ</h4>
          <button v-if="!$auth.loggedIn" class="button button-register" @click="handleLogin">Đăng ký ngay</button>
        </div>
        <div class="slide-content flex">
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/phone.svg" alt="phone">Hotline:
            <a href="tel:0933922291">093 3922 291</a>
          </div>
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/globe.svg" alt="phone">
            <a href="https://ezsolution.com.vn" target="_bank">ezsolution.com.vn</a>
          </div>
          <div class="flex items-center slide-content-block">
            <img src="@/assets/images/icons/facebook.svg" alt="phone">
            <a href="https://facebook.com/ezsolutionsvn">facebook.com/ezsolutionsvn</a>
          </div>
        </div>
      </div>
      </VueSlickCarousel>
    </div>
    <div class="ScrollDown">
      <div class="ScrollDown_box">
        <a class="btn_ScrollDown" href="#main">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BannerSlider',
  data() {
    return {
      slickOptions: {
        slidesToShow: 1,
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2000,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        waitForAnimate: true,
        prevArrow: '<div class="slick-prev">abc<img class="icon-prev" src="@/assets/images/icons/prev.svg"/></div>',
        nextArrow: '<div class="slick-next">111<img  class="icon-next" src="@/assets//images/icons/next.svg"/></i></div>'
      }
    }
  },
  methods: {
    handleLogin() {
      this.$router.push('/register')
    }
  }
}

</script>
