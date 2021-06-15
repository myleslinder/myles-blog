type previousCompany = 'Emergence Labs' | 'BrainStation' | 'Konrad Group'

const previousJobPositions = [
  {
    company: 'Emergence Labs',
    positions: [
      {
        title: 'Partner, Technology Operations',
        dateLine: 'October 2018 - May 2021',
        description: '',
      },
    ],
    logoUrl: '/el-logo.png',
    style: {
      backgroundImage: 'url("/el-graphic.png")',
      backgroundPosition: '110% -37px',
      backgroundSize: '501px',
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
        description: '',
      },
      {
        title: 'Manager, Digital Products & Strategy',
        dateLine: 'February 2017 - April 2018',
        description: '',
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
        description: '',
      },
      {
        title: 'Consultant, Strategy & Technology',
        dateLine: 'February 2015 - February 2016',
        description: '',
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
    <div className="bg-white p-6 rounded-lg flex flex-col my-6">
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
