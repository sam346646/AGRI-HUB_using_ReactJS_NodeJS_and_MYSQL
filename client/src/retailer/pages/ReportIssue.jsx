import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import IssueHandler from '../components/IssueHandler'
import Breadcrumbs from '../components/Breadcrumbs'
import OptionMenuContainer from '../components/OptionMenuContainer'
import Footer from './Footer';

function ReportIssue() {
  const { ch } = useParams();

  const [title, setTitle] = useState()
  const [icon, setIcon] = useState()

  useEffect(() => {
    if (ch == 1) {
      setTitle('Report Issue')
      setIcon('exclamation-triangle')
    }
    if (ch == 2) {
      setTitle('Issue Status')
      setIcon('bell')
    }
  }, [ch])

  let options = [
    { title: 'Report Issue', ch: '/farmer/report_issue/1', icon: 'exclamation-triangle' },
    { title: 'Issue Status', ch: '/farmer/report_issue/2', icon: 'bell' },
  ]


  return (
    <>
      <div className='farmer_content_area container-fluid p-4'>
        <div className="row">
          <div className="col-3">
            <OptionMenuContainer title='Issues' options={options} />
          </div>

          <div className="col-9 ps-3">
            <Breadcrumbs breadcrumbs_title={`${title}`} breadcrumbs_icon={`${icon}`} />
            <IssueHandler choice={ch} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ReportIssue
