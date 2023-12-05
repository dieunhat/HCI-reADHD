import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Documents from '../../features/documents'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Documents"}))
      }, [])


    return(
        <div className='max-w-screen w-full'><Documents /></div>
        
    )
}

export default InternalPage