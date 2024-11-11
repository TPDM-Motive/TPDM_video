document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');
    const videoSource = document.getElementById('video-source');
    const videoList = document.getElementById('video-list');
    const statusItems = document.querySelectorAll('.status-item');

    let activationTimes = [0, 5, 10]; // Default activation times

    // Function to clear all active classes
    function clearActiveClasses() {
        statusItems.forEach(item => {
            item.classList.remove('active-1', 'active-2', 'active-3');
        });
    }

    // Function to set active status
    function setActiveStatus(index) {
        clearActiveClasses();
        statusItems[index].classList.add(`active-${index + 1}`);
    }

    // Add event listener for video time update
    video.addEventListener('timeupdate', () => {
        const currentTime = video.currentTime;

        if (currentTime >= activationTimes[0] && currentTime < activationTimes[1]) {
            setActiveStatus(0); 
        } else if (currentTime >= activationTimes[1] && currentTime < activationTimes[2]) {
            setActiveStatus(1); 
        } else if (currentTime >= activationTimes[2]) {
            setActiveStatus(2); 
        }
    });

    // Fetch the video list from the JSON file
    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(videoItem => {
                const li = document.createElement('li');
                li.textContent = videoItem.title;
                li.setAttribute('data-src', videoItem.src);
                li.setAttribute('data-times', JSON.stringify(videoItem.times));
                videoList.appendChild(li);
            });

            // Add event listener for video list items
            videoList.addEventListener('click', function(e) {
                if (e.target.tagName === 'LI') {
                    const src = e.target.getAttribute('data-src');
                    activationTimes = JSON.parse(e.target.getAttribute('data-times'));
                    videoSource.setAttribute('src', src);
                    video.load();
                    video.play();
                }
            });
        })
        .catch(error => console.error('Error fetching video list:', error));
});
