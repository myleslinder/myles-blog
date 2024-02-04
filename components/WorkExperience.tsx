type previousCompany = 'Emergence Labs' | 'BrainStation' | 'Konrad Group'

const previousJobPositions = [
  {
    company: 'Persy AI',
    positions: [
      {
        title: 'Co-Founder, Full-Stack Developer',
        dateLine: 'January 2022 - January 2023',
        description:
          'Persy AI was a SaaS product including a web app and browser extension. Our product used AI, professional network data, and persona specific value propositions to write contextual content for outbound sales teams (e.g. emails, voicemail scripts).',
      },
    ],
    logoUrl: '/persy-logo-dark.png',
    style: {
      backgroundImage: 'url("/grid.svg")',
      backgroundPosition: '180% -100%',
      backgroundSize: '90%',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#1f2937',
    },
    width: 200,
  },
  {
    company: 'Emergence Labs',
    positions: [
      {
        title: 'Co-Founder, Full-Stack Developer',
        dateLine: 'October 2018 - Dec 2021',
        description:
          'Co-founded and ran a Salesforce partner as the full-stack developer, working with over 100 businesses in varied industries. I scoped, designed, and developed six figures a year of custom software projects on the Salesforce platform.',
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
    width: 250,
  },
  {
    company: 'BrainStation',
    positions: [
      {
        title: 'Senior Manager, Digital Product',
        dateLine: 'May 2018 - October 2018',
        description: `Product manager for all of BrainStation's digital products, including the e-commerce application, custom CRM, and student portal. Product marketing and positioning for the educational product., Developing a new customer incentive system.
          - Leading the brand evolution and redesign of all customer facing web properties.`,
      },
      {
        title: 'Manager, Digital Product',
        dateLine: 'February 2017 - April 2018',
        // TODO: hyperlink
        description: `Designing and launching BrainStation Online, including full-time and part-time courses. As well as introducing other new products (short-form preparatory courses) and updating previous offerings (workshops). Occasionally my responsibilities extended to managing six figure ad campaigns or working on new campus window signage.`,
      },
    ],
    dateLine: 'May 2018 - October 2018',
    logoUrl: '/bs-logo.png',
    style: {
      backgroundImage: 'url("/bs-graphic.png")',
      backgroundSize: 'cover',
      backgroundColor: '#101D42',
    },
    width: 250,
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
    width: 250,
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
      {previousJobPositions.map(
        ({ logoUrl, company, positions, style, width }) => (
          <div
            key={company}
            style={style}
            className="bg-black px-6 py-12 md:px-12 rounded-lg my-8"
          >
            <div className="pb-12">
              <img
                src={logoUrl}
                alt={`${company} logo`}
                style={{ width: width }}
              />
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
        ),
      )}
    </div>
  )
}

export default WorkExperience
