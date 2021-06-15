import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import Layout from '../../components/Layout'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'

import { ArrowLeftIcon } from '@heroicons/react/outline'

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  //   a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  // TestComponent: dynamic(() => import('../../components/TestComponent')),
  Head,
}

export default function PostPage({ source, frontMatter }) {
  const content = hydrate(source, { components })
  return (
    <>
      <header>
        <Head>
          <title>{frontMatter.title} - Myles Linder</title>
        </Head>
        <nav>
          <Link href="/posts">
            <a className="flex items-center my-2 text-blue-600">
              <ArrowLeftIcon className="w-4 h-4 inline mr-2" />
              <span className="">View all posts</span>
            </a>
          </Link>
        </nav>
      </header>
      <Layout>
        <div className="post-header pb-5">
          <h1 className="text-6xl font-semibold py-4">{frontMatter.title}</h1>
          {frontMatter.description && (
            <p className="description text-lg text-gray-500">
              {frontMatter.description}
            </p>
          )}
        </div>
        <div className="prose lg:prose-xl pt-4">{content}</div>
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map(path => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map(slug => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
