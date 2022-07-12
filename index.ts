/*
 * edge-iconify
 *
 * (c) Harminder Virk
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { EdgeContract } from 'edge.js'
import type { IconifyIconCustomisations } from '@iconify/iconify'

import { generateSvg } from './src/generate_svg'

/**
 * Edge plugin to work with Iconify icon sets
 */
export function edgeIconify(edge: EdgeContract) {
  edge.global(
    'svg',
    function (name: string, props?: IconifyIconCustomisations & Record<string, any>) {
      return edge.GLOBALS.safe(generateSvg(name, props))
    }
  )
}

export { addCollection, addIcon } from '@iconify/iconify'
