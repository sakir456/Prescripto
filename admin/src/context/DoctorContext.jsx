import { createContext, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify"

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken"):"")
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData,setProfileData] = useState(false)
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(false)


    const getAppointments = async()=> {
        setLoading(true)
        try {
            
         const {data} = await axios.get(backendUrl + "/api/doctor/appointments", {headers:{dToken}})
         if(data.success){
            setAppointments(data.appointments)
            console.log(data.appointments);
            
         } else {
            toast.error(data.message)
         }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    const completeAppointment = async(appointmentId)=> {
         
        setLoading(true)
        try {
          
            const {data} = await axios.post(backendUrl + "/api/doctor/complete-appointment", {appointmentId}, {headers:{dToken}})
            
            if(data.success){
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message) 
        }finally{
            setLoading(false)
        }
    }

    const cancelAppointment = async(appointmentId)=> {
         
        setLoading(true)
        try {
          
            const {data} = await axios.post(backendUrl + "/api/doctor/cancel-appointment", {appointmentId}, {headers:{dToken}})
            
            if(data.success){
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message) 
        }finally{
            setLoading(false)
        }
    }

    const getDashData = async() => {
        setLoading(true)
        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/dashboard", {headers:{dToken}}) 
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message) 
        }finally{
            setLoading(false)
        }
    }

    const getProfileData = async()=> {
        setLoading(true)
        try {
            
            const {data} = await axios.get(backendUrl + "/api/doctor/profile", {headers:{dToken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData);
                }
       } catch (error) {
            console.log(error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    const getReports = async()=> {
        
        setLoading(true)
     try {
           const {data} = await axios.get(backendUrl + "/api/doctor/reports", {headers:{dToken}})
           if(data.success){
           setReports(data.reports)
           console.log(data.reports)
           }else {
            toast.error(data.message)
        }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }


   
    const value = {
        dToken,setDToken,
        backendUrl,appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment, 
        dashData,setDashData,
        getDashData,
        profileData,setProfileData,
        getProfileData,
        reports, setReports,
        getReports,
        loading, setLoading
          
    }

  

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider