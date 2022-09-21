<template>
  <div class="container">
    <h3 class="title">Thông tin cá nhân</h3>
    <hr class="line">
    <div class="main-login">
      <div class="login login-width login-mobile">
        <el-form
          ref="accountForm"
          :model="accountForm"
          :rules="accountRules"
          autocomplete="off"
          label-position="left"
          @keyup.enter.native="login"
        >
          <el-form-item
            class="email-login" :label="$t('account.email')" prop="email"
            :error="(error.key === 'email') ? error.value : ''">
            <el-input
              id="email"
              ref="email"
              v-model.trim="accountForm.email"
              :placeholder="$t('account.email')"
              name="email"
              disabled
              type="text"
              tabindex="2"
              maxlength="40"
              @focus="resetValidate('email')"
            />
          </el-form-item>
          <el-form-item
            class="email-login" prop="name" :label="$t('account.fullName')"
            :error="(error.key === 'name') ? error.value : ''">
            <el-input
              id="name"
              ref="name"
              v-model="accountForm.name"
              :placeholder="$t('account.fullName')"
              name="name"
              type="text"
              tabindex="2"
              maxlength="50"
              @focus="resetValidate('name')"
            />
          </el-form-item>
          <el-form-item class="email-login" prop="phone" :error="(error.key === 'phone') ? error.value : ''">
            <label>{{ $t('account.phoneNumber') }}</label>
            <el-input
              id="phone"
              ref="phone"
              v-model="accountForm.phone"
              :placeholder="$t('account.phone')"
              name="phone"
              tabindex="3"
              type="text" oninput="this.value=this.value.replace(/[^0-9\.]/g,'');"
              maxlength="12"
              @focus="resetValidate('phone')"
            >
            </el-input>
          </el-form-item>

          <div class="d-flex align-items-center text_link">
            <div class="here" @click="showChangePass()">Đổi mật khẩu</div>
          </div>
          <div :class="{change_pass: !isChangePass}">
            <el-form-item
              class="email-login" prop="password"
              :error="getErrResponse('password')">
              <label for="password">{{ $t('account.current_pass') }} <label class="label_req">*</label></label>
              <el-input
                id="password"
                ref="password"
                v-model="accountForm.password"
                :placeholder="$t('account.current_pass')"
                name="password"
                :type="showPass?'text':'password'"
                tabindex="3"
                maxlength="32"
                autocomplete="off"
                @focus="resetValidate('password')"
              >
                <i slot="suffix" class="cursor-pointer" @click="displayPass('pass')">
                  <img v-if="showPass" class="icon-show-pass" src="~/assets/images/icons/eye-input.svg"/>
                  <img v-else class="icon-show-pass" src="@/assets/images/icons/hide-eye.svg"/>
                </i>
              </el-input>
            </el-form-item>
            <el-form-item
              class="email-login" prop="new_password"
              :error="getErrResponse('new_password')">
              <label for="new_password">{{ $t('account.new_password') }} <label class="label_req">*</label></label>
              <el-input
                id="new_password"
                ref="new_password"
                v-model="accountForm.new_password"
                :placeholder="$t('account.new_password')"
                name="new_password"
                :type="showNewPass?'text':'password'"
                tabindex="3"
                maxlength="32"
                autocomplete="off"
                @focus="resetValidate('new_password')"
              >
                <i slot="suffix" class="cursor-pointer" @click="displayPass('newPass')">
                  <img v-if="showNewPass" class="icon-show-pass" src="~/assets/images/icons/eye-input.svg"/>
                  <img v-else class="icon-show-pass" src="@/assets/images/icons/hide-eye.svg"/>
                </i>
              </el-input>
            </el-form-item>
            <el-form-item
              class="email-login" prop="new_password_confirmation"
              :error="getErrResponse('new_password_confirmation')">
              <label for="password_confirmation">{{ $t('account.password_confirmation') }} <label
                class="label_req">*</label></label>

              <el-input
                id="password_confirmation"
                ref="new_password_confirmation"
                v-model="accountForm.new_password_confirmation"
                :placeholder="$t('account.password_confirmation')"
                name="new_password_confirmation"
                :type="showPassConfirm?'text':'password'"
                tabindex="3"
                maxlength="32"
                autocomplete="off"
                @focus="resetValidate('new_password_confirmation')"
              >
                <i slot="suffix" class="cursor-pointer" @click="displayPass('passConfirm')">
                  <img v-if="showPassConfirm" class="icon-show-pass" src="~/assets/images/icons/eye-input.svg"/>
                  <img v-else class="icon-show-pass" src="@/assets/images/icons/hide-eye.svg"/>
                </i>
              </el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <div class="save_button common-button">
              <el-button class="common-button" :disabled="disabledButton" @click.native="update">
                Lưu thông tin
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { INDEX_SET_ERROR, INDEX_SET_LOADING, INDEX_SET_SUCCESS, USER_UPDATE } from '@/store/store.const'
import { validEmail, validPassword, validPhoneNoPrefix } from '@/utils/validate'

