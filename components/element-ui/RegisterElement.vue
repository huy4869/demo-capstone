<!--<template>-->
<!--  <div class="modal-login">-->
<!--    <div v-if="step === 1" class="register_step1">-->
<!--      <el-form-->
<!--        ref="accountFormStep1"-->
<!--        :model="accountForm"-->
<!--        :rules="accountRules"-->
<!--        label-width="200px"-->
<!--        autocomplete="off"-->
<!--        label-position="left"-->
<!--        @validate="checkValidate"-->
<!--        @submit.prevent="sendOtp"-->
<!--      >-->
<!--        <el-form-item label="" prop="phone">-->
<!--          <el-input-->
<!--            ref="phone"-->
<!--            v-model.trim="accountForm.phone"-->
<!--            :placeholder="$t('modal_login.phone')"-->
<!--            name="phone"-->
<!--            type="text"-->
<!--            tabindex="2"-->
<!--            minlength="10"-->
<!--            show-word-limit-->
<!--            @focus="resetValidate('phone')"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <div :class="{'disabled' : disabledButtonStep1}">-->
<!--            <el-button-->
<!--              v-loading.fullscreen.lock="fullscreenLoading"-->
<!--              :loading="loading"-->
<!--              type="danger"-->
<!--              @click="sendOtp"-->
<!--            >-->
<!--              {{ $t('register') }}-->
<!--            </el-button>-->
<!--          </div>-->
<!--        </el-form-item>-->
<!--        <div class="link_register">-->
<!--          <span class="no_account">{{ $t('modal_login.do_not_have_account') }}</span>-->
<!--          <span class="register_button" @click="changeModal('login')">{{ $t('login') }}</span>-->
<!--        </div>-->
<!--      </el-form>-->
<!--    </div>-->
<!--    <div v-show="step === 2" class="register_step2">-->
<!--      <div class="link_register">-->
<!--        <span class="no_account">{{ $t('modal_login.send_otp_number') }}</span><br/>-->
<!--        <span class="phone">{{ formatPhone(accountForm.phone) }}</span>-->
<!--      </div>-->
<!--      <el-form-->
<!--        ref="accountFormStep2"-->
<!--        :model="accountForm"-->
<!--        :rules="accountRules"-->
<!--        label-width="200px"-->
<!--        autocomplete="off"-->
<!--        label-position="left"-->
<!--      >-->
<!--        <div id="form_otp" class="inputs d-flex flex-row justify-content-center mt-2">-->
<!--          <div v-for="(code, index) in otpCode" :key="index">-->
<!--            <input-->
<!--              ref="optCode" v-model="code.value" class="m-2 text-center form-control rounded" type="text" maxlength="1"-->
<!--              @keydown.delete="backPrevInput($event, index)" @keypress="onlyNumber($event, index)" @keyup="onlyNumber($event, index)" />-->
<!--          </div>-->
<!--        </div>-->
<!--        <el-form-item>-->
<!--          <div :class="{'disabled' : disabledButtonStep2}">-->
<!--            <el-button-->
<!--              v-loading.fullscreen.lock="fullscreenLoading"-->
<!--              :loading="loading"-->
<!--              type="danger"-->
<!--              @click="confirmOtp"-->
<!--            >-->
<!--              {{ $t('confirm') }}-->
<!--            </el-button>-->
<!--          </div>-->
<!--        </el-form-item>-->
<!--        <div v-if="timerCount <= 0" class="link_register">-->
<!--          <span class="no_account">{{ $t('modal_login.confirm_otp') }}</span>-->
<!--          <span class="register_button" @click="reSendOtp">{{ $t('modal_login.send_back') }}</span>-->
<!--        </div>-->
<!--        <div v-else class="link_register">-->
<!--          <span class="no_account">{{ $t('modal_login.send_back_notice', {count: timerCount}) }}</span>-->
<!--        </div>-->
<!--      </el-form>-->
<!--    </div>-->
<!--    <div v-if="step === 3" class="register_step3">-->
<!--      <el-form-->
<!--        ref="accountFormStep3"-->
<!--        :model="accountForm"-->
<!--        :rules="accountRules"-->
<!--        label-width="200px"-->
<!--        autocomplete="off"-->
<!--        label-position="left"-->
<!--      >-->
<!--        <el-form-item label="" prop="name">-->
<!--          <el-input-->
<!--            id="name"-->
<!--            ref="name"-->
<!--            v-model="accountForm.name"-->
<!--            :placeholder="$t('modal_login.name')"-->
<!--            name="name"-->
<!--            type="text"-->
<!--            tabindex="1"-->
<!--            maxlength="60"-->
<!--            minlength="5"-->
<!--            @focus="resetValidate('name')"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="" prop="password">-->
<!--          <el-input-->
<!--            ref="password"-->
<!--            v-model="accountForm.password"-->
<!--            :placeholder="$t('modal_login.password')"-->
<!--            name="password"-->
<!--            :type="passwordTypeNew"-->
<!--            tabindex="3"-->
<!--            maxlength="32"-->
<!--            autocomplete="off"-->
<!--            @focus="resetValidate('password')"-->
<!--          />-->
<!--          <span class="show-pwd" @click="showPwd('passwordTypeNew')">-->
<!--            <img v-if="passwordTypeNew === 'password'" src="/assets/images/icons/hide.svg" alt="">-->
<!--            <img v-else src="/assets/images/icons/eye.svg" alt="">-->
<!--          </span>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="" prop="password_confirm">-->
<!--          <el-input-->
<!--            ref="password_confirm"-->
<!--            v-model="accountForm.password_confirm"-->
<!--            :placeholder="$t('modal_login.password_confirm')"-->
<!--            name="password_confirm"-->
<!--            :type="passwordTypeReNew"-->
<!--            tabindex="3"-->
<!--            maxlength="32"-->
<!--            autocomplete="off"-->
<!--            @focus="resetValidate('password_confirm')"-->
<!--          />-->
<!--          <span class="show-pwd" @click="showPwd('passwordTypeReNew')">-->
<!--            <img v-if="passwordTypeReNew === 'password'" src="/assets/images/icons/hide.svg" alt="">-->
<!--            <img v-else src="/assets/images/icons/eye.svg" alt="">-->
<!--          </span>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <div :class="{'disabled' : disabledButtonStep3}">-->
<!--            <el-button-->
<!--              v-loading.fullscreen.lock="fullscreenLoading"-->
<!--              :loading="loading"-->
<!--              type="danger"-->
<!--              @click.native.prevent="register"-->
<!--            >-->
<!--              {{ $t('confirm') }}-->
<!--            </el-button>-->
<!--          </div>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
<!--    <img-->
<!--      v-if="[2,3].includes(step)"-->
<!--      src="/assets/images/icons/arrow-down-prev.svg"-->
<!--      class="btn-back-modal"-->
<!--      alt=""-->
<!--      @click="changeStep(step - 1 )"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {-->
<!--  INDEX_SET_ERROR,-->
<!--  INDEX_SET_LOADING,-->
<!--  INDEX_SET_SUCCESS-->
<!--} from '../../store/store.const'-->
<!--import { validPhone } from '@/utils/validate'-->
<!--export default {-->
<!--  name: 'RegisterElement',-->
<!--  data() {-->
<!--    const validPhoneNumber = (rule, value, callback) => {-->
<!--      if (!validPhone(value)) {-->
<!--        callback(new Error(this.$t('validation.phone')))-->
<!--      } else {-->
<!--        callback()-->
<!--      }-->
<!--    }-->
<!--    const validPasswordConfirm = (rule, value, callback) => {-->
<!--      if (value !== this.accountForm.password) {-->
<!--        callback(new Error(this.$t('validation.confirm-password')))-->
<!--      } else {-->
<!--        callback()-->
<!--      }-->
<!--    }-->
<!--    return {-->
<!--      accountForm: {-->
<!--        phone: '',-->
<!--        name: '',-->
<!--        password: '',-->
<!--        password_confirm: '',-->
<!--        token: '',-->
<!--        errors: {}-->
<!--      },-->
<!--      passwordTypeReNew: 'password',-->
<!--      passwordTypeNew: 'password',-->
<!--      accountRules: {-->
<!--        phone: [-->
<!--          { required: true, message: this.$t('validation.required', { _field_: this.$t('modal_login.phone') }), trigger: 'blur' },-->
<!--          { validator: validPhoneNumber, trigger: 'blur' }-->
<!--        ],-->
<!--        name: [-->
<!--          { required: true, message: this.$t('validation.required', { _field_: this.$t('modal_login.name') }), trigger: 'blur' },-->
<!--          { type: 'string', min: 5, message: this.$t('validation.min', { _field_: this.$t('modal_login.name'), _length_: 5 }), trigger: 'blur' },-->
<!--          { type: 'string', max: 60, message: this.$t('validation.max', { _field_: this.$t('modal_login.name'), _length_: 60 }), trigger: 'blur' }-->
<!--        ],-->
<!--        password: [-->
<!--          { required: true, message: this.$t('validation.required', { _field_: this.$t('modal_login.password') }), trigger: 'blur' },-->
<!--          { type: 'string', min: 6, message: this.$t('validation.min', { _field_: this.$t('modal_login.password'), _length_: 6 }), trigger: 'blur' },-->
<!--          { type: 'string', max: 32, message: this.$t('validation.max', { _field_: this.$t('modal_login.password'), _length_: 32 }), trigger: 'blur' }-->
<!--        ],-->
<!--        password_confirm: [-->
<!--          { required: true, message: this.$t('validation.required', { _field_: this.$t('modal_login.password') }), trigger: 'blur' },-->
<!--          { validator: validPasswordConfirm, trigger: 'blur' }-->
<!--        ],-->
<!--        remember: []-->
<!--      },-->
<!--      validation: {-->
<!--        phone: false-->
<!--      },-->
<!--      capsToolPasswordTip: false,-->
<!--      loading: false,-->
<!--      fullscreenLoading: false,-->
<!--      step: 1,-->
<!--      configTitleRegister: {-->
<!--        1: this.$t('register_account'),-->
<!--        2: this.$t('modal_login.title_confirm'),-->
<!--        3: this.$t('modal_login.create_account')-->
<!--      },-->
<!--      otpCode: [-->
<!--        { key: 1, value: '' },-->
<!--        { key: 2, value: '' },-->
<!--        { key: 3, value: '' },-->
<!--        { key: 4, value: '' },-->
<!--        { key: 5, value: '' },-->
<!--        { key: 6, value: '' }-->
<!--      ],-->
<!--      timerCount: 0,-->
<!--      idCount: null-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    disabledButtonStep1() {-->
<!--      if (!validPhone(this.accountForm.phone)) {-->
<!--        return true-->
<!--      }-->
<!--      return false-->
<!--    },-->
<!--    disabledButtonStep2() {-->
<!--      if (this.otp.length !== 6) {-->
<!--        return true-->
<!--      }-->
<!--      return false-->
<!--    },-->
<!--    disabledButtonStep3() {-->
<!--      if ((this.accountForm.name.length >= 5) && (this.accountForm.password.length >= 6) &&-->
<!--        (this.accountForm.password_confirm === this.accountForm.password)) {-->
<!--        return false-->
<!--      }-->
<!--      return true-->
<!--    },-->
<!--    otp() {-->
<!--      let data = ''-->
<!--      this.otpCode.forEach(code => {-->
<!--        data += code.value-->
<!--      })-->
<!--      return data-->
<!--    }-->
<!--  },-->
<!--  watch: {-->
<!--    step() {-->
<!--      this.$emit('changeTitle', { state: 'register', value: this.configTitleRegister[this.step] })-->
<!--    },-->
<!--    timerCount: {-->
<!--      handler(value) {-->
<!--        if (value > 0) {-->
<!--          this.idCount = setTimeout(() => {-->
<!--            this.timerCount&#45;&#45;-->
<!--          }, 1000)-->
<!--        }-->
<!--      },-->
<!--      immediate: true-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    if (this.$refs.accountFormStep1 !== undefined) {-->
<!--      this.resetValidate('accountFormStep1')-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    resetValidate(ref) {-->
<!--      this.$refs['accountFormStep' + this.step].fields.find((f) => f.prop === ref).clearValidate()-->
<!--      this.accountForm.errors[ref] = ''-->
<!--    },-->
<!--    checkCapslock(e, attr) {-->
<!--      const { key } = e-->
<!--      this[attr] = key && key.length === 1 && (key >= 'A' && key <= 'Z')-->
<!--    },-->
<!--    sendOtp() {-->
<!--      if (!this.disabledButtonStep1) {-->
<!--        this.$refs.accountFormStep1.validate(async valid => {-->
<!--          if (valid) {-->
<!--            try {-->
<!--              await this.$store.commit(INDEX_SET_LOADING, true)-->
<!--              const data = await this.$store.dispatch(AUTH_SEND_OTP, { phone_number: this.accountForm.phone, type: 1 })-->
<!--              if (data.status_code === 200) {-->
<!--                await this.$store.commit(INDEX_SET_SUCCESS, {-->
<!--                  show: true,-->
<!--                  text: data.message-->
<!--                })-->
<!--                this.step = 2-->
<!--                this.timerCount = 60-->
<!--              } else {-->
<!--                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })-->
<!--              }-->
<!--            } catch (err) {-->
<!--              await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })-->
<!--            }-->
<!--            await this.$store.commit(INDEX_SET_LOADING, false)-->
<!--          }-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--    async reSendOtp() {-->
<!--      try {-->
<!--        await this.$store.commit(INDEX_SET_LOADING, true)-->
<!--        const data = await this.$store.dispatch(AUTH_RE_SEND_OTP, { phone_number: this.accountForm.phone, type: 3 })-->
<!--        if (data.status_code === 200) {-->
<!--          await this.$store.commit(INDEX_SET_SUCCESS, {-->
<!--            show: true,-->
<!--            text: data.message-->
<!--          })-->
<!--          this.timerCount = 60-->
<!--        } else {-->
<!--          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })-->
<!--        }-->
<!--      } catch (err) {-->
<!--        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })-->
<!--      }-->
<!--      await this.$store.commit(INDEX_SET_LOADING, false)-->
<!--    },-->
<!--    onlyNumber($event, index) {-->
<!--      const keyCode = ($event.keyCode ? $event.keyCode : $event.which)-->
<!--      if ((keyCode < 48 || keyCode > 57)) {-->
<!--        $event.preventDefault()-->
<!--      } else {-->
<!--        this.$refs.optCode[index < 5 ? index + 1 : 5 ].focus()-->
<!--      }-->
<!--    },-->
<!--    backPrevInput($event, index) {-->
<!--      if ((index > 0) && (this.otpCode[index].value === '')) {-->
<!--        this.$refs.optCode[index - 1].focus()-->
<!--        $event.preventDefault()-->
<!--      }-->
<!--    },-->
<!--    confirmOtp() {-->
<!--      if (!this.disabledButtonStep2) {-->
<!--        this.$refs.accountFormStep2.validate(async valid => {-->
<!--          if (valid) {-->
<!--            try {-->
<!--              await this.$store.commit(INDEX_SET_LOADING, true)-->
<!--              const data = await this.$store.dispatch(AUTH_VERIFY_OTP, { phone_number: this.accountForm.phone, code_otp: this.otp })-->
<!--              if (data.status_code === 200) {-->
<!--                await this.$store.commit(INDEX_SET_SUCCESS, {-->
<!--                  show: true,-->
<!--                  text: data.message-->
<!--                })-->
<!--                this.accountForm.token = data.data.token-->
<!--                this.step = 3-->
<!--              } else {-->
<!--                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })-->
<!--              }-->
<!--            } catch (err) {-->
<!--              await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })-->
<!--            }-->
<!--            await this.$store.commit(INDEX_SET_LOADING, false)-->
<!--          }-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--    register() {-->
<!--      if (!this.disabledButtonStep3) {-->
<!--        this.$refs.accountFormStep3.validate(async valid => {-->
<!--          if (valid) {-->
<!--            try {-->
<!--              await this.$store.commit(INDEX_SET_LOADING, true)-->
<!--              const data = await this.$store.dispatch(AUTH_REGISTER,-->
<!--                {-->
<!--                  name: this.accountForm.name,-->
<!--                  password: this.accountForm.password,-->
<!--                  password_confirmation: this.accountForm.password_confirm,-->
<!--                  token: this.accountForm.token-->
<!--                }-->
<!--              )-->
<!--              if (data.status_code === 200) {-->
<!--                await this.$store.commit(INDEX_SET_SUCCESS, {-->
<!--                  show: true,-->
<!--                  text: data.message-->
<!--                })-->
<!--                await this.$store.commit(INDEX_SET_LOADING, false)-->
<!--                await this.$emit('change', 'login')-->
<!--              } else {-->
<!--                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })-->
<!--              }-->
<!--            } catch (err) {-->
<!--              await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })-->
<!--            }-->
<!--            await this.$store.commit(INDEX_SET_LOADING, false)-->
<!--          }-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--    async changeModal(state) {-->
<!--      await this.$emit('change', state)-->
<!--    },-->
<!--    changeStep(step) {-->
<!--      if (this.step === 2) {-->
<!--        clearInterval(this.idCount)-->
<!--      }-->
<!--      this.step = step-->
<!--    },-->
<!--    formatPhone(phone_number) {-->
<!--      return '(+84)' + phone_number.slice(1, (phone_number.length))-->
<!--    },-->
<!--    checkValidate(value, status, message) {-->
<!--      this.validation[value] = status-->
<!--    },-->
<!--    showPwd(attr) {-->
<!--      if (this[attr] === 'password') {-->
<!--        this[attr] = ''-->
<!--      } else {-->
<!--        this[attr] = 'password'-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--</style>-->
