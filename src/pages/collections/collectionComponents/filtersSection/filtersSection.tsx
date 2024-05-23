import './filtersSection.scss';
import MyInput from '../../../../components/input/input';
const Filters = () => {
  return (
    <>
      <section className="collection-page_content-filters">
        <div>
          <label>
            Какой то выбор
            <MyInput type="checkbox" />
          </label>
        </div>
        <div>
          <label>
            Какой то выбор
            <MyInput type="checkbox" />
          </label>
        </div>
        <div>
          <label>
            Какой то выбор
            <MyInput type="checkbox" />
          </label>
        </div>
      </section>
    </>
  );
};

export default Filters;
