(function () {
    function setSequentialFavicons() {
        const favicons = [
            'favicon_1.svg',
            'favicon_2.svg',
            'favicon_3.svg',
            'favicon_4.svg',
            'favicon_5.svg',
            'favicon_6.svg',
            'favicon_7.svg',
            'favicon_8.svg',
            'favicon_9.svg',
            'favicon_10.svg',
            'favicon_11.svg',
            'favicon_12.svg'
        ];
        let currentIndex = 0;

        function updateFavicon() {
            const faviconLink = document.getElementById('dynamic');
            if (faviconLink) {
                faviconLink.href = 'favicons/' + favicons[currentIndex];
                currentIndex = (currentIndex + 1) % favicons.length;
            }
        }
        updateFavicon();
        setInterval(updateFavicon, 2000);
    }

    document.addEventListener('DOMContentLoaded', setSequentialFavicons);
})();