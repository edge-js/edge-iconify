/*
 * edge-iconify
 *
 * (c) Harminder Virk
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { icons } from '@iconify-json/mdi'
import { addIcon } from '@iconify/iconify'
import { generateSvg } from '../src/generate_svg'

addIcon('mdi:home', { ...icons.icons.home, width: 24, height: 24 })

test.group('generateSvg', () => {
  test('generate svg for a given icon', ({ assert }) => {
    assert.equal(
      generateSvg('mdi:home'),
      `<svg width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">${icons.icons.home.body}</svg>`
    )
  })

  test('define hFlip customization', ({ assert }) => {
    assert.equal(
      generateSvg('mdi:home', { hFlip: true }),
      `<svg width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g transform="translate(24 0) scale(-1 1)">${icons.icons.home.body}</g></svg>`
    )
  })

  test('define vFlip customization', ({ assert }) => {
    assert.equal(
      generateSvg('mdi:home', { vFlip: true }),
      `<svg width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g transform="translate(0 24) scale(1 -1)">${icons.icons.home.body}</g></svg>`
    )
  })

  test('define both vFlip and hFlip customizations', ({ assert }) => {
    assert.equal(
      generateSvg('mdi:home', { vFlip: true, hFlip: true }),
      `<svg width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g transform="rotate(180 12 12)">${icons.icons.home.body}</g></svg>`
    )
  })

  test('define rotate customization', ({ assert }) => {
    assert.equal(
      generateSvg('mdi:home', { rotate: 1 }),
      `<svg width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g transform="rotate(90 12 12)">${icons.icons.home.body}</g></svg>`
    )
  })

  test('define custom width and height customizations', ({ assert }) => {
    assert.equal(
      generateSvg('mdi:home', { width: 40, height: 40 }),
      `<svg width="40" height="40" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">${icons.icons.home.body}</svg>`
    )
  })

  test('define color customizations', ({ assert }) => {
    assert.equal(
      generateSvg('mdi:home', { color: 'red' }),
      `<svg width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" color="red">${icons.icons.home.body}</svg>`
    )
  })

  test('define custom props', ({ assert }) => {
    assert.equal(
      generateSvg('mdi:home', { class: 'w-4 h-4' }),
      `<svg width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="w-4 h-4">${icons.icons.home.body}</svg>`
    )
  })
})
