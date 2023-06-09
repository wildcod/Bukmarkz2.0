import React, {useEffect} from 'react';
import style from './BookmarkGuide.module.scss'
import {Link} from "react-router-dom";
import {LOCAL_URL, TESTING_URL} from "../../../constants";
import {scrollToTop} from "../../../utils";

const BookmarkGuide = () => {

    useEffect(() => {
        scrollToTop()
    }, [])

    return (
        <div className={style.container}>
            <h1>Installing the Browser Buttons</h1>
            <p>Choose either Bookmarklets or Browser Extensions to install the browser buttons.</p>
            <div className={style.installationContainer}>
                <h3>Bookmarklets for any Browser</h3>
                <div className={style.step}>
                    <span>Step 1</span>
                    <div>
                        <span>Make sure your browser's Bookmarks Bar is visible</span>
                    </div>
                </div>
                <div className={style.step}>
                    <span>Step 2</span>
                    <div>
                        <span>Drag the below buttons to your browser's Bookmarks Bar</span>
                        <span>Button for bookmarking the actual page:
                            <a href="javascript: (function(){var title=encodeURIComponent(window.document.title);var url=encodeURIComponent(window.location.href);var ua=navigator.userAgent;var ver=&quot;2.5&quot;;if (isM()) mAdd(); else dAdd();function dAdd(){var br=getBrowser();var w=579;var h=467;if (br=='firefox'){if (isMac()) h=462;else h=495;}else if (br=='opera'){w=600;h=554;}else if(br=='safari'){h=488;}else if (br=='chrome' &amp;&amp; isMac()){h=467;}else if (br=='ie'){h=452;}var left=(screen.width-w)/2;var tops=(screen.height-h)/3;win=window.open('http://www.bukmarkz.com/extension?title='+title+'&amp;url='+url+'&amp;bv='+ver, '_blank', 'top='+tops+', left='+left+', width='+w+', height='+h+' resizable=1, location=no, menubar=0, scrollbars=0, status=0, toolbar=0');if (br=='ie') setTimeout(function(){win.focus();},5);}function mAdd(){void(window.open('https://bukmarkz-webapp.herokuapp.com/extension?title='+title+'&amp;url='+url+'&amp;bv='+ver, '_blank'));}function isM(){if (ua.match(/Android/i) || ua.match(/webOS/i) || ua.match(/iPhone/i) || ua.match(/iPad/i) || ua.match(/iPod/i) || ua.match(/BlackBerry/i) || ua.match(/Windows Phone/i)) return true;else return false;}function getBrowser(){if (ua.match(/Edge/i)) return 'edge';if (ua.match(/Opera/i)) return 'opera';if (ua.match(/OPR/i)) return 'opera';if (ua.match(/Chrome/i)) return 'chrome';if (ua.match(/Firefox/i)) return 'firefox';if (ua.match(/MSIE/i)) return 'ie';if (ua.match(/Windows NT/i) &amp;&amp; ua.match(/rv:11/i)) return 'ie';if (!!ua.match(/Version\/[\d\.]+.*Safari/)) return 'safari';return 'other';}function isMac(){if (ua.match(/Macintosh/i)) return true;else return false;}})();">
                                Add to Bukmarkz
                            </a>
                        </span>
                        <span>Button for accessing your bookmarks:
                            <Link to={'/dashboard'}>
                                Bukmarkz Dashboard
                            </Link>
                        </span>
                    </div>
                </div>
                {/*<div className={style.links}>*/}
                {/*    <h3>Browser Extensions</h3>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default BookmarkGuide;
