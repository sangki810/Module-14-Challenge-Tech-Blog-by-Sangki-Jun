const commentFormHandler = async function (event) {
    event.preventDefault();

    const content = document.querySelector('#comment-input').value;

    if (content) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                content,
                post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        document.location.reload();
    }
};

document
    .querySelector('#comment-btn')
    .addEventListener("click", commentFormHandler);