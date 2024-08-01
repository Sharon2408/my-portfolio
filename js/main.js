(function ($) {
    "use strict";
    function portfolio_init() {
        var portfolio_grid = $('#portfolio_grid'), portfolio_filter = $('#portfolio_filters');
        if (portfolio_grid) {
            portfolio_grid.shuffle({ speed: 450, itemSelector: 'figure' });
            $('.site-main-menu').on("click", "a", function (e) { portfolio_grid.shuffle('update'); });
            portfolio_filter.on("click", ".filter", function (e) {
                portfolio_grid.shuffle('update');
                e.preventDefault();
                $('#portfolio_filters .filter').parent().removeClass('active');
                $(this).parent().addClass('active');
                portfolio_grid.shuffle('shuffle', $(this).attr('data-group'));
            });
        }
    }
    $(function () {
        $('#contact-form').validator(); $('#contact-form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var url = "contact_form/contact_form.php";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data) {
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;
                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                        if (messageAlert && messageText) {
                            $('#contact-form').find('.messages').html(alertBox);
                            $('#contact-form')[0].reset();
                        }
                    }
                }); return false;
            }
        });
    });
    function mobileMenuHide() { 
        var windowWidth = $(window).width(); 
        if (windowWidth < 1024) { 
            $('#site_header').addClass('mobile-menu-hide'); 

        } 
    }



    function customScroll() { 
        var windowWidth = $(window).width(); 
        if (windowWidth > 991) { 
            $(".pt-page").mCustomScrollbar({ scrollInertia: 8 }); 
            $("#site_header").mCustomScrollbar({ scrollInertia: 8 }); 
        } 
        else { 
            $(".pt-page").mCustomScrollbar('destroy'); 
            $("#site_header").mCustomScrollbar('destroy'); 
        } 
    }
    $(window).on('load', function () {
        $(".preloader").fadeOut("slow"); 
        var ptPage = $('.subpages'); 
        if (ptPage[0]) { 
            PageTransitions.init({ menu: 'ul.site-main-menu', }); 
        }
        customScroll();

    }).on('resize', function () { 
        mobileMenuHide(); 
        customScroll(); 
    }); 
    $(document).on('ready', function () {
        demoPanel; 
        var $portfolio_container = $("#portfolio_grid"); 
        $portfolio_container.imagesLoaded(function () { 
            setTimeout(function () { 
                portfolio_init(this); 
            }, 500); 
        }); 
        $(' #portfolio_grid > figure > a ').each(function () { 
            $(this).hoverdir(); 
        });
        $('.menu-toggle').on("click", function (event) { $('#site_header').toggleClass('mobile-menu-hide'); 

        }); 
        $('.site-main-menu').on("click", "a", function (e) { mobileMenuHide(); }); 
        $(".testimonials.owl-carousel").owlCarousel({ nav: true, items: 3, loop: false, navText: false, margin: 10, 
            responsive: { 0: { items: 1, }, 480: { items: 1, }, 768: { items: 2, }, 1200: { items: 3, } }
        }); 
        $('.text-rotation').owlCarousel({ loop: true, dots: false, nav: false, margin: 10, items: 1, autoplay: true, autoplayHoverPause: false, autoplayTimeout: 3800, animateOut: 'zoomOut', animateIn: 'zoomIn' }); $('.lightbox').magnificPopup({
            type: 'image', removalDelay: 300, mainClass: 'mfp-fade', image: { titleSrc: 'title', gallery: { enabled: true }, }, iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
                    '</div>', patterns: { youtube: { index: 'youtube.com/', id: 'v=', src: '//www.youtube.com/embed/%id%?autoplay=1' }, vimeo: { index: 'vimeo.com/', id: '/', src: '//player.vimeo.com/video/%id%?autoplay=1' }, gmaps: { index: '//maps.google.', src: '%id%&output=embed' } }, srcAction: 'iframe_src',
            }, callbacks: { markupParse: function (template, values, item) { values.title = item.el.attr('title'); } },
        }); $('.ajax-page-load-link').magnificPopup({ type: 'ajax', removalDelay: 300, mainClass: 'mfp-fade', gallery: { enabled: true }, }); $('.tilt-effect').tilt({});
    });
   
    const startDate = new Date('2023-01-24');
