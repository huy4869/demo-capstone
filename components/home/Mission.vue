<template>
  <div>
    <div class="mission" data-aos="fade-up" data-aos-duration="400" data-aos-delay="0">
      <div class="container mission-block">
        <div class=" flex items-center mission-block-title">
          <h2 class="uppercase">sứ mệnh</h2>
          <img src="@/assets/images/icons/mission.svg" alt="">
        </div>
        <div class="about-us-block-border  mission-border"></div>
        <div class="mission-block-content">
          <p> EZ Solution sẽ không ngừng cập nhật và cải tiến công nghệ để cung cấp những giải pháp hiệu quả và phù hợp nhất cho kế hoạch tài chính của khách hàng theo đúng yêu cầu.</p>
          <p> Phục vụ bằng chữ tâm và trách nhiệm trên những sản phẩm, dịch vụ mà EZ Solution đem đến khách hàng.
          </p>
        </div>
      </div>
    </div>
    <div class="mission-slide" data-aos="fade-up" data-aos-duration="400" data-aos-delay="0">
      <VueSlickCarousel v-bind="slickOptions">
      <div class="slide">
        <img src="@/assets/images/banner/banner1.png" alt="" class="img-responsive" />
      </div>
      <div class="slide">
        <img src="@/assets/images/banner/banner2.png" alt="" class="img-responsive" />
      </div>
      <div class="slide">
        <img src="@/assets/images/banner/banner3.png" alt="" class="img-responsive" />
      </div>
      <div class="slide">
        <img src="@/assets/images/banner/banner4.png" alt="" class="img-responsive" />
      </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MissionPage',
  data() {
    return {
      slickOptions: {
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        variableWidth: true,
        autoplaySpeed: 2000,
        autoplay: true,
        cssEase: 'linear',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: true,
              centerMode: false,
              variableWidth: false,
              speed: 500,
              autoplaySpeed: 2000,
              autoplay: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: true,
              centerMode: false,
              variableWidth: false,
              speed: 500,
              autoplaySpeed: 2000,
              autoplay: false,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    }
  }
}
</script>
