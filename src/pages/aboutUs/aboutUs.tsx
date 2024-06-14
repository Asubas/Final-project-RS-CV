import './aboutUs.scss';
import photoAlexey from '../../assets/img/alexey.jpg';
import photoDima from '../../assets/img/dmitriy.jpg';

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
    about: `My name is Alexey, I am 30 years old. I live in Yaroslavl and graduated from Yaroslavl State Technical University with a degree in Technical Systems Management. I have a bachelor's degree. Currently, I work in the field of industrial electronics. I've been looking at programming my whole life and was afraid to start. But at some point, I decided it was time (at 30 years old, yes). This course is my first significant experience in programming, and I hope it won't be my last. So far, I like everything, it's very interesting, and I constantly want to improve my skills. I wish everyone good luck, don't give up, and you will succeed!`,
    img: photoAlexey,
    gitUrl: 'https://github.com/Asubas',
    role: 'teamlead, developer, capitan',
  },
  {
    name: 'lipan48',
    location: 'Russia, Voronezh',
    about:
      'My name is Anton, and I`m that guy who always seeks new challenges and is ready to learning something new. I`m 35 years old and have experience in sales and logistics, but I realized that I`m in search of myself. I see myself in front-end development. I`m self-motivated and always willing to learn new technologies and development procedures.',
    img: 'https://avatars.githubusercontent.com/u/120409900?s=400&u=bcd265e18b819ee7aa8f65a4a1aaa7428fd34b68&v=4',
    gitUrl: 'https://github.com/lipan4836',
    role: 'jira-technic, developer, soldier',
  },
  {
    name: 'DzmitryAlekseev',
    location: 'Poland, Wrocław',
    about:
      'My name is Dzmitry Aliakseyeu and I`m currently living in Wroclaw, where I relocated from Belarus in 2022. I`m 29 years old.I graduated from Law Faculty and was working in the legal area. But right now I`m looking forward to becoming a Front-End Engineer. In March 2022 I joined the Basics of HTML and CSS course in It-Academy, Minsk. My next steps are self-education and RS school, and of course start a career in Front-End development within next year.',
    img: photoDima,
    gitUrl: 'https://github.com/DzmitryAlekseev',
    role: 'developer, soldier',
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
          sign up for RS School!! Join to RSS team!
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
              <p className="developer_info__subText subText_location">{developer.location}</p>
              <p className="developer_info__subText subText_role">{developer.role}</p>
              <p className="developer_info__about">{developer.about}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="contribution">
        <div className="contribution_img"></div>
        <div className="contribution_block">
          <p className="contribution_block__text">
            Alexey set up the project and implemented the user login page, product catalog pages,
            cart page, search, and filters, heplers functions. He also quickly fixed bugs.
          </p>
          <p className="contribution_block__text">
            Anton was responsible for implementing the main page, user page, &quot;About Us&quot;
            page, cart page, header, and footer. He also implemented the application router and
            handled uploading the product matrix to Commerce Tools.
          </p>
          <p className="contribution_block__text">
            Dmitry implemented the registration page and the detailed product page. From beginning,
            he worked with Alexey on setting up Commerce Tools.
          </p>
        </div>
      </div>
      <div className="collaboration">
        <div className="collaboration_img"></div>
        <div className="collaboration_block">
          <p className="collaboration_block__text">
            Our team held a call the day before the end of the sprint. During this call, we reviewed
            the results, identified difficulties, and tried to find solutions. Every 2-3 days
            throughout the sprint, we also met to share our current progress.
          </p>
          <p className="collaboration_block__text">
            Sometimes, to find solutions to certain tasks, we organized code jams. It was a great
            experience because each of us participated in the coding process. We all had a positive
            experience.
          </p>
          <p className="collaboration_block__text">
            Our teamlead (Alexey) is an excellent leader. He motivated everyone and was always
            positive. There are no obstacles for him. He&lsquo;s ready to code anytime he&lsquo;s
            not asleep!
          </p>
          <p className="collaboration_block__text">
            Anton and Dmitry, like true soldiers, followed their leader Alexey. They approached
            their tasks with responsibility.
          </p>
          <p className="collaboration_block__text">
            The development of this application is an excellent foundation for commercial
            development. Thank you very much to RS School for the opportunity. And special thanks to
            our mentor Tatiana for everything!
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
