const deleteCommentFormHandler = async function (event) {
    event.preventDefault();

    if (event.target.hasAttribute('data-comment_id')) {
        const id = event.target.getAttribute('data-comment_id');

        await fetch (`/api/comment/${id}`, {
            method: 'DELETE',
        });
            document.location.reload();
    }
};

document
    .querySelectorAll('.delete-comment')
    .forEach(e => e.addEventListener('click', deleteCommentFormHandler));