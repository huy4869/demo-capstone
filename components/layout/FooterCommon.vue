<template>
  <div id="footer" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="400" data-aos-delay="0">
    <div class="container footer-block">
      <div class="footer-left">
        <img class="logo-footer" src="@/assets/images/icons/logo-footer.svg" alt="">
        <div class="flex items-center footer-left-block">
          <img src="@/assets/images/icons/phone.svg" alt="icon">
          <a href="tel:0933922291">{{ $t('footer.hotline') }}: 093 3922 291</a>
        </div>
        <div class="flex items-center footer-left-block">
          <img src="@/assets/images/icons/globe.svg" alt="icon">
          <a href="https://ezsolution.com.vn/" target="_bank">ezsolution.com.vn</a>
        </div>
        <div class="flex items-center footer-left-block">
          <img src="@/assets/images/icons/facebook.svg" alt="icon">
          <a href="https://facebook.com/ezsolutionsvn" target="_bank">facebook.com/ezsolutionsvn</a>
        </div>
      </div>
      <div class="footer-menu">
        <div class="uppercase"><a target="_blank" href="https://ez-user.amaisoft.com/">{{ $t('menu.about_us') }}</a></div>
      </div>
      <div class="footer-right">
        <label for="input-register">{{ $t('footer.sign_up_consultation') }}</label>
        <div class="flex items-center footer-right-block">
          <input v-model="email" id="input-register" type="text" class="input-register" placeholder="Email" @focus="resetValidateEmail" maxlength="32">
          <button class="button footer-right-submit" @click="submit">{{ $t('footer.send') }}</button>
        </div>
        <div class="error">{{error}}</div>
        <div class="footer-right-address">
          <h5>{{ $t('footer.headquarters') }}</h5>
          <h5>Địa chỉ : 16 Lê Quang Đạo, Phường Phú Đô , Nam Từ Liêm , Hà Nội</h5>
        </div>
        <div id="googleMap">
          <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6164497762475!2d105.7644523151214!3d21.008006493861934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134535bb8294505%3A0x86be9618eb1a0b9f!2zMTYgUC4gUGjDuiDEkMO0LCBN4buFIFRyw6wsIFThu6sgTGnDqm0sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1657392939920!5m2!1svi!2s"
                  width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
    <div class="center footer-block-bottom">
     {{ $t('common.license') }}
    </div>
  </div>
</template>
<script>
import { REGISTER_PRODUCT, INDEX_SET_SUCCESS } from '@/store/store.const'
import { validEmail } from '@/utils/validate'

export default {
  name: 'FooterCommon',
  data() {
    return {
      email: '',
      error: ''
    }
  },
  methods: {
    async submit() {
      const params = {
        email: this.email,
        type: 5
      }
      const response = await this.$store.dispatch(REGISTER_PRODUCT, params)
      if (!validEmail(this.email)) {
        this.error = this.$t('validation.email_format')
      }
      if (response.status_code === 200) {
        this.$store.commit(INDEX_SET_SUCCESS, { show: true, text: 'Đăng ký thành công', message: response.message })
        this.email = ''
      } else if (!this.email) {
        this.error = response.data.email[0]
      }
    },
    resetValidateEmail() {
      this.error = ''
    }
  }
}
</script>
