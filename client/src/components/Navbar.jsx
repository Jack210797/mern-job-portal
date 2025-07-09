import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()

  const { setShowRecruiterLogin, companyToken, companyData } = useContext(AppContext)

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick={() => navigate('/')} className="cursor-pointer" src={assets.logo} alt="" />
        {user ? (
          <div className="flex items-center gap-3">
            {companyToken && companyData && (
              <div className="flex items-center gap-3">
                <Link className="relative group" to={'/dashboard'}>
                  <img className="w-8 border rounded-full" src={companyData.image} alt={companyData.name} />
                </Link>
                <p>|</p>
              </div>
            )}
            <Link to={'/applications'}>Applied Jobs</Link>
            <p>|</p>
            <p className="max-sm:hidden ">Hi, {user.firstName + (user.lastName ? ' ' + user.lastName : '')}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-4 max-sm:text-xs">
            {companyToken && companyData ? (
              <div className="flex items-center gap-3">
                <Link className="w-7 h-7 relative flex rounded-full" to={'/dashboard'}>
                  <img className="w-full h-full object-cover" src={companyData.image} alt={companyData.name} />
                </Link>
                <p>|</p>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  if (companyToken) {
                    navigate('/dashboard')
                  } else {
                    setShowRecruiterLogin(true)
                  }
                }}
                className="text-gray-600"
              >
                Recruiter Login
              </button>
            )}
            <button
              onClick={(e) => {
                openSignIn()
              }}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
