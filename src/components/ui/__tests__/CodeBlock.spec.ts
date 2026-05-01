import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CodeBlock from '../CodeBlock.vue'

describe('CodeBlock', () => {
  it('renders code and filename, and shows copy button stub', () => {
    const code = "console.log('hello')"
    const filename = 'example.js'

    const wrapper = mount(CodeBlock as any, {
      props: { code, filename },
      global: {
        stubs: {
          CopyButton: {
            template: '<button data-testid="copy">copy</button>'
          }
        }
      }
    })

    const codeEl = wrapper.find('code')
    expect(codeEl.exists()).toBe(true)
    expect(codeEl.text()).toBe(code)

    const fileEl = wrapper.find('.code-filename')
    expect(fileEl.exists()).toBe(true)
    expect(fileEl.text().trim()).toBe(filename)

    const copyBtn = wrapper.find('[data-testid="copy"]')
    expect(copyBtn.exists()).toBe(true)
  })
})
