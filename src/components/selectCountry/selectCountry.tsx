import './selectCountry.scss';
import React, { useState } from 'react';
import Select from 'react-select';

function SelectCountry() {
  const options = [
    { value: 'Austria', label: 'Austria', className: 'austria', pattern: '^\\d{4}$' },
    { value: 'Belarus', label: 'Belarus', className: 'belarus', pattern: '^\\d{6}$' },
    { value: 'Poland', label: 'Poland', className: 'poland', pattern: '^\\d{2}-\\d{3}$' },
    { value: 'Russia', label: 'Russia', className: 'russia', pattern: '^\\d{6}$' },
    { value: 'Serbia', label: 'Serbia', className: 'serbia', pattern: '^\\d{5}$' },
    { value: 'France', label: 'France', className: 'france', pattern: '^\\d{5}$' },
  ];
  const [currentCountry, setCurrentCountry] = useState('');
  const getValueCountry = () => {
    console.log(currentCountry ? options.find((country) => country.value === currentCountry) : '');
    return currentCountry ? options.find((country) => country.value === currentCountry) : '';
  };
  const onChange = (newValue: any) => {
    setCurrentCountry(newValue.value);
    localStorage.setItem('country', newValue.value);
    localStorage.setItem('pattern', newValue.pattern);
  };

  return (
    <Select
      options={options}
      onChange={onChange}
      value={getValueCountry()}
      isSearchable={true}
      placeholder="Select country"
      className={'select'}
      classNamePrefix={'custom-select'}
      components={{
        IndicatorSeparator: () => null,
      }}
      //   styles={{
      //     container: (base) => ({
      //         ...base,
      //         maxWidth: '456px',
      //         minWidth: '230px',
      //         width: '100%'
      //     }),
      // }}
    />
  );
}

export default SelectCountry;
