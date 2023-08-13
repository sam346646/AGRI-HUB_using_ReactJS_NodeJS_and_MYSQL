import React, { useState } from 'react'

function CustomModalRejectQuery({ message, action, modId }) {

    const [reason, setReason] = useState()

    return (
        <div class="modal fade" id={modId} tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header align-items-start">
                        <h5>{message}. <b>Are you sure?</b></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        <div className="form-group mb-3">
                            <label className="form-label">Reason</label>
                            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} className="form-control" autoComplete="off" placeholder='Specify reason' required />
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal" onClick={()=>action(modId,reason)}>Yes</button>
                        <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomModalRejectQuery