import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Navbar(){

    const nav = useNavigate()

    const handleNavigate = (route) => {
        nav(`/${route}`)
    }

    const handleNavigateUser = () => {
      const username = JSON.parse(localStorage.getItem('userData'))['username']
      nav(`/${username}`)
      window.location.reload()
    }


    return (
        <div className="lg:flex lg:items-center lg:justify-between m-3">
        <div className="min-w-0 flex-1">
          <Link to="/home">
            <h2 className="text-4xl font-bold text-black sm:truncate sm:text-3xl sm:tracking-tight">
              Lego Social
            </h2>
          </Link>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">

          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          {/* <span className="hidden sm:block">
            <Link to="">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer"
              >
                <BookmarkIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-gray-400" />
                Likes
              </button>
            </Link>
          </span> */}
  
          {/* <span className="ml-3 hidden sm:block">
            <Link to="">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer" 
              >
                <CircleStackIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-gray-400" />
                Collection
              </button>
            </Link>
          </span> */}
  
          <span className="sm:ml-3">

              <button onClick={handleNavigateUser}
                  type="button"
                  className="inline-flex  items-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 cursor-pointer">
                  {/* <UserIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" /> */}
                  Profile
              </button>

          </span>

        </div>
      </div>
    )
}

export default Navbar