import { useEffect, useState } from 'react';
import './profile.scss';
import { getUserById } from '../../lib/getUserById';
import { useNavigate } from 'react-router-dom';
import User from '../../interfaces/customer';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  if (!localStorage.getItem('userId')) {
    navigate('/');
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById();
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading data...</div>;
  }

  return (
    <>
      <section className="profileSection">
        <div className="personalWrap">
          <div className="personal">
            <p className="personal_label">First name</p>
            <p className="personal_value">{user.firstName || 'no data :('}</p>
          </div>
          <div className="personal">
            <p className="personal_label">Last name</p>
            <p className="personal_value">{user.lastName || 'no data :('}</p>
          </div>
          <div className="personal">
            <p className="personal_label">e-mail</p>
            <p className="personal_value">{user.email || 'no data :('}</p>
          </div>
          <div className="personal">
            <p className="personal_label">Date of birth</p>
            <p className="personal_value">{user.dateOfBirth || 'no data :('}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
