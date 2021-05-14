const Section = ({ title, subtitle, children, linkTitle = null }) => {
  return (
    <section className="py-16" id={title.toLowerCase().replace(' ', '-')}>
      <h3 className="text-6xl font-bold pt-10 pb-4">{title}</h3>
      <p className="pb-16">{subtitle}</p>
      <div className="flex justify-between">{children}</div>
    </section>
  )
}
export default Section
