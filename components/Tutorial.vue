<template>
  <el-form
    ref="accountForm"
    :model="accountForm"
    :rules="accountRules"
    label-width="200px"
    autocomplete="off"
    label-position="left"
  >
    <el-form-item :label="$t('account.name')" prop="name" :error="accountForm.errors.name">
      <el-input
        ref="name"
        v-model.trim="accountForm.name"
        :placeholder="$t('account.name')"
        name="name"
        type="text"
        tabindex="1"
        maxlength="32"
        show-word-limit
        @focus="resetValidate('name')"
      />
    </el-form-item>

    <el-form-item :label="$t('account.email')" prop="email">
      <el-input
        ref="email"
        v-model.trim="accountForm.email"
        :placeholder="$t('account.email')"
        name="email"
        disabled
        type="text"
        tabindex="2"
        maxlength="64"
        show-word-limit
        @focus="resetValidate('email')"
      />
    </el-form-item>

    <el-form-item label="">
      <el-checkbox v-model="accountForm.editPassword">{{ $t('account.change-password') }}</el-checkbox>
    </el-form-item>

    <template v-if="accountForm.editPassword">
      <el-tooltip v-model="capsToolOldPasswordTip" :content="$t('common.caps-lock-on')" placement="right" manual>
        <el-form-item :label="$t('account.old-password')" prop="oldPassword">
          <el-input
            ref="oldPassword"
            :key="passwordTypeOld"
            v-model="accountForm.oldPassword"
            :placeholder="$t('account.old-password')"
            name="oldPassword"
            :type="passwordTypeOld"
            tabindex="3"
            maxlength="32"
            autocomplete="off"
            @blur="capsToolOldPasswordTip = false"
            @keyup.native="checkCapslock($event, 'capsToolOldPasswordTip')"
            @focus="resetValidate('oldPassword')"
          />
          <span class="show-pwd" @click="showPwd('passwordTypeOld')">
            <svg-icon :icon-class="passwordTypeOld === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-tooltip v-model="capsToolNewPasswordTip" :content="$t('common.caps-lock-on')" placement="right" manual>
        <el-form-item :label="$t('account.new-password')" prop="newPassword">
          <el-input
            ref="newPassword"
            :key="passwordTypeNew"
            v-model.trim="accountForm.newPassword"
            :placeholder="$t('account.new-password')"
            name="newPassword"
            tabindex="4"
            maxlength="32"
            autocomplete="off"
            :type="passwordTypeNew"
            @blur="capsToolNewPasswordTip = false"
            @keyup.native="checkCapslock($event, 'capsToolNewPasswordTip')"
            @focus="resetValidate('newPassword')"
          />
          <span class="show-pwd" @click="showPwd('passwordTypeNew')">
            <svg-icon :icon-class="passwordTypeNew === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-tooltip v-model="capsToolReNewPasswordTip" :content="$t('common.caps-lock-on')" placement="right" manual>
        <el-form-item :label="$t('account.re-new-password')" prop="reNewPassword">
          <el-input
            ref="reNewPassword"
            :key="passwordTypeReNew"
            v-model.trim="accountForm.reNewPassword"
            :placeholder="$t('account.re-new-password')"
            name="reNewPassword"
            :type="passwordTypeReNew"
            tabindex="5"
            maxlength="32"
            autocomplete="off"
            @blur="capsToolReNewPasswordTip = false"
            @keyup.native="checkCapslock($event, 'capsToolReNewPasswordTip')"
            @focus="resetValidate('reNewPassword')"
          />
          <span class="show-pwd" @click="showPwd('passwordTypeReNew')">
            <svg-icon :icon-class="passwordTypeReNew === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
    </template>

    <el-form-item>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        :loading="loading"
        type="primary"
        @click.native.prevent="handleUpdate"
      >
        {{ $t('account.save') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validPassword, validUsername, handleServerError } from '@/utils/validate'

export default {
  name: 'TutorialElement',
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    const validReNewPassword = (rule, value, callback) => {
      if (value !== this.accountForm.newPassword) {
        callback(new Error(this.$t('validation.confirm-password')))
      } else {
        callback()
      }
    }

    const validNewPassword = (rule, value, callback) => {
      if (value === this.accountForm.oldPassword) {
        callback(new Error(this.$t('validation.confirm-new-password')))
      } else {
        callback()
      }
    }

    const validFormatPassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error(this.$t('validation.format-password')))
      } else {
        callback()
      }
    }

    const validFormatUserName = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error(this.$t('validation.format-username')))
      } else {
        callback()
      }
    }

    return {
      passwordTypeOld: 'password',
      passwordTypeReNew: 'password',
      passwordTypeNew: 'password',
      accountForm: {
        name: 'admin123',
        email: 'admin@gmail.com',
        editPassword: false,
        oldPassword: '',
        newPassword: '',
        reNewPassword: '',
        errors: {}
      },
      accountRules: {
        name: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('account.name') }), trigger: 'blur' },
          {
            validator: validFormatUserName,
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('account.email') }), trigger: 'blur' },
          { type: 'email', message: this.$t('validation.email'), trigger: 'blur' }
        ],
        oldPassword: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('account.old-password') }), trigger: 'blur' }
        ],
        newPassword: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.new-password') }),
            trigger: 'blur'
          },
          {
            validator: validNewPassword,
            trigger: 'blur'
          },
          {
            validator: validFormatPassword,
            trigger: 'blur'
          }
        ],
        reNewPassword: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('account.re-new-password') }),
            trigger: 'blur'
          },
          {
            validator: validReNewPassword,
            trigger: 'blur'
          }
        ]
      },
      passwordType: 'password',
      capsToolOldPasswordTip: false,
      capsToolNewPasswordTip: false,
      capsToolReNewPasswordTip: false,
      loading: false,
      fullscreenLoading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  methods: {
    resetValidate(ref) {
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },

    checkCapslock(e, attr) {
      const { key } = e
      this[attr] = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },

    showPwd(attr) {
      if (this[attr] === 'password') {
        this[attr] = ''
      } else {
        this[attr] = 'password'
      }
    },

    handleUpdate() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.fullscreenLoading = true
          this.$store.dispatch(`account/update`, this.accountForm)
            .then((response) => {
              this.$message({ message: response.message, type: 'success' })
              this.loading = false
              this.fullscreenLoading = false
            })
            .catch((data) => {
              if (data.code === 422) {
                this.accountForm.errors = handleServerError(this.accountForm.errors, data.data)
              }
              this.loading = false
              this.fullscreenLoading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$dark_gray: #889aa4;
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
