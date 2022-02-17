    // Remove pure-menu-horizontal class if window max-width: 600px
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    const navi = document.getElementById('navi');

    function checkScreenAdjustNavi(e) {
        // Check if media query is tru
        if (e.matches) {
            navi.classList.remove("pure-menu-horizontal");
        } else {
            navi.classList.add("pure-menu-horizontal");
        }
    }

    // Set event listener
    mediaQuery.addListener(checkScreenAdjustNavi);

    // Initial check
    checkScreenAdjustNavi(mediaQuery);
