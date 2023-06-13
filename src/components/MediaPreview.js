import { CloseRounded } from '@mui/icons-material'
import React from 'react'

function MediaPreview({src,closePreview}) {

    if (!src) { return null}
  return (
    <div className='mediaPreview'>
        <CloseRounded onClick={closePreview} />
        <img src={src} alt='preview' />
    </div>
  )
}

export default MediaPreview