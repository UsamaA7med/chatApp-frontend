import { useRef } from 'react'
import { useAuth } from '../store/useAuth'

const ProfilePage = () => {
  const { user, updateProfilePic, isLoading } = useAuth()
  const memberSince = new Date(user?.createdAt as string).toDateString()
  const profilePic = useRef<HTMLInputElement | null>(null)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file as Blob)
    updateProfilePic(formData)
  }
  return (
    <div className="flex w-1/3 justify-center min-w-[300px] gap-10 flex-col items-center">
      <div className="flex w-full p-5 rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg   flex-col gap-10 items-center">
        <div className="flex flex-col items-center gap-2">
          <p>Profile</p>
          <p>Your profile information</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div
            className="avatar"
            onClick={() => {
              if (!isLoading) {
                profilePic?.current?.click()
              }
            }}
          >
            <div className="w-32 rounded-full">
              <img src={user?.profilePic.url} />
            </div>
          </div>
          <input
            type="file"
            ref={profilePic}
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-[0.8rem]">
            {isLoading ? (
              <span className="loading loading-ball loading-lg"></span>
            ) : (
              ' click the avatar to change your profile picture'
            )}
          </p>
        </div>
        <div className="flex flex-col  items-center gap-3 w-full">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input type="text" value={user?.fullname} readOnly />
          </label>
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input type="email" value={user?.email} readOnly />
          </label>
        </div>
      </div>
      <div className="flex rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg w-full text-sm flex-col gap-5 p-5">
        <p>Account information</p>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p>Member since</p>
            <p>{memberSince}</p>
          </div>
          <div className="divider" />
          <div className="flex justify-between">
            <p>Account status</p>
            <p className="text-success">Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
