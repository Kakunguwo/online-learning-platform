
import Hero from '../components/Hero'
import HomeCourseTabs from '../components/HomeCourseTabs'

function Home() {
  return (
    <>
      <Hero/>
      <div className='my-10 md:my-3 flex flex-col justify-center items-center bottom-4'>
        <h2 className='font-bold text-2xl my-4'>Explore some of our courses</h2>
        <HomeCourseTabs/>
      </div>
    </>

  )
}

export default Home