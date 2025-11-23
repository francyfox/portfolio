<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type FormInst, NModal, NFormItem, NCheckbox, NForm, NInput, NButton, useMessage, useDialog } from 'naive-ui'
import VueTurnstile from 'vue-turnstile'

const {
  turnstileSiteKey,
} = defineProps<{
  turnstileSiteKey?: string
}>()

const dialog = useDialog()
const model = ref(false)

const formRef = ref<FormInst | undefined>(undefined)
const message = useMessage()
const rules = {
  fullName: {
    required: true,
    message: "Required!",
    trigger: 'blur',
  },
  phone: {
    pattern: String.raw`(\+7\s?[(]{0,1}[0-9]{3}[)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2})`,
    message: "Bad phone number",
    trigger: ['input'],
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Bad email address",
    trigger: ['input'],
  },
  message: {
    required: true,
    message: "Required!",
    trigger: ['input'],
  },
}
const formValue = ref({
  fullName: '',
  phone: '',
  email: '',
  hasSocial: false,
  company: '',
  message: '',
  token: '',
})

const onSubmitHandler = (error: Event) => {
  error.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify(formValue.value),
      })

      const { status, ok, statusText } = response;
      const data = await response.json();

      model.value = false

      if (ok) {
        dialog.success({
          title: 'Success',
          content: "Accepted!",
          onPositiveClick: () => {
            message.success('OK')
          },
        })
      } else {
        dialog.error({
          title: statusText,
          content: data?.error,
          onPositiveClick: () => {
            message.success('OK')
          },
        })
      }
    }
  })
}
const onCancelHandler = () => {
  window.location.hash = ''
}

onMounted(() => {
  if (window.location.hash === '#feedback') {
    model.value = true
  }

  window.addEventListener('hashchange', function() {
    if (window.location.hash === '#feedback') {
      model.value = true
    } else {
      model.value = false
    }
  })
})
</script>

<template>
  <n-modal
      v-model:show="model"
      preset="dialog"
      title="Feedback"
      :on-after-leave="onCancelHandler"
      class="form"
  >
    <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        class="mt-10"
    >
      <n-form-item
          label="FullName"
          path="fullName"
      >
        <n-input
            v-model:value="formValue.fullName"
            placeholder=""
        />
      </n-form-item>

      <n-form-item
          label="Email"
          path="email"
      >
        <n-input
            v-model:value="formValue.email"
            placeholder=""
        />
      </n-form-item>

      <n-form-item
          label="Phone (Qazaqstan only)"
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
          class="my-[-10px]"
          :show-label="false"
          path="hasSocial"
      >
        <n-checkbox
            v-model:checked="formValue.hasSocial"
        >
          Have Telegram/WhatsApp
        </n-checkbox>
      </n-form-item>

      <n-form-item
          label="Company"
          path="company"
      >
        <n-input
            v-model:value="formValue.company"
            placeholder=""
        />
      </n-form-item>

      <n-form-item
          label="Message"
          path="message"
      >
        <n-input
            v-model:value="formValue.message"
            type="textarea"
            placeholder=""
        />
      </n-form-item>

      <n-form-item class="mt-[-15px]">
        <div class="flex flex-col gap-1">
          <vue-turnstile
              v-if="turnstileSiteKey"
              v-model="formValue.token"
              :site-key="turnstileSiteKey"
              theme="dark"
              class="max-w-[100%] box-border overflow-hidden min-h-[65px]"
          />

          <span v-else>Error! Cant load cloudflare turnstile. No site key!</span>
          <span class="text-xs">Sometimes turnstile load with error. Please reload page and try again</span>
        </div>
      </n-form-item>

      <n-form-item :show-label="false">
        <n-button
            attr-type="submit"
            @click="onSubmitHandler"
            :disabled="!turnstileSiteKey"
        >
          Send message
        </n-button>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style>
  .form {
    font-family: "Liberation Mono", "Courier New", monospace;
  }
</style>
