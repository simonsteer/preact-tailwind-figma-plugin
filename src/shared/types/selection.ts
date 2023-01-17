import { getSelection } from '~/controller/utils'

export type SelectionData = {
  data: ReturnType<typeof getSelection>
  id: string
}
