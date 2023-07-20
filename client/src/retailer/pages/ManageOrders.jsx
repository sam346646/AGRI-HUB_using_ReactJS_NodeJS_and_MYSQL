import ViewOrder from './ViewOrder'
import { useParams } from 'react-router-dom';

function ManageOrders() {
  const { ch } = useParams();

  return (
    <div className='retailer_content_area'>
      <ViewOrder choice={ch} />
    </div>
  )
}

export default ManageOrders
