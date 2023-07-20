import React from 'react'

function CustomModal({message,action,modId}) {
    return (
        <div class="modal fade" id={modId} tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header align-items-start">
                        <h5>{message}. <b>Are you sure?</b></h5>    
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal" onClick={action}>Yes</button>
                        <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomModal


{/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> */ }
