import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { DoctorContext } from "../../context/DoctorContext";


const DoctorReports = () => {
   const {dToken, getReports, reports } = useContext(DoctorContext)
      const {DateFormat} = useContext(AppContext)
      const [selectedReport, setSelectedReport] = useState(null);
  
  
  
  
   const handleReportClick = (report) => {
        setSelectedReport(report);
    };
  
      const closePreview = () => {
          setSelectedReport(null);
      };
  
      useEffect(()=> {
        if(dToken){
         getReports()
        }
       }, [dToken])
  return (
     <div className="w-full max-w-full m-5">
           <p className="mb-3 text-lg font-medium">All Reports</p>
           <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
             <div className="hidden sm:grid grid-cols-[0.5fr_2fr_3fr_2fr_1fr] grid-flow-col py-3 px-6 border-b">
               <p>#</p>
               <p>User Name</p>
               <p>User Email</p>
               <p>Date & Time</p>
              
               <p>Action</p>
             </div>
             {reports.map((item,index)=>(
               <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_3fr_2fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
                 <p className="max-sm:hidden ">{index+1}</p>
                 <p className="max-sm:hidden ">{item.userName}</p>
                 <p>{item.userEmail}</p>
                 <p>{DateFormat(item.date)}</p>
                
                 <img className="w-7 cursor-pointer" src={assets.eye} onClick={() => handleReportClick(item)}/>
                 
                </div>
             ))}
           </div>
           {selectedReport && (
                  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center  p-5 z-50" onClick={closePreview}>
                      <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col max-h-[90vh] overflow-y-scroll  items-center sm:flex-row gap-5 max-w-4xl w-full">
                          <img className="w-full sm:w-1/2 h-full   object-contain" src={selectedReport.image} alt="Report" />
                          <div className="flex-1 flex flex-col gap-2 overflow-auto">
                              <p className="text-lg font-medium">Report Summary</p>
                              <p className="text-gray-600">{selectedReport.summary}</p>
                          </div>
                      </div>
                  </div>
              )}
         </div>
    )
}

export default DoctorReports