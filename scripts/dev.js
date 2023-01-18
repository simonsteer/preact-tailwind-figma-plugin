import watchman from 'fb-watchman'
import path from 'path'
import { exec } from 'child_process'

const client = new watchman.Client()

client.capabilityCheck({ required: ['relative_root'] }, (error, res) => {
  if (error) {
    console.error('failed to start the development server: ', error)
    client.end()
    return
  }

  client.command(
    // TODO: why is watchman subscribing to changes in the project root instead of src?
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
          buildProject()
          return
        }

        // TODO: why is watchman subscribing to changes in the project root instead of src?
        const files = res.files.filter(f => f.startsWith('src'))
        if (files.length > 0) {
          console.log(
            'Rebuilding project due to changed files: ' + files.join(', ')
          )
          buildProject()
        }
      })
    }
  )
})

const buildProject = () =>
  exec('node scripts/build.js', (err, stdout) => {
    if (err) console.error(err)
    else console.log(stdout)
  })
