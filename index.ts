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

  /**
   * Register the svg tag
   */
  edge.registerTag({
    block: false,
    seekable: true,
    tagName: 'svg',
    compile(parser, buffer, token) {
      const parsed = parser.utils.transformAst(
        parser.utils.generateAST(token.properties.jsArg, token.loc, token.filename),
        token.filename,
        parser
      )

      buffer.outputExpression(
        `state.svg${parser.utils.stringify(parsed)}.value`,
        token.filename,
        token.loc.start.line,
        false
      )
    },
  })
}

export { addCollection, addIcon } from '@iconify/iconify'
