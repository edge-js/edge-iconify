/*
 * edge-iconify
 *
 * (c) Edge
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { edgeGlobals } from 'edge.js'
import { getIcon, buildIcon, type IconifyIconCustomisations } from '@iconify/iconify'

import type { EdgeIconifyOptions } from './types.js'

/**
 * Svg Generators exposes the API to generate an SVG tag using the
 * iconify API
 */
export class SvgGenerator {
  #options: EdgeIconifyOptions

  constructor(options: EdgeIconifyOptions = {}) {
    this.#options = { scale: 1, ...options }
  }

  /**
   * Generate svg for the given icon name
   */
  generate(name: string, props?: IconifyIconCustomisations & Record<string, any>) {
    const icon = getIcon(name)
    if (!icon) {
      throw new Error(`Cannot locate icon "${name}". Make sure you have registered the icon bundle`)
    }

    const { rotate, hFlip, vFlip, width, height, size, ...attributes } = props || {}

    const svg = buildIcon(icon, {
      rotate: rotate === undefined && hFlip ? 0 : rotate,
      hFlip,
      vFlip,
      width: width || this.#options.scale + 'em',
      height: height || this.#options.scale + 'em',
    })

    if (size && size === 'none') {
      svg.attributes.width = false as any
      svg.attributes.height = false as any
    }

    /**
     * Generate the svg class attributes by merging the default class
     * and the props class
     */
    const propsClass: string[] = (attributes.class || '').split(' ')
    const defaultClass = (this.#options.defaultClass || '').split(' ')

    const className = [...propsClass, ...defaultClass].filter(Boolean).join(' ')

    if (className) {
      attributes.class = className
    }

    return `<svg ${edgeGlobals.html.attrs({ ...svg.attributes, ...attributes }).value}>${
      svg.body
    }</svg>`
  }
}
