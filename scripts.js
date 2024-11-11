document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const videoSource = document.getElementById('video-source');
    const videoList = document.getElementById('video-list');

    // Fetch the video list from the JSON file
    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(videoItem => {
                const li = document.createElement('li');
                li.textContent = videoItem.title;
                li.setAttribute('data-src', videoItem.src);
                videoList.appendChild(li);
            });

            // Add event listener for video list items
            videoList.addEventListener('click', function(e) {
                if (e.target.tagName === 'LI') {
                    const src = e.target.getAttribute('data-src');
                    videoSource.setAttribute('src', src);
                    video.load();
                    video.play();
                }
            });
        })
        .catch(error => console.error('Error fetching video list:', error));
});
