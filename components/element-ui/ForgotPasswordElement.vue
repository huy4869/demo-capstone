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
<!--      >-->
<!--        <el-form-item label="" prop="phone">-->
<!--          <el-input-->
<!--            ref="phone"-->
<!--            v-model.trim="accountForm.phone"-->
<!--            :placeholder="$t('modal_login.phone')"-->
<!--            name="text"-->
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
<!--              {{ $t('next') }}-->
<!--            </el-button>-->
<!--          </div>-->
<!--        </el-form-item>-->
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
<!--        <el-form-item prop="newPassword">-->
<!--          <el-input-->
<!--            ref="newPassword"-->
<!--            :key="passwordTypeNew"-->
<!--            v-model.trim="accountForm.newPassword"-->
<!--            :placeholder="$t('modal_login.password')"-->
<!--            name="newPassword"-->
<!--            tabindex="4"-->
<!--            maxlength="32"-->
<!--            autocomplete="off"-->
<!--            :type="passwordTypeNew"-->
<!--            @blur="capsToolNewPasswordTip = false"-->
<!--            @keyup.native="checkCapslock($event, 'capsToolNewPasswordTip')"-->
<!--            @focus="resetValidate('newPassword')"-->
<!--          />-->
<!--          <span class="show-pwd" @click="showPwd('passwordTypeNew')">-->
<!--            <img v-if="passwordTypeNew === 'password'" src="/assets/images/icons/hide.svg" alt="">-->
<!--            <img v-else src="/assets/images/icons/eye.svg" alt="">-->
<!--          </span>-->
<!--        </el-form-item>-->
<!--        <el-form-item prop="reNewPassword">-->
<!--          <el-input-->
<!--            ref="reNewPassword"-->
<!--            :key="passwordTypeReNew"-->
<!--            v-model.trim="accountForm.reNewPassword"-->
<!--            :placeholder="$t('modal_login.password_confirm')"-->
<!--            name="reNewPassword"-->
<!--            :type="passwordTypeReNew"-->
<!--            tabindex="5"-->
<!--            maxlength="32"-->
<!--            autocomplete="off"-->
<!--            @blur="capsToolReNewPasswordTip = false"-->
<!--            @keyup.native="checkCapslock($event, 'capsToolReNewPasswordTip')"-->
<!--            @focus="resetValidate('reNewPassword')"-->
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
<!--              @click="resetPassword"-->
<!--            >-->
<!--              {{ $t('modal_login.reset_password') }}-->
<!--            </el-button>-->
<!--          </div>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
<!--    <img-->
<!--      v-if="[1, 2, 3].includes(step)"-->
<!--      src="/assets/images/icons/arrow-down-prev.svg"-->
<!--      class="btn-back-modal"-->
<!--      alt=""-->
<!--      @click="changeStep(step - 1 )"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {-->
<!--  AUTH_FORGOT_PASSWORD,-->
<!--  AUTH_RE_SEND_OTP,-->
<!--  AUTH_FORGOT_PASSWORD_VERIFY,-->
<!--  INDEX_SET_ERROR,-->
<!--  INDEX_SET_LOADING,-->
<!--  INDEX_SET_SUCCESS,-->
<!--  AUTH_RESET_PASSWORD-->
<!--} from '../../store/store.const'-->
<!--import { handleServerError } from '@/utils/validate'-->
<!--export default {-->
<!--  name: 'ForgotPasswordElement',-->
<!--  data() {-->
<!--    return {-->
<!--      accountForm: {-->
<!--        phone: '',-->
<!--        name: '',-->
<!--        password: '',-->
<!--        password_confirm: '',-->
<!--        token: '',-->
<!--        errors: {}-->
<!--      },-->
<!--      accountRules: {-->
<!--        phone: [-->
<!--          { required: true, message: this.$t('validation.required', { _field_: this.$t('modal_login.phone') }), trigger: 'blur' }-->
<!--        ],-->
<!--        name: [-->
<!--          { required: true, message: this.$t('validation.required', { _field_: this.$t('modal_login.phone') }), trigger: 'blur' }-->
<!--        ],-->
<!--        password: [-->
<!--          { required: true, message: this.$t('validation.required', { _field_: this.$t('modal_login.password') }), trigger: 'blur' }-->
<!--        ],-->
<!--        password_confirm: [-->
<!--          { required: true, message: this.$t('validation.required', { _field_: this.$t('modal_login.password') }), trigger: 'blur' }-->
<!--        ],-->
<!--        remember: []-->
<!--      },-->
<!--      capsToolPasswordTip: false,-->
<!--      loading: false,-->
<!--      fullscreenLoading: false,-->
<!--      step: 1,-->
<!--      configTitle: {-->
<!--        1: this.$t('modal_login.send_forgot_password'),-->
<!--        2: this.$t('modal_login.title_confirm'),-->
<!--        3: this.$t('modal_login.reset_password')-->
<!--      },-->
<!--      capsToolNewPasswordTip: false,-->
<!--      capsToolReNewPasswordTip: false,-->
<!--      passwordTypeReNew: 'password',-->
<!--      passwordTypeNew: 'password',-->
<!--      otpCode: [-->
<!--        { key: 1, value: null },-->
<!--        { key: 2, value: null },-->
<!--        { key: 3, value: null },-->
<!--        { key: 4, value: null },-->
<!--        { key: 5, value: null },-->
<!--        { key: 6, value: null }-->
<!--      ],-->
<!--      timerCount: 0,-->
<!--      idCount: null-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    disabledButtonStep1() {-->
<!--      if (this.accountForm.phone.length < 10) {-->
<!--        return true-->
<!--      }-->
<!--      return false-->
<!--    },-->
<!--    disabledButtonStep2() {-->
<!--      if (this.accountForm.phone.length < 10) {-->
<!--        return true-->
<!--      }-->
<!--      return false-->
<!--    },-->
<!--    disabledButtonStep3() {-->
<!--      if (this.accountForm.phone.length < 10) {-->
<!--        return true-->
<!--      }-->
<!--      return false-->
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
<!--      this.$emit('changeTitle', { state: 'forgot', value: this.configTitle[this.step] })-->
<!--    },-->
<!--    timerCount: {-->
<!--      handler(value) {-->
<!--        if (value === 60) {-->
<!--          clearInterval()-->
<!--        }-->
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
<!--              const data = await this.$store.dispatch(AUTH_FORGOT_PASSWORD, { phone_number: this.accountForm.phone, type: 2 })-->
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
<!--    confirmOtp() {-->
<!--      if (!this.disabledButtonStep2) {-->
<!--        this.$refs.accountFormStep2.validate(async valid => {-->
<!--          if (valid) {-->
<!--            try {-->
<!--              await this.$store.commit(INDEX_SET_LOADING, true)-->
<!--              const data = await this.$store.dispatch(AUTH_FORGOT_PASSWORD_VERIFY, { phone_number: this.accountForm.phone, code_otp: this.otp })-->
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
<!--    backPrevInput($event, index) {-->
<!--      if ((index > 0) && (this.otpCode[index].value === '')) {-->
<!--        this.$refs.optCode[index - 1].focus()-->
<!--        $event.preventDefault()-->
<!--      }-->
<!--    },-->
<!--    resetPassword() {-->
<!--      if (!this.disabledButtonStep3) {-->
<!--        this.$refs.accountFormStep3.validate(async valid => {-->
<!--          if (valid) {-->
<!--            try {-->
<!--              await this.$store.commit(INDEX_SET_LOADING, true)-->
<!--              const data = await this.$store.dispatch(AUTH_RESET_PASSWORD,-->
<!--                {-->
<!--                  password: this.accountForm.newPassword,-->
<!--                  password_confirmation: this.accountForm.reNewPassword,-->
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
<!--    handleUpdate() {-->
<!--      this.$refs.accountForm.validate(valid => {-->
<!--        if (valid) {-->
<!--          this.loading = true-->
<!--          this.fullscreenLoading = true-->
<!--          this.$store.dispatch(`account/update`, this.accountForm)-->
<!--            .then((response) => {-->
<!--              this.$message({ message: response.message, type: 'success' })-->
<!--              this.loading = false-->
<!--              this.fullscreenLoading = false-->
<!--            })-->
<!--            .catch((data) => {-->
<!--              if (data.code === 422) {-->
<!--                this.accountForm.errors = handleServerError(this.accountForm.errors, data.data)-->
<!--              }-->
<!--              this.loading = false-->
<!--              this.fullscreenLoading = false-->
<!--            })-->
<!--        } else {-->
<!--          return false-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--    async changeModal(state) {-->
<!--      await this.$emit('change', state)-->
<!--    },-->
<!--    async changeStep(step) {-->
<!--      if (this.step === 2) {-->
<!--        clearInterval(this.idCount)-->
<!--      }-->
<!--      if (step === 0) {-->
<!--        await this.changeModal('login')-->
<!--      } else {-->
<!--        this.step = step-->
<!--      }-->
<!--    },-->
<!--    formatPhone(phone_number) {-->
<!--      return '(+84)' + phone_number.slice(1, (phone_number.length))-->
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
