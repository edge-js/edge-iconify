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

import { SvgGenerator } from './src/svg_generator'
import { EdgeIconifyOptions } from './src/types'

/**
 * Edge plugin to work with Iconify icon sets
 */
export function edgeIconify(
  edge: EdgeContract,
  _firstRun: boolean,
  options: EdgeIconifyOptions = {}
) {
  const svgGenerator = new SvgGenerator(options)

  /**
   * Register the `svg` global helper
   */
  edge.global(
    'svg',
    function (name: string, props?: IconifyIconCustomisations & Record<string, any>) {
      return edge.GLOBALS.safe(svgGenerator.generate(name, props))
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

      /**
       * For non sequence expression we have to wrap the args inside parenthesis
       */
      const openingBrace = parsed.type !== 'SequenceExpression' ? '(' : ''
      const closingBrace = parsed.type !== 'SequenceExpression' ? ')' : ''

      buffer.outputExpression(
        `state.svg${openingBrace}${parser.utils.stringify(parsed)}${closingBrace}.value`,
        token.filename,
        token.loc.start.line,
        false
      )
    },
  })
}

export { addCollection, addIcon } from '@iconify/iconify'
