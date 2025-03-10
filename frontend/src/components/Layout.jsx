import Navbar from './Navbar'

function Layout({ children }){
    return (
        <div className="flex min-h-screen w-full bg-gray-200 flex-col">
            <div className="w-full">
                <Navbar />
                {children}
            </div>
  
        </div>
    )
}

export default Layout