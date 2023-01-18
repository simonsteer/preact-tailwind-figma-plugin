import { useEffect, useId, useState } from 'react'
import { SelectionData } from '~/types'
import { uiMessage } from '~/ui/lib'
import { useMessages } from '~/ui/lib'

export function useSelection() {
  const id = useId()
  const [selection, setSelection] = useState<SelectionData['data']>([])

  const messages = useMessages()
  useEffect(() => {
    const off = messages.on('controller/selection', selection => {
      if (selection.id === id) setSelection(selection.data)
    })

    uiMessage({ type: 'ui/selection', payload: { active: true, id } })
    return () => {
      off()
      uiMessage({ type: 'ui/selection', payload: { active: false, id } })
    }
  }, [])

  return selection
}
