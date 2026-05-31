import { useParams } from 'react-router-dom'
import ProfileEditor from '../components/ProfileEditor'

export default function EditProfilePage() {
  const params = useParams()
  const username = params.username as string

  return <ProfileEditor username={username} />
}
