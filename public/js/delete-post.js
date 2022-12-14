const deletePostFormHandler = async function (event) {
    event.preventDefault();

    if (event.target.hasAttribute('data-post_id')) {
        const id = event.target.getAttribute('data-post_id');

        await fetch (`/api/post/${id}`, {
            method: 'DELETE',
        });
            document.location.reload();
    }
};

document
    .querySelectorAll('.delete-post')
    .forEach(e => e.addEventListener('click', deletePostFormHandler));