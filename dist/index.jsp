    <%@page contentType="text/html"%>
        <%@page pageEncoding="UTF-8"%>
    <!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <!--
      Notice the use of %PUBLIC_URL% in the tag above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>喜悦来了后台管理</title>
    <script src="http://webapi.amap.com/maps?v=1.3&key=f0e133a8c4994fc745c5cba6668d9925"></script>
    <script type="text/javascript">window.NEJ_CONF = {root: 'http://nej.netease.com/nej/res/'}</script>
    <!--<script src="http://cache.amap.com/lbs/static/addToolbar.js"></script>-->
<link rel="shortcut icon" href="http://www.joyiou.com/manage/favicon.ico"></head>
<body>
<div id="root"></div>
<!--
  This HTML file is a public.
  If you open it directly in the browser, you will see an empty page.

  You can add webfonts, meta tags, or analytics to this file.
  The build step will place the bundled scripts into the <body> tag.

  To begin the development, run `npm start`.
  To create a production bundle, use `npm run build`.
-->
<script src="http://cdn.staticfile.org/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
    (function ($, h, c) {
        var a = $([]),
            e = $.resize = $.extend($.resize, {}),
            i,
            k = "setTimeout",
            j = "resize",
            d = j + "-special-event",
            b = "delay",
            f = "throttleWindow";
        e[b] = 250;
        e[f] = true;
        $.event.special[j] = {
            setup: function () {
                if (!e[f] && this[k]) {
                    return false;
                }
                var l = $(this);
                a = a.add(l);
                $.data(this, d, {
                    w: l.width(),
                    h: l.height()
                });
                if (a.length === 1) {
                    g();
                }
            },
            teardown: function () {
                if (!e[f] && this[k]) {
                    return false;
                }
                var l = $(this);
                a = a.not(l);
                l.removeData(d);
                if (!a.length) {
                    clearTimeout(i);
                }
            },
            add: function (l) {
                if (!e[f] && this[k]) {
                    return false;
                }
                var n;

                function m(s, o, p) {
                    var q = $(this),
                        r = $.data(this, d);
                    r.w = o !== c ? o : q.width();
                    r.h = p !== c ? p : q.height();
                    n.apply(this, arguments);
                }

                if ($.isFunction(l)) {
                    n = l;
                    return m;
                } else {
                    n = l.handler;
                    l.handler = m;
                }
            }
        };
        function g() {
            i = h[k](function () {
                    a.each(function () {
                        var n = $(this),
                            m = n.width(),
                            l = n.height(),
                            o = $.data(this, d);
                        if (m !== o.w || l !== o.h) {
                            n.trigger(j, [o.w = m, o.h = l]);
                        }
                    });
                    g();
                },
                e[b]);
        }
    })(jQuery, this);
    $(document).ready(function () {
        $('input').attr('autocomplete', 'off')
        $('input').attr('readonly', 'true')
        $('input').attr('onfocus', "this.removeAttribute('readonly')")
    })
</script>
<script src="http://nej.netease.com/nej/src/define.js"></script>
<script src="http://cdn.staticfile.org/blueimp-md5/2.6.0/js/md5.min.js"></script>
<script type="text/javascript" src="http://www.joyiou.com/manage/javascript/0.2e266d87671628fdbc37.js?2e266d87671628fdbc37"></script><script type="text/javascript" src="http://www.joyiou.com/manage/javascript/2.2e266d87671628fdbc37.js?2e266d87671628fdbc37"></script><script type="text/javascript" src="http://www.joyiou.com/manage/javascript/index.2e266d87671628fdbc37.js?2e266d87671628fdbc37"></script></body>
</html>
