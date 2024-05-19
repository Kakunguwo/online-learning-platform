const year = new Date().getFullYear();

function Footer() {
  return <footer className='bg-gradient-to-r from-blue-400 to-blue-700'>
    <div className='max-w-6xl mx-auto p-3 text-center'>
        <h1 className="font-light text-sm sm:text-xl text-center text-white">
          <small>&copy; {year}: Developed by Ronnie Kakunguwo</small>         
        </h1>    
    </div>
  </footer>
}

export default Footer