import {  FaArrowRight } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
    
    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
    We Empower the World's Learners
    </h1>
    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
    We focus on transforming education through technology, innovation, and accessibility. By investing in the potential of learners worldwide, we unlock opportunities for growth and lifelong success.
    </p>
    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
      <Link
        to="/about"
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
      >
        Learn more
        <FaArrowRight size={24} className="mx-2 flex justify-end items-center"/>
      </Link>
      <Link
        to="/courses"
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        <MdCastForEducation size={24} className="mx-2 flex justify-end items-center"/>
        Courses
      </Link>
    </div>
    
  </div>
</section>

  )
}
