import { useCallback, useContext, useState } from 'react';
import MyInput from '../../../../../components/input/input';
import { SelectFlavourProps } from '../../../../../interfaces/interfaces';
import { ProductsPageContext } from '../../../context';
import {
  filterCocoaFlavour,
  filterCoffeeFlavour,
  filterTeaFlavour,
} from '../../../../../constants/filtersRadio';
import { useLocation } from 'react-router-dom';
function SelectFlavour({ selectedFlavour, onFlavourChange }: SelectFlavourProps) {
  const { setResetFilters, handleFetch, setSelectedFlavour, setCurrentPage } =
    useContext(ProductsPageContext);
  const [checkedFlavour, setCheckedFlavour] = useState(selectedFlavour);
  const handleFlavourChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setResetFilters(false);
      onFlavourChange(event.target.value);
      setSelectedFlavour(event.target.value);
      setCurrentPage(1);
      handleFetch(1);
      const newFlavour = event.target.value;
      setCheckedFlavour(newFlavour);
      onFlavourChange(newFlavour);
    },
    [setResetFilters, onFlavourChange, setSelectedFlavour, setCurrentPage, handleFetch],
  );
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  let arrSelectedProduct: string[] = [];
  if (pathParts[2] === 'tea') arrSelectedProduct = filterTeaFlavour;
  if (pathParts[2] === 'coffee') arrSelectedProduct = filterCoffeeFlavour;
  if (pathParts[2] === 'cocoa') arrSelectedProduct = filterCocoaFlavour;

  return (
    <ul className="filters-list">
      <li>Select Flavour</li>
      {arrSelectedProduct.map((element, index) => (
        <li key={index} className="filters-list__item">
          <label
            htmlFor={element}
            className={`toggler-wrapper style-1 ${checkedFlavour === element ? 'radio-button--checked' : ''}`}
          >
            {element}
            <MyInput
              type="radio"
              name="flavour"
              id={element}
              value={element}
              onChange={handleFlavourChange}
            />
            <div className="toggler-slider">
              <div className="toggler-knob"></div>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
  // className={checkedFlavour === 'Citrus' ? 'radio-button--checked' : ''}
}
export { SelectFlavour };
