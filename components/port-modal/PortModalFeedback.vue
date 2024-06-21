<script setup lang="ts">
import { type FormInst, NModal, NFormItem, NCheckbox, NForm, NInput, NButton, useMessage, useDialog } from 'naive-ui'
import VueTurnstile from 'vue-turnstile'

const dialog = useDialog()
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
  fullName: '',
  phone: '',
  hasSocial: false,
  company: '',
  message: '',
  token: '',
})

const onSubmitHandler = (error: Event) => {
  error.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const { data, status } = useFetch('/api/feedback', {
        method: 'POST',
        body: formValue.value,
      })

      model.value = false

      watch(status, () => {
        switch (status.value) {
          case 'pending': {
            message.warning(t('form.sending'))
            break
          }
          case 'success': {
            console.log(data)
            dialog.success({
              title: 'Success',
              content: t('form.success'),
              onPositiveClick: () => {
                message.success('OK')
              },
            })
            break
          }
          case 'error': {
            dialog.error({
              title: 'Error',
              content: t('form.error'),
              onPositiveClick: () => {
                message.success('OK')
              },
            })
            break
          }
        }
      })
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
        <vue-turnstile
          v-model="formValue.token"
          :site-key="turnstileSiteKey"
          theme="dark"
          :language="locale"
          class="max-w-[100%] box-border overflow-hidden"
        />
      </n-form-item>

      <n-form-item :show-label="false">
        <n-button
          type="primary"
          attr-type="submit"
          @click="onSubmitHandler"
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
