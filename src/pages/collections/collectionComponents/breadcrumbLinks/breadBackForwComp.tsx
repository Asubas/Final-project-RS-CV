import './breadcrumbs.scss';
import Breadcrumbs from './breadcrumbs';
import { NavigateBack } from '../../../../components/navigateBtn/navigateBtn';
import { NavigateForward } from '../../../../components/navigateBtn/navigateBtn';
function BreadcrumbsComponent() {
  return (
    <div className="collection-page_breadcrumbLinks">
      <NavigateBack />
      <Breadcrumbs />
      <NavigateForward />
    </div>
  );
}

export { BreadcrumbsComponent };
