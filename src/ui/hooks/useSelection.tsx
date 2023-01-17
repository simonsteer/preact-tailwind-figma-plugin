import { useEffect, useState } from 'react'
import { SelectionData } from '~/shared/types'
import { messageFromUI } from '../utils'
import { useMessages } from './useMessages'

export function useSelection() {
  const [selection, setSelection] = useState<SelectionData>([])

  const messages = useMessages()
  useEffect(() => {
    const off = messages.on('controller/selection', setSelection)

    messageFromUI({ type: 'ui/selection', payload: true })
    return () => {
      off()
      messageFromUI({ type: 'ui/selection', payload: false })
    }
  }, [])

  return selection
}
