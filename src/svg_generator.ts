/*
 * edge-iconify
 *
 * (c) Harminder Virk
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as stringifyAttributes from 'stringify-attributes'
import { getIcon, buildIcon, type IconifyIconCustomisations } from '@iconify/iconify'
import type { EdgeIconifyOptions } from './contracts'

export class SvgGenerator {
  constructor(private options: EdgeIconifyOptions = {}) {
    this.options.scale = this.options.scale || 1
  }

  /**
   * Generate svg for the given icon name
   */
  generate(name: string, props?: IconifyIconCustomisations & Record<string, any>) {
    const icon = getIcon(name)
    if (!icon) {
      throw new Error(`Cannot locate icon "${name}". Make sure you have registered the icon bundle`)
    }

    const {
      rotate,
      hFlip,
      vFlip,
      width,
      height,
      hAlign,
      vAlign,
      inline,
      slice,
      size,
      ...attributes
    } = props || {}

    const svg = buildIcon(icon, {
      rotate,
      hFlip,
      vFlip,
      hAlign,
      vAlign,
      inline,
      slice,
      width: width || this.options.scale + 'em',
      height: height || this.options.scale + 'em',
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
    const defaultClass = (this.options.defaultClass || '').split(' ')

    const className = [...propsClass, ...defaultClass].filter(Boolean).join(' ')

    if (className) {
      attributes.class = className
    }

    return `<svg${stringifyAttributes({ ...svg.attributes, ...attributes })}>${svg.body}</svg>`
  }
}
