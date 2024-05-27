import './filtersSection.scss';
import MyInput from '../../../../components/input/input';
const Filters = () => {
  return (
    <>
      <section className="collection-page_content-filters">
        <ul className="filters-list">
          <li className="filters-list__item">
            <label>
              Какой то выбор
              <MyInput type="checkbox" />
            </label>
          </li>
          <li className="filters-list__item">
            <label>
              Какой то выбор
              <MyInput type="checkbox" />
            </label>
          </li>
          <li className="filters-list__item">
            <label>
              Какой то выбор
              <MyInput type="checkbox" />
            </label>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Filters;
