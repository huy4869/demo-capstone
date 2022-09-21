<template>
  <div class="transaction">
    <el-form
      ref="transactionForm"
      :model="transactionForm"
      :rules="accountRules"
      autocomplete="off"
      label-position="left"
    >
      <el-form-item class="email-login" prop="transaction_code" :error="(error.key === 'transaction_code') ? error.value : ''">
        <label for="transaction_code">Mã giao dịch cá nhân</label>
        <el-input
          id="transaction_code"
          ref="transaction_code"
          v-model.trim="transactionForm.transaction_code"
          placeholder="Mã giao dịch cá nhân"
          name="transaction_code"
          type="text"
          tabindex="2"
          maxlength="40"
          @focus="resetValidate('transaction_code')"
        />
      </el-form-item>
      <el-form-item>
        <div :class="{'common-button': 'common-button'}">
          <el-button
            class="button"
            @click.native="submit"
          >
            Mua gói
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'TransactionModal',
  // eslint-disable-next-line vue/require-prop-types
  data() {
    return {
      transactionForm: {
        transaction_code: '',
        errors: {}
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        transaction_code: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: 'Mã giao dịch cá nhân' }),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.transactionForm.fields.find((f) => f.prop === ref).clearValidate()
      this.transactionForm.errors[ref] = ''
    },
    validateForm() {
      this.$refs.transactionForm.validate(valid => {
        this.isValid = valid
      })
    },
    submit() {
      this.error = { key: null, value: '' }
      this.validateForm()
      if (!this.isValid) {
        return
      }
      this.$emit('submit', this.transactionForm.transaction_code)
    }
  }
}
</script>
