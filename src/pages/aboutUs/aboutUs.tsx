import './aboutUs.scss';

interface Developer {
  name: string;
  location: string;
  about: string;
  img: string | '';
  gitUrl: string;
  role: string;
}

const developerData: Developer[] = [
  {
    name: 'Asubas',
    location: 'Russia, Yaroslavl',
    about:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aperiam ea quasi repellendus, inventore numquam ex laboriosam perferendis rerum facilis eaque tenetur expedita. Voluptatem illum, consequuntur laboriosam possimus ipsa officia!',
    img: '',
    gitUrl: 'https://github.com/Asubas',
    role: 'teamlid, capitan',
  },
  {
    name: 'lipan48',
    location: 'Russia, Voronezh',
    about:
      'My name is Anton, and I’m that guy who always seeks new challenges and is ready to learning something new. I’m 35 years old and have experience in sales and logistics, but I realized that I`m in search of myself. I see myself in front-end development. I’m self-motivated and always willing to learn new technologies and development procedures.',
    img: 'https://avatars.githubusercontent.com/u/120409900?s=400&u=bcd265e18b819ee7aa8f65a4a1aaa7428fd34b68&v=4',
    gitUrl: 'https://github.com/lipan4836',
    role: 'jira-technic, solder',
  },
  {
    name: 'DzmitryAlekseev',
    location: 'Poland, Wrocław',
    about:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas aperiam ea quasi repellendus, inventore numquam ex laboriosam perferendis rerum facilis eaque tenetur expedita. Voluptatem illum, consequuntur laboriosam possimus ipsa officia!',
    img: '',
    gitUrl: 'https://github.com/DzmitryAlekseev',
    role: 'solder',
  },
];

function AboutUs() {
  return (
    <section className="aboutUsSect">
      <div className="rssWrap">
        <div className="rssLogo">
          <a href="https://rs.school/" className="rssLogo_link"></a>
        </div>
        <div className="rssDisc">
          Do you want to dive into frontend development and learn how to create cool projects? Then
          sign up for RS School!! Join ot our team!
        </div>
        <div className="rssTeam"></div>
      </div>
      <div className="developerWrap">
        {developerData.map((developer, index) => (
          <div className="developer" key={index}>
            <div className="developer_photo">
              <img
                className="developer_photo__img"
                src={developer.img}
                alt={`${developer.name}'s photo`}
              />
            </div>
            <div className="developer_info">
              <a
                href={developer.gitUrl}
                target="_blank"
                className="developer_info__name"
                rel="noreferrer"
              >
                {developer.name}
              </a>
              <p className="developer_info__location">{developer.location}</p>
              <p className="developer_info__location">{developer.role}</p>
              <p className="developer_info__about">{developer.about}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutUs;
