import axios from 'axios';
import { MessageCircle, Send } from 'lucide-react';
import { X } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';


const DoctorRecommander = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
    { text: "Hello! Please describe your symptoms, and I'll help you find the right specialist.", sender: "bot" }
    ]);
    const [symptoms, setSymptoms] = useState("")
    const [response, setResponse] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    

    const {backendUrl, doctors, token} = useContext(AppContext)

    


    const handleSend = async()=> {

      setMessages((prev) => [...prev, { text: symptoms, sender: "user" }]);
      setSymptoms("")
      setResponse({})
      setLoading(true)
       try {
          const {data} = await axios.post(backendUrl + "/api/user/doctor-recommander", {symptoms}, {headers:{ token }} )
          if(data.success){
            setMessages((prev) => [...prev, { text: data.recommendedSpeciality.message, sender: "bot" }]);
            setResponse(data.recommendedSpeciality)
            console.log(data.recommendedSpeciality)
            }
       } catch (error) {
        console.log(error);
        toast.error(error.message);
       } finally{
        setLoading(false)
       }
    }

    const filteredDoctors = response && doctors.filter((doc) => doc.speciality===response.speciality)
 
  return (
    <div className=''>
    { !isOpen && (
        <button className="fixed bottom-5 right-5 bg-primary text-white rounded-full  p-4" onClick={()=>setIsOpen(true)}>
        <MessageCircle />
        </button>
    )}
       { isOpen && (
          <div className='fixed bottom-5 right-5 max-sm:bottom-3 max-sm:right-3 max-sm:left-3 bg-white rounded-lg shadow-lg w-96 max-sm:w-auto'>
            <div className='flex justify-between items-center bg-primary text-white rounded-lg rounded-b-none p-4 '>
                <div className='flex flex-col'>
                    <p>Doctor AI Assistant</p>
                    <p>Find the right specialist</p>
                </div>
                <button onClick={()=> setIsOpen(false)}>
                <X />
                </button>
            </div>
            <div className='max-h-[350px] bg-white  rounded-lg  p-4  overflow-y-scroll '>
            {
              messages.map((item, index)=> (
                <div className={`flex  ${item.sender === "bot" ? "justify-start" : "justify-end"}`} key={index} >
                <p  className={`${item.sender === "bot" ? "bg-gray-100 text-gray-700" : " bg-primary text-white"} mt-4 p-3 rounded-lg`} style={{ maxWidth: "80%" }}>{item.text}</p>
                </div>
              ))
            }
            {
              loading ? (
                <LoadingSpinner textcolour="text-primary"/>
              ) : (
                 response.speciality !== null && (
              filteredDoctors.map((doc,index)=> (
              <div className='flex flex-col justify-center items-center m-4 p-4 border rounded' key={index}>
              <div className='w-full flex   justify-around  items-center '>
                <img src={doc.image} className='w-12 rounded-full border '/>
                <div>
                  <p className='font-medium '>{doc.name}</p>
                  <p className='text-sm text-primary'>{doc.speciality}</p>
                  <p className='text-xs text-gray-400'>{doc.experience} Experience</p>
                </div>
                <div className={`flex items-center gap-2 text-sm text-center ${doc.available ? "text-green-500" : "text-gray-500"}`}>
            <p className={`w-2 h-2   ${ doc.available ? "bg-green-500" : "bg-gray-500"} rounded-full` }></p><p >{doc.available ? "Available" : "Not Available"}</p>
            </div>
              </div>
              <button className="w-full  mt-2  py-1.5 rounded-full bg-primary text-white" onClick={()=> navigate(`/appointment/${doc._id}`)} >Book Appointment</button>
                
              </div>
            ) )
            ))
            }
           </div>
            <div className=' flex  flex-row gap-2 p-4 max-sm:px-2   border border-x-0'>
             <input value={symptoms} onChange={(e)=> setSymptoms(e.target.value)} type='text' placeholder='Symptoms' className='px-2 py-1 flex flex-1 border outline-gray-300'/>
             <button className='rounded-lg p-2  bg-primary text-white' onClick={handleSend} >
             <Send className="max-sm:w-4 max-sm:h-4" />
             </button>
            </div>
          </div>
        )}
    </div>
  )
}

export default DoctorRecommander