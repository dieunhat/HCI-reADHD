import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ReadingPage from '../../features/reading/index'
import {setPageTitle} from "../../features/common/headerSlice";

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Reading Page"}))
    }, [])


    return(
        <ReadingPage />
    )
}

export default InternalPage