import './componentsChooseCategory.scss';

interface ChooseCategoryProps {
  className: string;
}

function ChooseCategory(selector: ChooseCategoryProps) {
  return (
    <>
      <div className={selector.className}></div>
    </>
  );
}

export { ChooseCategory };
