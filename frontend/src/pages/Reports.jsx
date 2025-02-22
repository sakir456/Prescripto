import axios from "axios";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom"


const Reports = () => {

  const {token, backendUrl} = useContext(AppContext)

  const [image, setImage] = useState(null);
  const [summary, setSummary] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const generateSummary = async () => {

    if(!token){
      toast.warn("Login to book appointment")
      return navigate("/login")
    }
   setIsGenerating(true)
    try {
      const formData = new FormData();
      image && formData.append("image", image);
      const { data } = await axios.post(backendUrl + "/api/user/generate-summary", formData, { headers: { token } });
      if (data.success) {
      setSummary(data.summary)
      setIsGenerating(false)
      setIsSubmit(true)
      toast.success(data.message) 
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
       toast.error(error.message)
    }
    };

    const submitReport = async() => {

       setIsSubmit(false)
       setIsSubmitting(true)

       try {

        const formData = new FormData();
        formData.append("summary", summary)
        image && formData.append("image", image);

        const { data } = await axios.post(backendUrl + "/api/user/submit-report", formData,  { headers: { token } })
        if(data.success){
          toast.success(data.message)
          setSummary("")
          setImage(null)
          setIsSubmitting(false)
        } else{
          toast.error(data.message)
        }
       } catch (error) {
        console.log(error)
       toast.error(error.message)
       }
    }


  





  return (
    <div className="mx-auto p-6 pt-0    ">
      <h2 className="text-2xl font-semibold mb-4">Medical Reports Analysis</h2>

      {/* Upload Section */}
      <div className="p-4 bg-white rounded-md border">
        <label className="block text-gray-700 font-medium mb-2">Upload Report Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:bg-gray-50 file:hover:bg-gray-100 cursor-pointer"
        />
      </div>

      {/* Preview Section */}
      {image && (
        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2">Preview</h3>
          <img src={URL.createObjectURL(image)} alt="Uploaded Report" className="w-full rounded-md border" />
        </div>
      )}

      {/* Extracted Text Section */}
      {image && (
        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2">Summary</h3>
          <textarea
           className="w-full h-40 p-3 border  rounded-md overflow-scroll "
          placeholder="Summary" 
          value={summary}
          onChange={(e)=> setSummary(e.target.value)}
            />
        </div>
        
      )}

      {image && (
        <div className="mt-6 w-full">
        {
          isGenerating ? (
            <button className=" bg-primary text-white  font-light  py-3 px-4 rounded-full"  >  <LoadingSpinner text="Generating..." textcolour="text-white"/> </button>   
          ) :
           isSubmit ? (
            <button className=" bg-primary text-white  font-light  py-3 px-4 rounded-full" onClick={submitReport}>Submit</button>
          ) : 
          isSubmitting ? (
            <button className=" bg-primary text-white  font-light  py-3 px-4 rounded-full"  >  <LoadingSpinner text="Submitting..." textcolour="text-white"/> </button>
          ) : (
            <button className=" bg-primary text-white  font-light  py-3 px-4 rounded-full" onClick={ generateSummary} > Generate </button>
          )
        }
          
        </div>
        
      )}
    </div>
  );
};
  
export default Reports