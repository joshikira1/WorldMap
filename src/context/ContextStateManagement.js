import { useContext, useState ,React} from "react";
import CreateContext from './CreateContext'
import axios from 'axios';

export default function ContextStateManagement(props) {
    const SECREAT_API_KEY=process.env.REACT_APP_EXPAPI_URL
    const [countryData, setCountryData] = useState([])
    const getCountryData=async()=>{
      try {
        debugger
        const response = await axios.get(SECREAT_API_KEY);
        const countries = response.data;
        return countries
      } catch (error) {
        console.log(error)
      }

    }
    return (
    <CreateContext.Provider     value={{
        countryData,
         setCountryData,
         getCountryData
    
      }}>{props.children}</CreateContext.Provider>
  )
}
