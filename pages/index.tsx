import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'

import { PhotoGrid } from '../components/PhotoGrid'
import Section from '../components/Section'
import WorkExperience from '../components/WorkExperience'

const HomeHero = () => {
  return (
    <div className="flex flex-col py-12">
      {/* <p className="mb-6 font-mono text-xs">Let's get to know each other</p> */}
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
        <span className="bg-blue-100 p-2">Hey, I'm Myles</span>
        <span className="block pt-4 text-3xl sm:text-4xl text-gray-500">
          I like to solve problems with technology.
        </span>
      </h1>
      <p className="sm:text-md font-medium mb-12 leading-relaxed">
        I have the most fun when working cross-functionally across product,
        design, and development. I'm especially interested in human behavior,
        why do we do the things we do. I love learning new things and helping
        others learn.
      </p>
      {/* <div>
        <button className="text-lg px-6 border-blue-600 rounded-lg border py-2 text-blue-600 flex justify-center items-center gap-x-3">
          Get In Touch
        </button>
      </div> */}
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
          <div className="lg:max-w-md flex flex-col">
            <p className="py-4">
              I was born and raised in Vancouver, Canada where I grew to love
              the mountains, especially skiing and hiking. After university I
              moved to Toronto shifting my attention to different interests -
              namely eating and drinking.
            </p>
            <p className="py-4">
              I'm currently living in Vancouver, but I'm not sure where I'll be
              settling in the near future. My educational background is in
              business, however I've worked as a PM, designer, and developer.
            </p>
            <p className="py-4">
              Most recently, I was the co-founder and technology lead of a
              software consulting business focused on CRM technologies with a
              few long-time friends. I'm passionate about learning/education,
              technology, and behaviour (especially behavioural economics).
            </p>
          </div>
          <div className="lg:transform lg:-translate-y-20">
            <PhotoGrid />
          </div>
        </Section>
        <Section
          title="Experience"
          subtitle="My professional work experience, in reverse chronological order"
        >
          <WorkExperience />
        </Section>
        <Section
          title="Projects"
          subtitle="Some things I'm working on - just for fun"
        >
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
