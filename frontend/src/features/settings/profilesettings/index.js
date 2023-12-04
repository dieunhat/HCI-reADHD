import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'

const token = localStorage.getItem("token");

function ProfileSettings(){
    const username = JSON.parse(token)['username'];
    const [fullname, setFullname] = useState(token["fullname"]);
    const [email, setEmail] = useState(token["email"]);

    console.log(username)

    const dispatch = useDispatch()

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({message : "Profile Updated", status : 1}))    
    }

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
    }

    return(
        <>
            <TitleCard title="Profile Settings" topMargin="mt-2">
                <div className="min-w-[36rem] mx-auto px-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Username" defaultValue={username} disable={true}/>
                    <InputText labelTitle="Fullname" defaultValue={fullname} disable={false} updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Email" defaultValue={email} disable={false} updateFormValue={updateFormValue}/>
                    {/* <TextAreaInput labelTitle="About" defaultValue="Doing what I love, part time traveller" updateFormValue={updateFormValue}/> */}
                </div>
                {/* <div className="divider" ></div> */}

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue}/>
                    <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/>
                </div> */}

                <div className="mt-16">
                    <button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button>
                </div>
                </div>
            </TitleCard>
        </>
    )
}


export default ProfileSettings