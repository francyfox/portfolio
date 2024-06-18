<script setup lang="ts">
import { type FormInst, NModal, NFormItem, NCheckbox, NForm, NInput, NButton, useMessage } from 'naive-ui'

const model = defineModel({ default: false })
const { t, locale } = useI18n()

const config = useRuntimeConfig()
const {
  turnstileSiteKey,
} = config.public as unknown as never

// eslint-disable-next-line unicorn/prevent-abbreviations
const formRef = ref<FormInst | undefined>(undefined)
const message = useMessage()
const rules = {
  fullName: {
    required: true,
    message: t('form.required'),
    trigger: 'blur',
  },
  phone: {
    required: true,
    pattern: String.raw`(\+7\s?[(]{0,1}[0-9]{3}[)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2})`,
    message: t('form.required'),
    trigger: ['input'],
  },
  message: {
    required: true,
    message: t('form.required'),
    trigger: ['input'],
  },
}
const formValue = ref({
  fullName: 'test',
  phone: '',
  hasSocial: false,
  company: '',
  message: 'test',
})

const onSubmitHandler = (error: Event) => {
  error.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      message.warning(t('form.sending'))

      const { data, error } = useFetch('/api/feedback', {
        method: 'POST',
        body: formValue.value,
      })

      console.log(data.value)
    }
  })
}
const onCancelHandler = () => {
  window.location.hash = ''
}
</script>

<template>
  <n-modal
    v-model:show="model"
    preset="dialog"
    :title="t('form.feedback.title')"
    :on-after-leave="onCancelHandler"
  >
    <n-form
      ref="formRef"
      :model="formValue"
      :rules="rules"
      class="mt-10"
      @submit="onSubmitHandler"
    >
      <n-form-item
        :label="t('form.feedback.fullName')"
        path="fullName"
      >
        <n-input
          v-model:value="formValue.fullName"
          placeholder=""
        />
      </n-form-item>

      <n-form-item
        :label="t('form.feedback.phone')"
        path="phone"
      >
        <n-input
          v-model:value="formValue.phone"
          v-maska
          placeholder=""
          :input-props="{ 'type': 'tel', 'data-maska': '+7 (###) ###-##-##' }"
        />
      </n-form-item>

      <n-form-item
        :show-label="false"
        path="hasSocial"
      >
        <n-checkbox
          v-model:checked="formValue.hasSocial"
        >
          {{ $t('form.feedback.hasSocial') }}
        </n-checkbox>
      </n-form-item>

      <n-form-item
        :label="t('form.feedback.company')"
        path="company"
      >
        <n-input
          v-model:value="formValue.company"
          placeholder=""
        />
      </n-form-item>

      <n-form-item
        :label="t('form.feedback.message')"
        path="message"
      >
        <n-input
          v-model:value="formValue.message"
          type="textarea"
          placeholder=""
        />
      </n-form-item>

      <n-form-item>
        <div
          ref="turnstileRef"
          class="cf-turnstile"
          :data-sitekey="turnstileSiteKey"
          data-theme="dark"
          :data-language="locale"
        />
      </n-form-item>

      <n-form-item :show-label="false">
        <n-button
          type="primary"
          attr-type="submit"
        >
          {{ $t('form.feedback.submit') }}

          <lucide-send
            class="ml-2"
            :width="20"
            :height="20"
          />
        </n-button>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style scoped>

</style>
