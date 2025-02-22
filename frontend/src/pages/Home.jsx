import Banner from "../components/Banner"
import Header from "../components/Header"
import SpecialityMenu from "../components/SpecialityMenu"
import TopDoctors from "../components/TopDoctors"
import DoctorRecommander from "./DoctorRecommander"


const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
      <DoctorRecommander/>
    </div>
  )
}

export default Home