export default {
  name: 'ProfilePage',
  middleware: 'auth',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error(this.$t('validation.email_format')))
      } else {
        callback()
      }
    }

    const validateConfirmPass = (rule, value, callback) => {
      if (this.accountForm.password) {
        if (!value) {
          callback(new Error(this.$t('validation.required', { _field_: this.$t('account.password_confirmation') })))
        } else if (value !== this.accountForm.new_password) {
          callback(new Error(this.$t('validation.passNotMatch')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    const validateNewPass = (rule, value, callback) => {
      if (this.accountForm.password) {
        if (!value) {
          callback(new Error(this.$t('validation.required', { _field_: this.$t('account.password_confirmation') })))
        } else if (value.length < 8 || value > 32 || !validPassword(value)) {
          callback(new Error(this.$t('validation.pass_format')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    const validPhoneNumber = (rule, value, callback) => {
      if (value == null || value === '') {
        callback()
      } else if (!validPhoneNoPrefix(value)) {
        callback(new Error(this.$t('validation.phone_length')))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        email: this.$auth.user.email,
        password: '',
        name: this.$auth.user.name,
        phone: this.$auth.user.phone,
        new_password: '',
        new_password_confirmation: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        email: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.email') }),
            trigger: 'blur'
          },
          {
            validator: validateEmail, trigger: 'blur'
          }
        ],
        phone: [
          {
            validator: validPhoneNumber, trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.fullName') }),
            trigger: 'blur'
          }
        ],
        new_password: [
          {
            validator: validateNewPass,
            trigger: 'blur'
          }
        ],
        new_password_confirmation: [
          {
            validator: validateConfirmPass,
            trigger: 'blur'
          }
        ]
      },
      valid: false,
      showPass: false,
      showNewPass: false,
      showPassConfirm: false,
      isValid: false,
      isAuthErr: false,
      isChangePass: false
    }
  },
  computed: {
    disabledButton() {
      let check = false
      this.isChangePass
        ? check = this.accountForm.name === '' || this.accountForm.password === '' ||
          this.accountForm.new_password === '' || this.accountForm.new_password_confirmation === ''
        : check = this.accountForm.name === ''
      return check
    }
  },
  methods: {
    handeRegister() {
      this.$router.push('/register')
    },
    showChangePass() {
      this.isChangePass = !this.isChangePass
      this.accountForm.password = ''
      this.accountForm.new_password = ''
      this.accountForm.new_password_confirmation = ''
      this.resetValidate('password')
      this.resetValidate('new_password')
      this.resetValidate('new_password_confirmation')
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    async update() {
      this.error = { key: null, value: '' }
      this.validateForm()
      if (!this.isValid) {
        return
      }
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dto = {
        email: this.$auth.user.email,
        name: this.accountForm.name,
        phone: this.accountForm.phone,
        password: this.accountForm.password,
        new_password: this.accountForm.new_password,
        new_password_confirmation: this.accountForm.new_password_confirmation
      }
      // if (this.isChangePass) {
      //   dto = {
      //     ...dto,
      //     password: this.accountForm.password,
      //     new_password: this.accountForm.new_password,
      //     new_password_confirmation: this.accountForm.new_password_confirmation
      //   }
      // }
      const response = await this.$store.dispatch(USER_UPDATE, dto)
      if (response.status_code === 200) {
        await this.$store.commit(INDEX_SET_SUCCESS, {
          show: true,
          text: response.message
        })
        await this.$auth.fetchUser()
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: response.message
        })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    validateForm() {
      this.$refs.accountForm.validate(valid => {
        this.isValid = valid
      })
    },
    displayPass(type) {
      if (type === 'pass') {
        this.showPass = !this.showPass
      } else if (type === 'newPass') {
        this.showNewPass = !this.showNewPass
      } else {
        this.showPassConfirm = !this.showPassConfirm
      }
    },
    getErrResponse(key) {
      let result = ''
      if (this.errorResponse == null || this.errorResponse.length === 0) {
        return
      }
      this.errorResponse.forEach(err => {
        if (err.key === key) {
          result = err.value
          return false
        }
      })
      return result
    }
  }
}
</script>
<style scoped lang="scss">
</style>
