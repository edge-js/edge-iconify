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

/**
 * Generate svg for an icon
 */
export function generateSvg(name: string, props?: IconifyIconCustomisations & Record<string, any>) {
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
    width,
    height,
  })

  if (size && size === 'none') {
    svg.attributes.width = false as any
    svg.attributes.height = false as any
  }

  return `<svg${stringifyAttributes({ ...svg.attributes, ...attributes })}>${svg.body}</svg>`
}
