import { useState } from 'react'
import useMobileResize from '../hooks/useMobileResize'

const Section = ({ title, subtitle, children, linkTitle = null }) => {
  // const [isMobile, setIsMobile] = useState(false)

  // useMobileResize([setIsMobile])
  return (
    <section className="py-12" id={title.toLowerCase().replace(' ', '-')}>
      <h2 className="text-5xl sm:text-6xl font-bold pt-10 pb-4">{title}</h2>
      <p className="pb-8 font-semibold">{subtitle}</p>
      <div className="flex justify-between lg:flex-row flex-col gap-y-12 lg:gap-x-12">
        {children}
      </div>
    </section>
  )
}
export default Section
