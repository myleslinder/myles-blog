import Head from 'next/head'
import Link from 'next/link'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'

const HomeHero = () => {
  return (
    <div className="flex flex-col justify-between py-20 h-full md:flex-row">
      <div className="max-w-md">
        {/* <p className="mb-6 font-mono text-xs">Let's get to know each other</p> */}
        <h1 className="text-5xl font-bold my-6">
          <span className="text-4xl">👋</span> Hey, I'm Myles
        </h1>
        <p className="text-2xl font-semibold mb-6 leading-relaxed text-gray-500">
          I overthink things about behaviour, products, and technology
        </p>
        {/* <button>Something here</button> */}
      </div>
      <div className="text-center bg-gray-50 p-20 rounded-lg">
        <h3 className="text-xl font-bold pb-6">Thanks for visiting!</h3>
        <p>I'm currently updating my portfolio, please check back soon.</p>
      </div>
      {/* <div className="flex-grow flex justify-end">
        <img src="/PersonalCaffeine.png" width="300" />
      </div> */}
    </div>
  )
}

const PostsList = ({ title, posts }) => {
  return (
    <>
      <h3 className="font-semibold text-lg pb-4">{title}</h3>
      <ul className="w-full">
        {posts.map(post => (
          <li key={post.filePath} className="bg-gray-50 p-10 rounded-lg w-full">
            <Link
              as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
              href={`/posts/[slug]`}
            >
              <a>{post.data.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
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
        {/* <div className="pr-4 w-full">
          <PostsList posts={posts} title="Select Posts" />
        </div>
        <div className="pl-4 w-full">
          <PostsList posts={posts} title="Recent Posts" />
        </div> */}
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
