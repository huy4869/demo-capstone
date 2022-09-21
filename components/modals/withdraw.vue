<template>
  <div class="transaction">
    <div>Vui lòng nhập số point bạn muốn rút tại đây.</div>
    <div>1 point = 23,500 VND</div>
    <el-form
      ref="withdrawForm"
      :model="withdrawForm"
      :rules="accountRules"
      autocomplete="off"
      label-position="left"
    >
      <el-form-item class="email-login" prop="price" :error="withdrawForm.errors.price">
        <div>
          <label for="price">Point <label class="label_req">*</label></label>
          <span v-show="withdrawForm.price" class="point-to-money">{{
              withdrawForm.price
            }} points = {{ formatVnMoney(withdrawForm.price * 23500) }}</span>
        </div>
        <el-input
          id="price"
          ref="price"
          v-model.trim="withdrawForm.price"
          placeholder="0"
          name="price"
          tabindex="2"
          maxlength="10"
          type="text" oninput="this.value=this.value.replace(/[^0-9\.]/g,'');"
          @focus="resetValidate('price')"
        >
          <template slot="suffix">
            <span class="color-orange-1" @click="withdrawForm.price = $auth.user.balance">Tất cả</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="email-login" prop="bank_name" :error="withdrawForm.errors.bank_name">
        <label for="bank_name">Ngân hàng <label class="label_req">*</label></label>
        <el-input
          id="bank_name"
          ref="bank_name"
          v-model="withdrawForm.bank_name"
          placeholder="Ngân hàng"
          name="bank_name"
          type="text"
          tabindex="2"
          maxlength="50"
          @focus="resetValidate('bank_name')"
        />
      </el-form-item>
      <el-form-item class="email-login" prop="bank_account" :error="withdrawForm.errors.bank_account">
        <label for="bank_account">Số tài khoản <label class="label_req">*</label></label>
        <el-input
          id="bank_account"
          ref="bank_account"
          v-model.trim="withdrawForm.bank_account"
          placeholder="Số tài khoản"
          name="bank_account"
          tabindex="2"
          type="number" data-maxlength="20" oninput="this.value=this.value.slice(0,this.dataset.maxlength)"
          @focus="resetValidate('bank_account')"
        />
      </el-form-item>
      <el-form-item class="email-login" prop="bank_account_name" :error="withdrawForm.errors.bank_account_name">
        <label for="bank_account_name">Tên chủ tài khoản <label class="label_req">*</label></label>
        <el-input
          id="bank_account_name"
          ref="bank_account_name"
          v-model="withdrawForm.bank_account_name"
          placeholder="Tên chủ tài khoản"
          name="bank_account_name"
          type="text"
          tabindex="2"
          maxlength="50"
          @focus="resetValidate('bank_account_name')"
        />
      </el-form-item>
      <el-form-item>
        <center>
          <el-button
            class="button-common"
            :disabled="disabledButton || isLoading"
            @click.native="submit"
          >
            Tạo yêu cầu rút tiền
          </el-button>
        </center>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ADD_REQUEST_WITHDRAW, INDEX_SET_ERROR, INDEX_SET_LOADING, INDEX_SET_SUCCESS } from '~/store/store.const'
import { handleServerError } from '@/utils/validate.js'
import { formatVnMoney } from '@/utils/format.js'

export default {
  name: 'WithdrawnModal',
  // eslint-disable-next-line vue/require-prop-types
  data() {
    const validatePrice = (rule, value, callback) => {
      if (Number(this.withdrawForm.price) === 0) {
        callback(new Error(this.$t('noti.value_0')))
      } else if (value) {
        if (Number(value) === 0) {
          callback(new Error(this.$t('noti.value_0')))
        } else if (Number(value) > Number(this.$auth.user.balance)) {
          callback(new Error(this.$t('noti.not_enough_balance')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      isLoading: false,
      withdrawForm: {
        price: '',
        bank_name: '',
        bank_account: '',
        bank_account_name: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        price: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: 'Point' }),
            trigger: 'blur'
          },
          {
            validator: validatePrice, trigger: 'blur'
          }
        ],
        bank_name: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: 'Ngân hàng' }),
            trigger: 'blur'
          }
        ],
        bank_account: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: 'Số tài khoản' }),
            trigger: 'blur'
          }
        ],
        bank_account_name: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: 'Tên chủ tài khoản' }),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    disabledButton() {
      return this.withdrawForm.price === '' ||
        this.withdrawForm.bank_account === '' ||
        this.withdrawForm.bank_account_name === '' ||
        this.withdrawForm.bank_name === ''
    }
  },
  watch: {
    'withdrawForm.price'() {
      const arr = this.withdrawForm.price.toString().replace(/[^0-9\\.]/g, '').split('.')
      if (arr.length > 2) {
        this.withdrawForm.price = arr[0] + '.' + arr[1]
      }
      if (Number(this.withdrawForm.price) > Number(this.$auth.user.balance)) {
        this.withdrawForm.errors.price = this.$t('noti.not_enough_balance')
      } else {
        this.withdrawForm.errors.price = ''
      }
    }
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.withdrawForm.fields.find((f) => f.prop === ref).clearValidate()
      this.withdrawForm.errors[ref] = ''
    },
    validateForm() {
      this.$refs.withdrawForm.validate(valid => {
        this.isValid = valid
      })
    },
    async submit() {
      this.isLoading = true
      await this.$store.commit(INDEX_SET_LOADING, true)
      await this.$auth.fetchUser()
      this.error = { key: null, value: '' }
      this.validateForm()
      if (!this.isValid) {
        await this.$store.commit(INDEX_SET_LOADING, false)
        this.isLoading = false
        return
      }
      const response = await this.$store.dispatch(ADD_REQUEST_WITHDRAW, this.withdrawForm)
      if (response.status_code === 200) {
        this.withdrawForm.errors = {}
        await this.$store.commit(INDEX_SET_SUCCESS, {
          show: true,
          text: this.$t('noti.success'),
          message: this.$t('noti.withdraw_success')
        })
        this.$emit('success')
      } else if (response.status_code === 422) {
        this.withdrawForm.errors = handleServerError(this.withdrawForm.errors, response.data)
      } else {
        await this.$store.commit(INDEX_SET_ERROR, {
          show: true,
          text: response.message
        })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
      this.isLoading = false
      this.$forceUpdate()
    },
    formatVnMoney(money) {
      return formatVnMoney(money)
    }
  }
}
</script>

<style scoped>
.point-to-money {
  float: right;
  font-size: 13px;
  font-weight: 400;
  color: #959CA1;
}
</style>
