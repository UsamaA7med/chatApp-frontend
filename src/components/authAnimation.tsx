import Lottie from 'lottie-react'
import animationData from '../animations/animationData.json'
const AuthAnimation = () => {
  return (
    <div>
      <Lottie animationData={animationData} loop={true} />
    </div>
  )
}

export default AuthAnimation
