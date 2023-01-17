import path from 'path'
import fs from 'fs'
import esbuild from 'esbuild'
import htmlPlugin from '@chialab/esbuild-plugin-html'
import postCssPlugin from 'esbuild-style-plugin'
import inlineImage from 'esbuild-plugin-inline-image'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { performance } from 'perf_hooks'

let then = performance.now()

esbuild
  .build({
    entryPoints: ['src/ui/index.html', 'src/controller/index.ts'],
    outdir: 'dist',
    bundle: true,
    sourcemap: 'inline',
    chunkNames: '[ext]/[name]',
    plugins: [
      htmlPlugin(),
      postCssPlugin({
        postcss: {
          plugins: [tailwindcss, autoprefixer],
        },
      }),
      inlineImage(),
    ],
  })
  .then(() => {
    const dist = path.join(process.cwd(), 'dist')

    // get css & js file contents
    const css = fs
      .readFileSync(path.resolve(dist, 'css', 'index.css'))
      .toString()
    const js = fs.readFileSync(path.resolve(dist, 'js', 'index.js')).toString()

    // get lines of code from html file
    const html = fs
      .readFileSync(path.resolve(dist, 'index.html'))
      .toString()
      .split('\n')

    // remove loadStyle script, replace with <style> tag
    const loadStyleScriptStart = html.indexOf(
      '    <script type="application/javascript">'
    )
    html.splice(loadStyleScriptStart, 11, `<style>\n${css}\n</style>`)

    // remove js script src, replace with inline js
    const jsScriptStart = html.indexOf(
      '    <script src="js/index.js" type="application/javascript"></script>'
    )
    html.splice(jsScriptStart, 1, `<script type="application/javascript">\n${js}\n</script>`)

    // replace html file with updated content
    fs.writeFileSync(path.resolve(dist, 'index.html'), html.join('\n'))

    // delete other items in dist folder
    // fs.rmSync(path.resolve(dist, 'css'), { recursive: true, force: true })
    fs.rmSync(path.resolve(dist, 'js'), { recursive: true, force: true })
    fs.rmSync(path.resolve(dist, 'ui'), { recursive: true, force: true })

    const elapsed = performance.now() - then
    console.log(`Project built in ${elapsed}ms`)
  })
  .catch(e =>
    console.error('Something went wrong when building the project: ', e)
  )
