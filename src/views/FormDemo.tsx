import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useForm, useField } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.preprocess((v) => (typeof v === 'string' ? parseInt(v) : v), z.number().min(18, 'Must be 18+')),
})

export default defineComponent({
  name: 'FormDemo',
  setup() {
    const { t } = useI18n()
    const submitMessage = ref('')
    const { handleSubmit, errors, isSubmitting } = useForm({
      validationSchema: toTypedSchema(schema)
    })

    const { value: name } = useField<string>('name')
    const { value: age } = useField<number>('age')

    const onSubmit = handleSubmit(async (values) => {
      await new Promise(r => setTimeout(r, 400))
      submitMessage.value = `Submitted: ${JSON.stringify(values)}`
    })

    return () => (
      <section class="max-w-md mx-auto space-y-4">
        <h1 class="text-2xl font-bold">{t('form.title')}</h1>
        <form class="space-y-3" onSubmit={onSubmit}>
          <div>
            <label class="block mb-1">{t('form.name')}</label>
            <input
              class="w-full rounded-lg border px-3 py-2 bg-bg text-fg"
              value={name.value}
              onInput={(e: Event) => (name.value = (e.target as HTMLInputElement).value)}
            />
            {errors.value.name && <div class="text-sm text-red-600 mt-1">{errors.value.name}</div>}
          </div>
          <div>
            <label class="block mb-1">{t('form.age')}</label>
            <input
              type="number"
              class="w-full rounded-lg border px-3 py-2 bg-bg text-fg"
              value={age.value ?? ''}
              onInput={(e: Event) => (age.value = (e.target as HTMLInputElement).value as any)}
            />
            {errors.value.age && <div class="text-sm text-red-600 mt-1">{errors.value.age}</div>}
          </div>
          <button class="px-4 py-2 rounded-lg border" disabled={isSubmitting.value} type="submit">{t('actions.submit')}</button>
        </form>
        {submitMessage.value && <div class="rounded-lg border p-3">{submitMessage.value}</div>}
      </section>
    )
  }
})
