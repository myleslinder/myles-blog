type previousCompany = 'Emergence Labs' | 'BrainStation' | 'Konrad Group'

const previousJobPositions = [
  {
    company: 'Emergence Labs',
    positions: [
      {
        title: 'Co-Founder, Development Lead',
        dateLine: 'October 2018 - May 2021',
        description:
          'Emergence Labs operated primarily within the Salesforce ecosystem and as the lead developer I architected and developed a range of solutions for clients using web technologies. Worked closely with our clients to ensure that our solutions were effective at addressing their problems and we could prove a clear ROI.',
      },
    ],
    logoUrl: '/el-logo.png',
    style: {
      backgroundImage: 'url("/el-graphic.png")',
      backgroundPosition: '180% -100%',
      backgroundSize: '90%',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#232323',
    },
  },
  {
    company: 'BrainStation',
    positions: [
      {
        title: 'Senior Manager, Digital Products & Strategy',
        dateLine: 'May 2018 - October 2018',
        description:
          'In 2018 I was primarily focused on an overhaul of the marketing website to go along with a company brand evolution. I continued to manage and improve the LMS as well as build out product management workflows within the organization. My responsibilities also grew to include supporting roles with a number of different departments including marketing and operations.',
      },
      {
        title: 'Manager, Digital Products & Strategy',
        dateLine: 'February 2017 - April 2018',
        description:
          'I joined Brainstation to launch their online sychronous education offering and manage their suite of digital products, which included a number of internal tools. During this time I launched the online courses business line, managed and released a new custom learning platform for students, and improved the internal tools.',
      },
    ],
    dateLine: 'May 2018 - October 2018',
    logoUrl: '/bs-logo.png',
    style: {
      backgroundImage: 'url("/bs-graphic.png")',
      backgroundSize: 'cover',
      backgroundColor: '#101D42',
    },
  },
  {
    company: 'Konrad Group',
    positions: [
      {
        title: 'Senior Consultant, Strategy & Technology',
        dateLine: 'February 2016 - February 2017',
        description:
          'As a Senior Consultant I worked as an engagement lead on client projects defining requirements, running design thinking workshops, and managing the account. I often also operated as an agile project manager by defining project teams, developing project plans, and managing the ongoing project. I was heavily involved in the design phase of projects and it’s associated components (i.e Information Architecture, User Research, User Testing)',
      },
      {
        title: 'Consultant, Strategy & Technology',
        dateLine: 'February 2015 - February 2016',
        description:
          'I worked on interdisciplinary teams to create usable and desirable products. My role involved uncovering client goals, defining end-user experiences, and documenting technology requirements to ensure client satisfaction and end user acceptance. ',
      },
    ],
    logoUrl: '/konrad-logo.png',
    style: {
      backgroundImage: 'url("/kg-graphic.png")',
      backgroundSize: 'cover',
      backgroundColor: '#000',
    },
  },
]

const JobPosition = ({ position, dateLine, description }) => {
  return (
    <div className="bg-white text-black p-6 rounded-lg flex flex-col my-6">
      <div className="flex justify-between flex-grow py-4 md:items-center md:flex-row flex-col">
        <p className="font-bold text-md md:pb-0 pb-4">{position}</p>
        <p className="font-mono text-blue-700 text-xs ">{dateLine}</p>
      </div>
      <div className="flex-shrink" style={{ flexBasis: '60%' }}>
        <p className="text-sm leading-loose">{description}</p>
      </div>
    </div>
  )
}

const WorkExperience = () => {
  return (
    <div className="w-full">
      {previousJobPositions.map(({ logoUrl, company, positions, style }) => (
        <div
          key={company}
          style={style}
          className="bg-black px-6 py-12 md:px-12 rounded-lg my-8"
        >
          <div className="pb-12">
            <img src={logoUrl} alt={`${company} logo`} style={{ width: 250 }} />
          </div>
          {positions.map(({ title, dateLine, description }) => (
            <JobPosition
              key={title}
              position={title}
              dateLine={dateLine}
              description={description}
            ></JobPosition>
          ))}
        </div>
      ))}
    </div>
  )
}

export default WorkExperience
