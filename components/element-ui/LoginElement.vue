<template>
  <div class="modal-login">
    <el-form
      ref="accountForm"
      :model="accountForm"
      :rules="accountRules"
      label-width="200px"
      autocomplete="off"
      label-position="left"
    >
      <el-form-item label="" prop="email" :error="(error.key === 'email') ? error.value : ''">
        <el-input
          ref="email"
          v-model.trim="accountForm.email"
          :placeholder="$t('modal_login.phone')"
          name="email"
          type="text"
          tabindex="2"
          show-word-limit
          @focus="resetValidate('email')"
        />
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input
          ref="password"
          v-model="accountForm.password"
          :placeholder="$t('modal_login.password')"
          name="password"
          type="password"
          tabindex="3"
          maxlength="32"
          autocomplete="off"
          @focus="resetValidate('password')"
        />
      </el-form-item>
      <div class="d-flex align-items-center check-remember">
        <el-checkbox v-model="accountForm.remember" :label="$t('modal_login.remember_me')" size="large"></el-checkbox>
        <span class="login-page__forgot-password" @click="changeModal('forgot')">
          {{ $t('modal_login.forgot_password') }}
        </span>
      </div>
      <el-form-item>
        <div :class="{'disabled' : disabledButton}">
          <el-button
            v-loading.fullscreen.lock="fullscreenLoading"
            :loading="loading"
            type="danger"
            @click.native.prevent="login"
          >
            {{ $t('login') }}
          </el-button>
        </div>
      </el-form-item>
      <div class="link_register">
        <span class="no_account">{{ $t('modal_login.have_account') }}</span>
        <span class="register_button" @click="changeModal('register')">{{ $t('register') }}</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { INDEX_SET_LOADING, INDEX_SET_SUCCESS, INDEX_SET_ERROR } from '../../store/store.const'
import { validPhone } from '@/utils/validate'

export default {
  name: 'LoginElement',
  data() {
    const validPhoneNumber = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error(this.$t('validation.phone')))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        email: '',
        password: '',
        remember: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        email: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('modal_login.phone') }), trigger: 'blur' },
          { validator: validPhoneNumber, trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('modal_login.password') }), trigger: 'blur' }
        ],
        remember: []
      },
      valid: false,
      capsToolPasswordTip: false,
      loading: false,
      fullscreenLoading: false
    }
  },
  computed: {
    disabledButton() {
      if (this.accountForm.email === '' || this.accountForm.password === '') {
        return true
      }
      return false
    }
  },
  created() {
    if (this.$refs.accountForm !== undefined) {
      this.resetValidate('accountForm')
    }
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    checkCapslock(e, attr) {
      const { key } = e
      this[attr] = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    login() {
      this.error = { key: null, value: '' }
      this.$refs.accountForm.validate(async valid => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const { data } = await this.$auth.loginWith('local', {
              data: {
                phone_number: this.accountForm.email,
                password: this.accountForm.password,
                remember: this.accountForm.remember ? 1 : 0
              }
            })
            switch (data.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: data.message
                })
                await this.$emit('close')
                break
              case 422:
                for (const [key] of Object.entries(data.data)) {
                  this.error = { key, value: data.data[key][0] }
                }
                break
              default:
                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.message })
                break
            }
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        }
      })
    },
    async changeModal(state) {
      await this.$emit('change', state)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
