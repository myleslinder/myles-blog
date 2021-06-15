import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'

import { PhotoGrid } from '../components/PhotoGrid'
import Section from '../components/Section'
import WorkExperience from '../components/WorkExperience'

const HomeHero = () => {
  return (
    <div className="flex flex-col justify-between h-full md:flex-row md:py-36 sm:py-12">
      <div className="">
        {/* <p className="mb-6 font-mono text-xs">Let's get to know each other</p> */}
        <h1 className="text-3xl sm:text-4xl font-bold my-6 leading-normal">
          <span className="text-4xl sm:text-5xl block mb-4">👋</span>
          <span className="bg-blue-100 p-1 mr-2">Hey, I'm Myles</span>I
          overthink things about behaviour, products, and technology
        </h1>
        <p className="text-xl sm:text-2xl font-semibold mb-6 leading-relaxed text-gray-500">
          I overthink things about behaviour, products, and technology
        </p>
        {/* <button>Something here</button> */}
      </div>

      {/* <PersonalCaffeine /> */}
    </div>
  )
}

export default function Home({ posts }) {
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
          <p className="lg:max-w-md">
            - I was born and raised in Vancouver, Canada where I grew to love
            the mountains, especially skiing and hiking. After university I
            moved to Toronto shifting my attention to different interests -
            namely eating and drinking. I'm back on the west coast these days,
            but not sure where I'll be settling in the near future. - My
            educational background is in business, however I've worked as a PM,
            designer, and developer. Most recently, I was the co-founder and
            technology lead of a software consulting business focused on CRM
            technologies with a few long-time friends, however we've just exited
            the business. - I'm passionate about learning/education, technology,
            and behaviour (especially behavioural economics). - I read a fair
            amount (mostly non-fiction) and I'm always looking to discuss books
            if anyone is interested! My most recent reads: When Breathe Becomes
            Air, Dune, Seveneves, Think Again, and Thinking in Bets.
          </p>
          <div>
            <PhotoGrid />
          </div>
        </Section>
        <Section title="Experience" subtitle="some experience subtitle">
          <WorkExperience />
        </Section>
        <Section title="Projects" subtitle="some projects subtitle">
          <Project />
        </Section>
      </div>
    </div>
  )
}

const Project = () => {
  return (
    <div className="relative w-full bg-gray-50 h-72 md:p-12 p-8 rounded-lg text-center flex flex-col justify-between">
      <p className="md:text-5xl text-3xl font-bold ">
        Groups for <span className="text-green-600">Spotify</span>
      </p>
      <p>Playlists updated weekly with the liked songs from your friends</p>
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
      />

      <img
        src="/groups-illustration-fill.png"
        className="absolute bottom-0 right-0 w-96"
      />
    </div>
  )
}

export function getStaticProps() {
  const posts = postFilePaths.map(filePath => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts } }
}
