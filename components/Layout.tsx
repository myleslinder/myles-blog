const Layout = ({ children }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <main>
        <article className="xl:divide-y xl:divide-gray-200">{children}</article>
      </main>
    </div>
  )
}
export default Layout
