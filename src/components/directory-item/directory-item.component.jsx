import { Link } from 'react-router-dom'
import {
  BackgroundImage,
  Body,
  DirectoryContainer,
} from './directory-item.styles'
const DirectoryItem = ({ category }) => {
  return (
    <DirectoryContainer>
      <BackgroundImage imageUrl={category.imageUrl} />
      <Body>
        <h2>{category.title}</h2>
        <Link to={`shop/${category.title}`}>
          <p>Shop Now</p>
        </Link>
      </Body>
    </DirectoryContainer>
  )
}
export default DirectoryItem
