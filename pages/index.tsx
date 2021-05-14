import Head from 'next/head'
import Link from 'next/link'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'

import Section from '../components/Section'
import PersonalCaffeine from '../components/PersonalCaffeine'
import WorkExperience from '../components/WorkExperience'

import { LocationMarkerIcon } from '@heroicons/react/solid'

const HomeHero = () => {
  return (
    <div className="flex flex-col justify-between py-36 h-full md:flex-row">
      <div className="">
        {/* <p className="mb-6 font-mono text-xs">Let's get to know each other</p> */}
        <h1 className="text-4xl font-bold my-6 leading-normal">
          <span className="text-4xl">👋</span>{' '}
          <span className="bg-blue-100 p-1">Hey, I'm Myles</span>I overthink
          things about behaviour, products, and technology
        </h1>
        <p className="text-2xl font-semibold mb-6 leading-relaxed text-gray-500">
          I overthink things about behaviour, products, and technology
        </p>
        {/* <button>Something here</button> */}
      </div>

      {/* <PersonalCaffeine /> */}
    </div>
  )
}

const PostsList = ({ title, posts }) => {
  return (
    <>
      <h3 className="font-semibold text-lg pb-4">{title}</h3>
      <ul className="w-full">
        {posts.map(post => (
          <li
            key={post.filePath}
            className="bg-gray-50 p-10 rounded-lg w-full my-4"
          >
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
              href={`/posts/[slug]`}
            >
              <a className="text-lg font-semibold">{post.data.title}</a>
            </Link>
            <p className="text-xs pt-2">{post.data.description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

const LocationPhoto = ({ location, imgUrl, top = false }) => {
  const parentClassNames = ``
  return (
    <>
      <div
        className={`absolute left-0 bg-gray-100 w-full h-10 flex items-center justify-around p-4 ${
          top ? '-top-1 rounded-t-lg' : '-bottom-1 rounded-b-lg'
        }`}
      >
        <LocationMarkerIcon className="h-5 w-5 text-blue-500" />
        <p className="text-xs font-semibold">{location}</p>
      </div>
      <img src={imgUrl} className="rounded-lg" />
    </>
  )
}

const PhotoGrid = () => {
  return (
    <div className="relative w-full">
      <img
        src="/myles.png"
        className="absolute w-32 top-1/2 left-1/2 rounded-lg z-30"
      />
      <div className="absolute w-64 top-24 right-60 z-20 ">
        <div className="absolute -bottom-1 left-0 bg-gray-100 w-full h-10 rounded-b-lg flex items-center justify-around p-4">
          <LocationMarkerIcon className="h-5 w-5 text-blue-500" />
          <p className="text-xs font-semibold">
            Humantay Lake, Salkantay, Peru
          </p>
        </div>
        <img src="/salkantay-lake.jpeg" className="rounded-lg" />
      </div>
      <div className="absolute w-52 -bottom-24 right-0 z-0 rounded-lg">
        <LocationPhoto
          imgUrl="/whistler.jpeg"
          location="Whistler, BC, Canada"
        />
      </div>
      <div className="absolute w-52 top-0 right-12 z-10 rounded-lg">
        <LocationPhoto
          imgUrl="/toubkal-summit.jpeg"
          location="Mount Toubkal, Morocco"
          top
        />
      </div>
    </div>
  )
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Myles Linder</title>
        <link rel="icon" href="/M-logo.svg" />
      </Head>
      <HomeHero />
      <div className="flex justify-between">
        <div className="pr-4 w-full">
          <PostsList posts={posts} title="Select Posts" />
        </div>
        {/* <div className="pl-4 w-full">
          <PostsList posts={posts} title="Recent Posts" />
        </div> */}
      </div>
      <div>
        <Section title="About Me" subtitle="Lets get to know each other">
          <p className="max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non enim praesent elementum facilisis
            leo, vel fringilla est ullamcorper eget nulla facilisi etiam
            dignissim diam quis enim lobortis scelerisque fermentum dui faucibus
            in ornare quam viverra orci sagittis eu volutpat odio facilisis
            mauris sit amet massa vitae tortor condimentum lacinia quis vel eros
            donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue
            lacus, viverra vitae congue eu, consequat ac felis donec et odio
            pellentesque diam volutpat commodo sed egestas egestas fringilla
            phasellus faucibus
          </p>
          <PhotoGrid />
        </Section>
        <Section title="Experience" subtitle="some experience subtitle">
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non enim praesent elementum facilisis
            leo, vel fringilla est ullamcorper eget nulla facilisi etiam
            dignissim diam quis enim lobortis scelerisque fermentum dui faucibus
            in ornare quam viverra orci sagittis eu volutpat odio facilisis
            mauris sit amet massa vitae tortor condimentum lacinia quis vel eros
            donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue
            lacus, viverra vitae congue eu, consequat ac felis donec et odio
            pellentesque diam volutpat commodo sed egestas egestas fringilla
            phasellus faucibus
          </p>
        </Section>
        <WorkExperience />
        <Section title="Projects" subtitle="some projects subtitle">
          <div className="relative w-full bg-gray-50 h-72 p-12 rounded-lg text-center flex flex-col justify-between">
            <p className="text-5xl font-bold ">
              Groups for <span className="text-green-600">Spotify</span>
            </p>
            <p>
              Playlists updated weekly with the liked songs from your friends
            </p>
            <div>
              <button
                className="uppercase font-semibold tracking-widest text-xs rounded-3xl px-8 py-2 focus:outline-none bg-gray-300 border-gray-400 border-2 text-gray-400"
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
        </Section>
      </div>
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
