import { useEffect, useId, useState } from 'react'
import { SelectionData } from '~/shared/types'
import { messageFromUI } from '../utils'
import { useMessages } from './useMessages'

export function useSelection() {
  const id = useId()
  const [selection, setSelection] = useState<SelectionData['data']>([])

  const messages = useMessages()
  useEffect(() => {
    const off = messages.on('controller/selection', selection => {
      if (selection.id === id) setSelection(selection.data)
    })

    messageFromUI({ type: 'ui/selection', payload: { active: true, id } })
    return () => {
      off()
      messageFromUI({ type: 'ui/selection', payload: { active: false, id } })
    }
  }, [])

  return selection
}
