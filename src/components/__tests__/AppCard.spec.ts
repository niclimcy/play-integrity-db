import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { mount, VueWrapper, flushPromises } from '@vue/test-utils'
import AppCard from '../AppCard.vue'

// Mock data
const mockAppDetails = {
  packageId: 'com.mcdonalds.app',
  name: "McDonald's",
  iconURL:
    'https://play-lh.googleusercontent.com/hSRuCp9qVkxNYLYibPYyra4bQLYDyHg40TA1Cu6i9Z3HsWEgS1q076VfjacAdQquHw',
  deviceIntegrity: true,
  strongIntegrity: true,
  rootCheck: true,
  bootloaderCheck: true
}

let wrapper: VueWrapper<any>

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockAppDetails)
    })
  ) as unknown as typeof fetch

  wrapper = mount(AppCard, {
    props: { appId: 'com.mcdonalds.app' }
  }) as VueWrapper<any>
})

afterEach(() => {
  vi.restoreAllMocks()
  wrapper.unmount()
})

describe('AppCard', () => {
  it('renders properly with props and fetched data', async () => {
    await flushPromises()
    expect(wrapper.text()).toContain("McDonald's")
    expect(wrapper.text()).toContain('com.mcdonalds.app')
    expect(wrapper.find('img').attributes('src')).toBe(mockAppDetails.iconURL)
  })

  it('conditionally renders list items based on app details', async () => {
    await flushPromises()
    expect(wrapper.text()).toContain('Root Check')
    expect(wrapper.text()).toContain('Device integrity')
    expect(wrapper.text()).toContain('Strong integrity')
    expect(wrapper.text()).toContain('Bootloader Check')
  })

  it('renders "No checks" when all checks are false', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () =>
        Promise.resolve({
          ...mockAppDetails,
          deviceIntegrity: false,
          strongIntegrity: false,
          rootCheck: false,
          bootloaderCheck: false
        })
    } as Response)

    wrapper = mount(AppCard, {
      props: { appId: 'com.mcdonalds.app' }
    }) as VueWrapper<any>
    await flushPromises()

    expect(wrapper.text()).toContain('No checks')
  })
})
