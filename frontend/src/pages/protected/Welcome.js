import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import {Link} from 'react-router-dom'
import TemplatePointers from '../../features/user/components/TemplatePointers'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : ""}))
      }, [])

    return(
      <div className="hero h-full my-auto bg-base-200">
      <div className="hero-content">
        <div className="max-w-md">
            {/*<TemplatePointers />*/}
            <h1 className="mb-5 text-5xl font-bold">
                ADHD Help Kit
            </h1>
            <p className="mb-5">
                A collection of tools to help you manage your ADHD.
            </p>
            <Link to="/app/reading"><button className="btn bg-base-100 btn-outline">Read</button></Link>
        </div>
      </div>
    </div>
    )
}

export default InternalPage