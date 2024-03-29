import { NextPageContext } from 'next'
import Now from '../components/Now'
import { PhotoGrid } from '../components/PhotoGrid'
import Section from '../components/Section'
import WorkExperience from '../components/WorkExperience'

const HomeHero = () => {
  return (
    <div className="flex justify-between items-center gap-x-16 flex-col lg:flex-row">
      <div className="flex flex-col py-12 lg:max-w-lg max-w-full">
        <h1
          className="text-4xl sm:text-5xl font-bold my-6"
          style={{ lineHeight: '3.5rem' }}
        >
          <span
            role="img"
            aria-label="Waving hand emoji"
            className="text-4xl sm:text-5xl block mb-4"
          >
            👋
          </span>
          <span className="bg-blue-100 dark:bg-blue-900 p-2">
            Hey, I'm Myles
          </span>
          <span className="block pt-4 text-3xl sm:text-4xl text-gray-500 dark:text-gray-400">
            I like to solve problems with technology
          </span>
        </h1>
        <p className="sm:text-md font-medium mb-6 leading-loose">
          I'm a software developer, serial hobbyist, and former founder. Most
          recently, I was the technical co-founder at{' '}
          <a
            href="https://persy.ai"
            target="_blank"
            rel="noreferrer"
            className="border-b-2 border-slate-400"
          >
            Persy AI
          </a>
          , an app that used professional network data and AI to write
          contextual content for outbound sales teams.
        </p>

        <p className="sm:text-md font-medium mb-6 leading-loose">
          Before Persy, I co-founded Emergence Labs, a Salesforce partner
          focused on custom development projects for mid-sized businesses.
          Emergence Labs' client base was transitioned to SkyVenn in 2021.
        </p>

        {/* <div>
        <button className="text-lg px-6 border-blue-600 rounded-lg border py-2 text-blue-600 flex justify-center items-center gap-x-3">
          Get In Touch
        </button>
      </div> */}
      </div>
      <div className="flex-grow w-full">
        <Now />
      </div>
    </div>
  )
}

export default function Home({}) {
  return (
    <div>
      <HomeHero />
      {/* <div className="flex justify-between">
        <div className="pr-4 w-full"></div>
        <div className="pl-4 w-full">
          <PostsList posts={posts} title="Recent Posts" />
        </div>
      </div> */}
      <div>
        <Section title="About Me" subtitle="Lets get to know each other">
          <div className="lg:max-w-md flex flex-col">
            <p className="py-4">
              I grew up in Vancouver, where I fell in love with the mountains,
              especially skiing and hiking. After spending most of the last
              decade living and working in Toronto, I've been drawn back to
              Vancouver, swapping the TTC for the BCMC.
            </p>

            <p className="py-4">
              Lately I've been interested in the psychology of learning and
              metaphysics.
            </p>
          </div>
          <div
            className="lg:transform lg:-translate-y-20"
            // style={{ zIndex: -1 }}
          >
            <PhotoGrid />
          </div>
        </Section>
        <Section
          title="Experience"
          subtitle="A sample of my professional experience"
        >
          <WorkExperience />
        </Section>
        <Section
          title="Projects"
          subtitle="Some just-for-fun things I may or may not be working on"
        >
          <Project />
        </Section>
      </div>
    </div>
  )
}

const Project = () => {
  return (
    <div className="relative w-full bg-gray-50 h-72 md:p-12 p-8 rounded-lg text-center flex flex-col justify-between text-black">
      <p className="md:text-5xl text-3xl font-bold ">
        Groups for <span className="text-green-600">Spotify</span>
      </p>
      <p>Playlists updated weekly with liked songs from your friends</p>
      <div>
        <button
          className="disabled:cursor-not-allowed uppercase font-semibold tracking-widest text-xs rounded-3xl px-8 py-2 focus:outline-none bg-gray-300 border-gray-400 border-2 text-gray-400"
          disabled
        >
          Coming Soon
        </button>
      </div>
      <img
        src="/groups-illustration-stroke.png"
        className="absolute left-0 top-10 w-20"
        alt=""
      />

      <img
        src="/groups-illustration-fill.png"
        className="absolute bottom-0 right-0 w-96 rounded-b-lg"
        alt=""
      />
    </div>
  )
}

export function getServerSideProps(context: NextPageContext) {
  if (!context.res.writableEnded) {
    context.res.setHeader(
      'set-cookie',
      `api=${process.env.INTERNAL_API_SECRET}; HttpOnly;Secure;SameSite=Strict`,
    )
  } else {
    console.warn('Res already sent')
  }
  return {
    props: {},
  }
}

// export function getStaticProps() {
//   const posts = postFilePaths.map(filePath => {
//     const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
//     const { content, data } = matter(source)

//     return {
//       content,
//       data,
//       filePath,
//     }
//   })

//   return { props: { posts } }
// }
