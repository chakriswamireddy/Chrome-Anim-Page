import React from 'react'
import ParallaxBlocks from '../components/ParallaxBlocks'
import PinnedHeroReveal from '../components/PinnedScrollHero'
import FeatureAccordion from '../components/FeatureAccordion'
import FloatCallouts from '../components/FloatCallouts'
import WindowCarousel from '../components/WindowCarousel'

function HomePage() {
  return (
    <div>
      Homepage
      <ParallaxBlocks />
      <div className='-mt-[65vh] ' >

        <h1 className=' text-center ' >Discover the latest <span className='bg-blue-100  ' >

          updates   </span>  From Chrome  </h1>
        <PinnedHeroReveal />
        <FeatureAccordion />
        <FloatCallouts />
        <WindowCarousel />
      </div>


      <section style={{ height: "100vh" }} />

    </div>
  )
}

export default HomePage