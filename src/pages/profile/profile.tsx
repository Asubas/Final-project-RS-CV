import { ApiRoot } from '@commercetools/platform-sdk';
import './profile.scss';

function Profile() {

  return (
    <>
      <section className="profileSection">
        <div className="personalWrap">
          <div className="personal">
            <p className="personal_label">First name</p>
            <p className="personal_value">Some first name</p>
          </div>
          <div className="personal">
            <p className="personal_label">Last name</p>
            <p className="personal_value">Some last name</p>
          </div>
          <div className="personal">
            <p className="personal_label">e-mail</p>
            <p className="personal_value">Some e-mail</p>
          </div>
          <div className="personal">
            <p className="personal_label">Date of birth</p>
            <p className="personal_value">Some date</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