const endDate = new Date(); 
const dailyWorkingHours = 9;
const startHour = 10;
const endHour = 19;

function calculateTotalWorkingSeconds() {
  let totalSeconds = 0;
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const day = date.getDay();
    if (day !== 0 && day !== 6) { // Only count weekdays
      totalSeconds += dailyWorkingHours * 3600;
    }
  }
  return totalSeconds;
}

let totalWorkingSeconds = sessionStorage.getItem('totalWorkingSeconds');
if (totalWorkingSeconds === null) {
  totalWorkingSeconds = calculateTotalWorkingSeconds();
  sessionStorage.setItem('totalWorkingSeconds', totalWorkingSeconds);
} else {
  totalWorkingSeconds = parseInt(totalWorkingSeconds, 10);
}

const counterElement = document.getElementById('working_hours');

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateCounter() {
  const now = new Date();
  const currentHour = now.getHours();
  const day = now.getDay();

  if (currentHour >= startHour && currentHour < endHour && day !== 0 && day !== 6) {
    // Within working hours on a weekday
    totalWorkingSeconds++;
    sessionStorage.setItem('totalWorkingSeconds', totalWorkingSeconds);
  }

  counterElement.textContent = formatTime(totalWorkingSeconds);
}

updateCounter(); // Initial call to set the counter immediately
setInterval(updateCounter, 1000); // Update every second

    


  // Replace 'YOUR_GITHUB_USERNAME' with your GitHub username
    // Replace 'YOUR_PERSONAL_ACCESS_TOKEN' with your GitHub Personal Access Token
    const username = 'Sharon2408';
    const token = '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';

    // GitHub API endpoint to get the user's repositories
    const url = `https://api.github.com/users/${username}/repos`;

    const headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    };

    async function getCommitCount(repo) {
      const repoName = repo.name;
      const commitsUrl = `https://api.github.com/repos/${username}/${repoName}/commits`;
      let commitCount = 0;
      let page = 1;
      while (true) {
        const response = await fetch(`${commitsUrl}?per_page=100&page=${page}`, { headers });
        if (response.ok) {
          const commits = await response.json();
          if (commits.length === 0) break;
          commitCount += commits.length;
          page += 1;
        } else {
          console.error(`Failed to fetch commits for repo ${repoName}: ${response.status}`);
          break;
        }
      }
      return commitCount;
    }

    
      

      async function main() {
        const response = await fetch(url, { headers });
        if (response.ok) {
          const repos = await response.json();
          let totalCommits = 0;
          let totalPullRequests = 0;
      
          for (const repo of repos) {
           // if (repo.name !== 'freeCodeCampsharon') {
              // Fetch commit count
              const commitCount = await getCommitCount(repo);
             // console.log(`Repo: ${repo.name}, Commits: ${commitCount}`);
              totalCommits += commitCount;
      
              // Fetch pull request count
            //   const pullRequestCount = await getPullRequestCount(repo);
            //   console.log(`Repo: ${repo.name}, Pull Requests: ${pullRequestCount}`);
            //   totalPullRequests += pullRequestCount;
           // }
          }
      
          // Update the DOM elements with the total counts
          const gitCommitCountElement = document.getElementById("git_commits");
          gitCommitCountElement.textContent = totalCommits;
      
          const prCounterElement = document.getElementById("git-pull");
          prCounterElement.textContent = totalPullRequests;
      
         // console.log(`Total commit count: ${totalCommits}`);
         // console.log(`Total pull request count: ${totalPullRequests}`);
        } else {
          console.error(`Failed to fetch repositories: ${response.status}`);
        }
      }
      

    main().catch(error => console.error('Error:', error));
})(jQuery);