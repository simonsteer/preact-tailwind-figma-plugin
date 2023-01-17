import watchman from 'fb-watchman'
import path from 'path'
import { exec } from 'child_process'

const client = new watchman.Client()

client.command(
  ['watch-project', path.resolve(process.cwd(), 'src')],
  function (error, res) {
    if (error) {
      console.error('failed to start the development server: ', error)
      return
    }

    if ('warning' in res) {
      console.log('warning: ', res.warning)
    }

    client.command(
      [
        'subscribe',
        res.watch,
        'development-server',
        {
          expression: [
            'anyof',
            ['match', '*.tsx'],
            ['match', '*.ts'],
            ['match', '*.html'],
            ['match', '*.css'],
          ],
          fields: ['name'],
        },
      ],
      error => {
        if (error) {
          console.error('Failed to start the development server: ', error)
          return
        }
        console.log('Development server started')
      }
    )

    let initial = true

    client.on('subscription', async function (res) {
      if (res.subscription !== 'development-server') return

      if (initial) {
        initial = false
        console.log('Building project...')
      } else {
        console.log(
          'Rebuilding project due to changed files: ' + res.files.join(', ')
        )
      }

      exec('node scripts/build.js', (err, stdout) => {
        if (err) console.error(err)
        else console.log(stdout)
      })
    })
  }
)
