<template>
  <div class="container about-us">
    <div data-aos="fade-up" data-aos-duration="400" data-aos-delay="0" data-aos-easing="ease-in-out" class="about-us-left relative">
      <div class="about-us-bg">
        <img src="@/assets/images/about-us/bg.svg" alt="">
      </div>
      <div class="about-us-block">
        <h1>Về chúng tôi</h1>
        <div class="about-us-block-border"></div>
        <div class="about-us-block-content">
          <p>Công ty cổng phần Giải pháp Công nghệ EZ hoạt động trong lĩnh vực cung cấp các cơ hội, giải pháp đầu tư tài chính và dịch vụ công nghệ theo yêu cầu của khách hàng.</p>
          <p>Đến với EZ Solution, Quý khách hàng sẽ được tư vấn một cách đầy đủ, chi tiết về những sản phẩm và dịch vụ tài chính công nghệ mà EZ cung cấp dựa trên các yêu cầu và khả năng của quý khách hàng. </p>
          <p> Sản phẩm và dịch vụ của EZ Solution được xây dựng bởi các chuyên gia và kỹ sư giàu kinh nghiệm đã từng triển khai dịch vụ và giải pháp tài chính cho nhiều doanh nghiệp trong và ngoài nước. </p>
        </div>
      </div>
    </div>
    <div data-aos="fade-up" ddata-aos-duration="400" data-aos-delay="0" class="about-us-right">
      <div class="about-silde">
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
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutUsPage',
  data() {
    return {
      slickOptions: {
        dots: false,
        infinite: true,
        vertical: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        speed: 500,
        cssEase: 'linear',
        responsive: [{
          breakpoint: 768,
          settings: {
            vertical: true,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            speed: 500,
            cssEase: 'linear'
          }
        },
        {
          breakpoint: 480,
          settings: {
            vertical: true,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            speed: 500,
            cssEase: 'linear'
          }
        }
        ]
      }
    }
  }
}
</script>
