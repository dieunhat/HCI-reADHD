import routes from '../routes/sidebar'
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import MenuIcon  from '@heroicons/react/24/outline/Bars4Icon'
import { useDispatch } from 'react-redux';

function LeftSidebar(){
    const location = useLocation();

    const dispatch = useDispatch()

    return(
        <>
            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-80 text-base-content">
            {/*<button className="btn btn-ghost bg-none  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute" onClick={() => close()}>*/}
            {/*    <MenuIcon className="h-5 inline-block w-5"/>*/}
            {/*</button>*/}

                <li className="mb-2 font-semibold text-xl">
                    <Link to={'/app/welcome'}>
                        <img className="mask mask-squircle w-10" src="/logo192.png" alt="DashWind Logo"/>
                        ADHD Help Kit
                    </Link>
                </li>
                {
                    routes.map((route, k) => {
                        return(
                            <li className="" key={k}>
                                {
                                    route.submenu ? 
                                        <SidebarSubmenu {...route}/> : 
                                    (<NavLink
                                        end
                                        to={route.path}
                                        className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                           {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                aria-hidden="true"></span>) : null
                                            }
                                    </NavLink>)
                                }
                                
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

export default LeftSidebar