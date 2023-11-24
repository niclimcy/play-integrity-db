import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'

describe('SearchBar', () => {
  it('renders correctly', () => {
    const wrapper: VueWrapper = mount(SearchBar)
    expect(wrapper.html()).toContain('input-group')
  })

  it('binds input value with v-model', async () => {
    const wrapper: VueWrapper = mount(SearchBar)
    const input = wrapper.find('input[type="text"]')
    const htmlInput: HTMLInputElement = input.element as HTMLInputElement
    await input.setValue("McDonald's")
    expect(htmlInput.value).toBe("McDonald's")
  })

  it('emits the query event with the correct value', async () => {
    const wrapper: VueWrapper = mount(SearchBar)
    const input = wrapper.find('input[type="text"]')
    await input.setValue("McDonald's")
    await input.trigger('input')
    expect(wrapper.emitted()).toHaveProperty('query')
    expect(wrapper.emitted('query')![0]).toEqual(["McDonald's"])
  })
})
