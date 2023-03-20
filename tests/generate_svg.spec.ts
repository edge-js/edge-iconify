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
import { SvgGenerator } from '../src/svg_generator'

addIcon('mdi:home', { ...icons.icons.home, width: 24, height: 24 })

const svgGenerator = new SvgGenerator()

test.group('svgGenerator.generate', () => {
  test('generate svg for a given icon', ({ assert }) => {
    assert.equal(
      svgGenerator.generate('mdi:home'),
      `<svg width="1em" height="1em" viewBox="0 0 24 24">${icons.icons.home.body}</svg>`
    )
  })

  test('define hFlip customization', ({ assert }) => {
    assert.equal(
      svgGenerator.generate('mdi:home', { hFlip: true }),
      `<svg width="1em" height="1em" viewBox="0 0 24 24"><g transform="translate(24 0) scale(-1 1)">${icons.icons.home.body}</g></svg>`
    )
  })

  test('define vFlip customization', ({ assert }) => {
    assert.equal(
      svgGenerator.generate('mdi:home', { vFlip: true }),
      `<svg width="1em" height="1em" viewBox="0 0 24 24"><g transform="translate(0 24) scale(1 -1)">${icons.icons.home.body}</g></svg>`
    )
  })

  test('define both vFlip and hFlip customizations', ({ assert }) => {
    assert.equal(
      svgGenerator.generate('mdi:home', { vFlip: true, hFlip: true }),
      `<svg width="1em" height="1em" viewBox="0 0 24 24"><g transform="rotate(180 12 12)">${icons.icons.home.body}</g></svg>`
    )
  })

  test('define rotate customization', ({ assert }) => {
    assert.equal(
      svgGenerator.generate('mdi:home', { rotate: 1 }),
      `<svg width="1em" height="1em" viewBox="0 0 24 24"><g transform="rotate(90 12 12)">${icons.icons.home.body}</g></svg>`
    )
  })

  test('define custom width and height customizations', ({ assert }) => {
    assert.equal(
      svgGenerator.generate('mdi:home', { width: 40, height: 40 }),
      `<svg width="40" height="40" viewBox="0 0 24 24">${icons.icons.home.body}</svg>`
    )
  })

  test('define color customizations', ({ assert }) => {
    assert.equal(
      svgGenerator.generate('mdi:home', { color: 'red' }),
      `<svg width="1em" height="1em" viewBox="0 0 24 24" color="red">${icons.icons.home.body}</svg>`
    )
  })

  test('define custom props', ({ assert }) => {
    assert.equal(
      svgGenerator.generate('mdi:home', { class: 'w-4 h-4' }),
      `<svg width="1em" height="1em" viewBox="0 0 24 24" class="w-4 h-4">${icons.icons.home.body}</svg>`
    )
  })

  test('do not set width and height when size is set to none', ({ assert }) => {
    assert.equal(
      svgGenerator.generate('mdi:home', { size: 'none', class: 'w-4 h-4' }),
      `<svg viewBox="0 0 24 24" class="w-4 h-4">${icons.icons.home.body}</svg>`
    )
  })

  test('define base scale', ({ assert }) => {
    const generator = new SvgGenerator({ scale: 4 })

    assert.equal(
      generator.generate('mdi:home'),
      `<svg width="4em" height="4em" viewBox="0 0 24 24">${icons.icons.home.body}</svg>`
    )
  })

  test('overwrite base scale', ({ assert }) => {
    const generator = new SvgGenerator({ scale: 4 })

    assert.equal(
      generator.generate('mdi:home', { width: 40, height: 40 }),
      `<svg width="40" height="40" viewBox="0 0 24 24">${icons.icons.home.body}</svg>`
    )
  })

  test('define base classes', ({ assert }) => {
    const generator = new SvgGenerator({ defaultClass: 'text-red hover:text-blue' })

    assert.equal(
      generator.generate('mdi:home'),
      `<svg width="1em" height="1em" viewBox="0 0 24 24" class="text-red hover:text-blue">${icons.icons.home.body}</svg>`
    )
  })

  test('combine base and custom classes', ({ assert }) => {
    const generator = new SvgGenerator({ defaultClass: 'text-red hover:text-blue' })

    assert.equal(
      generator.generate('mdi:home', { class: 'w-4 h-4 text-yellow' }),
      `<svg width="1em" height="1em" viewBox="0 0 24 24" class="w-4 h-4 text-yellow text-red hover:text-blue">${icons.icons.home.body}</svg>`
    )
  })
})
