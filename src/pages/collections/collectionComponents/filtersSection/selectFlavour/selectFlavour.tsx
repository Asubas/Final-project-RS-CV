import MyInput from '../../../../../components/input/input';
import { SelectFlavourProps } from '../../../../../interfaces/interfaces';

function SelectFlavour({ selectedFlavour, onFlavourChange }: SelectFlavourProps) {
  const handleFlavourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFlavourChange(event.target.value);
  };
  return (
    <ul className="filters-list">
      <li>Select flavour</li>
      <li className="filters-list__item">
        <label htmlFor="Citrus">
          Citrus
          <MyInput
            type="radio"
            name="flavour"
            id="Citrus"
            value="Citrus"
            checked={selectedFlavour === 'Citrus'}
            onChange={handleFlavourChange}
          />
        </label>
      </li>
      <li className="filters-list__item">
        <label htmlFor="Creamy">
          Creamy
          <MyInput
            type="radio"
            name="flavour"
            id="Creamy"
            value="Creamy"
            checked={selectedFlavour === 'Creamy'}
            onChange={handleFlavourChange}
          />
        </label>
      </li>
      <li className="filters-list__item">
        <label htmlFor="Floral">
          Floral
          <MyInput
            type="radio"
            name="flavour"
            id="Floral"
            value="Floral"
            checked={selectedFlavour === 'Floral'}
            onChange={handleFlavourChange}
          />
        </label>
      </li>
      <li className="filters-list__item">
        <label htmlFor="Fruity">
          Fruity
          <MyInput
            type="radio"
            name="flavour"
            id="Fruity"
            value="Fruity"
            checked={selectedFlavour === 'Fruity'}
            onChange={handleFlavourChange}
          />
        </label>
      </li>
      <li className="filters-list__item">
        <label htmlFor="Graccy">
          Graccy
          <MyInput
            type="radio"
            name="flavour"
            id="Graccy"
            value="Graccy"
            checked={selectedFlavour === 'Graccy'}
            onChange={handleFlavourChange}
          />
        </label>
      </li>

      <li className="filters-list__item">
        <label htmlFor="Smooth">
          Smooth
          <MyInput
            type="radio"
            name="flavour"
            id="Smooth"
            value="Smooth"
            checked={selectedFlavour === 'Smooth'}
            onChange={handleFlavourChange}
          />
        </label>
      </li>

      <li className="filters-list__item">
        <label htmlFor="Spicy">
          Spicy
          <MyInput
            type="radio"
            name="flavour"
            id="Spicy"
            value="Spicy"
            checked={selectedFlavour === 'Spicy'}
            onChange={handleFlavourChange}
          />
        </label>
      </li>

      <li className="filters-list__item">
        <label htmlFor="Sweet">
          Sweet
          <MyInput
            type="radio"
            name="flavour"
            id="Sweet"
            value="Sweet"
            checked={selectedFlavour === 'Sweet'}
            onChange={handleFlavourChange}
          />
        </label>
      </li>
    </ul>
  );
}

export { SelectFlavour };
