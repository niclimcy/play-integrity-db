import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, VueWrapper, flushPromises } from '@vue/test-utils'
import AppCard from '../AppCard.vue'

// Mock data conforming to AppDetails type
const mockAppDetails = {
  packageId: 'com.mcdonalds.app',
  name: "McDonald's",
  iconURL:
    'https://play-lh.googleusercontent.com/hSRuCp9qVkxNYLYibPYyra4bQLYDyHg40TA1Cu6i9Z3HsWEgS1q076VfjacAdQquHw',
  deviceIntegrity: true,
  strongIntegrity: false,
  rootCheck: true,
  bootloaderCheck: true
}

// Mock the global fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockAppDetails)
  })
) as unknown as typeof fetch

afterEach(() => {
  vi.restoreAllMocks();
})

describe('AppCard', () => {
  it('renders properly with props and fetched data', async () => {
    const wrapper = mount(AppCard, { props: { appId: 'com.mcdonalds.app' } }) as VueWrapper<any>
    await flushPromises()

    expect(wrapper.text()).toContain("McDonald's")
    expect(wrapper.text()).toContain('com.mcdonalds.app')
    expect(wrapper.find('img').attributes('src')).toBe(mockAppDetails.iconURL)
  })

  it('updates state correctly based on API response', async () => {
    const wrapper = mount(AppCard, { props: { appId: 'com.mcdonalds.app' } }) as VueWrapper<any>
    await flushPromises()

    expect(fetch).toHaveBeenCalledWith('/data/com.mcdonalds.app')
    expect(wrapper.vm.appDetails).toEqual(mockAppDetails)
  })

  it('conditionally renders list items based on app details', async () => {
    const wrapper = mount(AppCard, {
      props: { appId: 'com.mcdonalds.app' },
      data() {
        return {
          appDetails: mockAppDetails
        }
      }
    }) as VueWrapper<any>
    await flushPromises()

    expect(wrapper.find('.bg-primary-subtle').exists()).toBe(true)
    expect(wrapper.find('.bg-warning-subtle').exists()).toBe(true)
    expect(wrapper.find('.bg-danger-subtle').exists()).toBe(true)
    expect(wrapper.find('.bg-success-subtle').exists()).toBe(false)
  })
})
