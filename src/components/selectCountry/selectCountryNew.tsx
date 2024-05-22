import React, { useState } from 'react';
import { countries } from '../../constants/constantsRegistrationPage';
import './selectCountry.scss'


function CustomSelect() {
        // const [selectedOption, setSelectedOption] = useState('');
        // const handleChange = (event) => {
        //   const value = event.target.value;
        //   setSelectedOption(value);
        //   onChange(value);
        // };
      
        return (
        
               <select className= "select-element">
                  <option value="" className='option-element'>Select a country:</option>
                  {countries.map((country) => (
                     <option key={country.value} value={country.value} className='option-element'>
                        {country.label}
                     </option>
                  ))}
               </select>
         
        //   <div>
        //     <select value={selectedOption} onChange={handleChange}>
        //       <option value="" disabled>Select an option</option>
        //       {countries.map((option) => (
        //         <option key={countries.value} value={option.value}>
        //           {option.label}
        //         </option>
        //       ))}
        //     </select>
        //   </div>
        );
    };

    export default CustomSelect;
             
