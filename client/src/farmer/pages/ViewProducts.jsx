import React from 'react'
import ViewProductContainer from '../components/ViewProductContainer'
import OptionMenuContainer from '../components/OptionMenuContainer';

let options = [
  { title: 'Add Product', ch: '/farmer/sell_product', icon: 'tag' },
  { title: 'View Products', ch: '/farmer/view_product', icon: 'tasks' }
]

function ViewProducts({ ch }) {
  return (
    <>
      {
        (ch === 'dashboard') ?
          (
            <>
              <ViewProductContainer />
            </>
          ) :
          (
            <>
              <div className='farmer_content_area container-fluid px-4 py-4'>
                <div className="row">
                  <div className="col-3">
                    <OptionMenuContainer title='Products' options={options} />
                  </div>

                  <div className="col-9 ps-3">
                    <ViewProductContainer />
                  </div>
                </div>
              </div>
            </>
          )
      }
    </>
  )
}

export default ViewProducts
