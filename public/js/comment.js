const commentFormHandler = async function (event) {
    event.preventDefault();

    const content = document.querySelector('#comment-input').value;
    const post_id = document.querySelector("#comment-input").dataset.post_id;

    if (content) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment_text: content,
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