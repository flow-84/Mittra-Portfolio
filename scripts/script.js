$(function () {
    $(document).click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    const changeNavBehaviour = function () {
        const nav = $('nav');

        if ($(window).width() < 768) {
            nav.addClass('bg-dark');
            return;
        }

        nav.removeClass('bg-dark');
        nav.css('background-color', ($(window).scrollTop() > 60) ? 'black' : 'transparent');
    };

    changeNavBehaviour();

    $(window).scroll(function () {
        changeNavBehaviour();

        $('#top-button').css({
            'opacity': ($(window).scrollTop() > 60) ? '1' : '0',
            'z-index': ($(window).scrollTop() > 60) ? '1030' : '-1030'
        });
    });

    $('form').submit(function (e) {
        e.preventDefault();

        const name = $('form #name').val();
        const email = $('form #email').val();
        const message = $('form #message').val();

        const subject = `A message from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A %0D%0A${message}`;

        window.location.replace(`mailto:imflow84@gmail.com?subject=${subject}&body=${body}`)
        });

    $('.project-card button').click(function () {
        window.location.href = $(this).data('url');
    })

    async function loadMediumArticles() {
        const transformCategories = (categories) => {
            const newCategories = []
            const capitaliseWords = (str) => {
                return str.replace(/(?:^|\s)\S/g, a => a.toUpperCase())
            }

            categories.forEach(category => {
                const newCategory = capitaliseWords(category.replaceAll("-", " "))
                newCategories.push(newCategory)
            })
            return newCategories
        }

        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.medium.com/feed/@cybercoder.naj')
        const data = await response.json()

        $(".article-card").each((i, article) => {
            $('<img>')
                .attr('src', data.items[i].thumbnail)
                .attr('alt', data.items[i].title)
                .appendTo(article)

            $('<h3>')
                .addClass('font-weight-bold px-3 pt-3')
                .html(data.items[i].title)
                .appendTo(article)

            const p = $('<p>')
                .addClass("px-3")
                .appendTo(article)

            transformCategories(data.items[i].categories).forEach(category => {
                $('<span>')
                    .addClass("px-2 py-1 mx-1 my-2 h4 badge rounded-pill bg-info")
                    .html(category)
                    .appendTo(p)
            })

            $('<a>')
                .addClass('m-3 py-2 px-3')
                .attr('href', data.items[i].link)
                .attr('target', '_blank')
                .html('View Article')
                .appendTo(article)
        })
    }

    loadMediumArticles()
});