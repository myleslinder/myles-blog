import Link from 'next/link'

import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'

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

export default function PostsIndex({ posts }) {
  return <PostsList posts={posts} title="Select Posts" />
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
