const editCommentFormHandler = async function (event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const comment_text = document.querySelector('input[name="comment-content"]').value;

    if (comment_text) {
        const response = await fetch(`/api/comment/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) { 
            window.location.replace(document.referrer);
        } else {
            alert(response.statusText);
        }
    }
}

document
    .getElementById('edit-comment')
    .addEventListener('click', editCommentFormHandler);
    
