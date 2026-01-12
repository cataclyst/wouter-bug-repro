import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";

import {Switch, Router, Link, useLocation, RouteProps, Route} from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";

import "./styles.css";

const Page1 = () => {
    const [location] = useLocation();
    // const [location] = ["dummy"];
    useEffect(() => {
        alert(`Page 1 was rendered!\nLocation from useLocation(): ${location}`)
    }, [location]);

    return (
        <div>
            <p><Link to="/normal-route-2">Continue with buggy behavior</Link></p>
            <p><Link to="/route-without-match-2">Continue with "workaround" behavior</Link></p>

            <hr/>

            <p>If you arrived here at the at of the reproduction after you pressed "back" in your browser, then you will have seen two alerts pop up, one for page 2 (which you left behind) and one for page 1 (which you have re-entered).</p>
            <p style={{color: "goldenrod", fontWeight: "bold"}}>The alert for page 2 is wrong, since it should not have been re-rendered when we left the page.</p>
        </div>
    );
};

const Page2 = () => {
    const [location] = useLocation();
    // const [location] = ["dummy"];
    useEffect(() => {
        alert(`Page 2 was rendered!\nLocation from useLocation(): ${location}`)
    }, [location]);

    return (
        <div>
            <p>Use the browser's back button now, or click here</p>
        </div>
    );
};

const Home = () => {
    return <div>
        <h1>Steps to reproduce:</h1>
        <ul>
            <li><strong>DO NOT USE CODESANDBOX'S BUILT-IN BROWSER-PREVIEW FOR THIS! The browser back/forward buttons there don't work the same like those in native browsers do! Open this sandbox's "deployed" version in a browser window instead: <a href="https://llp68y-3000.csb.app/">https://llp68y-3000.csb.app/</a> instead.</strong></li>
            <li>Go to <Link to="/normal-route-1">/normal-route-1</Link> - you will see an alert pop up that indicates you are on "Page 1"</li>
            <li>Then click the link "Continue with buggy behavior" on that page - again, you will see an alert pop up, this time one that indicates you are on "Page 2"</li>
            <li>Press the browser's "back" button.</li>
            <li style={{color: "goldenrod", fontWeight: "bold"}}>You will first see an alert for "Page 2" being re-rendered, which we left behind, and then one for "Page 1", the actual target page -- there should be no alert for "Page 2" because it should not be re-rendered before being unmounted! </li>
        </ul>
        <h2>Version with workaround:</h2>
        <ul>
            <li>Refresh your page to be sure to not run into any residuary DOM caching behavior.</li>
            <li>The Routes here do not receive a "match" prop from Switch.</li>
            <li>Go to <Link to="/route-without-match-1">/route-without-match-1</Link> - you will see an alert pop up that indicates you are on "Page 1"</li>
            <li>Then click the link "Continue with 'workaround' behavior" on that page - again, you will see an alert pop up, this time one that indicates you are on "Page 2"</li>
            <li>Press the browser's "back" button.</li>
            <li style={{color: "mediumspringgreen", fontWeight: "bold"}}>You will only see an alert for "Page 1", the actual target page -- the old route does not re-render its children, so there is no alert for the old component as well</li>
        </ul>
    </div>
};

const RouteWithoutMatch = (props: RouteProps) => {
    // @ts-ignore Do not let `Switch` pass a `match` prop to `Route`
    const { match, ...restProps } = props;
    return <Route {...restProps} />;
};

function App() {
    return (
        <Router hook={useBrowserLocation}>
            <section>
                <nav>
                    <Link href="/">Home</Link>
                </nav>

                <main>
                    <Switch>
                        <Route path="/normal-route-1" component={Page1} />
                        <Route path="/normal-route-2" component={Page2} />
                        <RouteWithoutMatch path="/route-without-match-1" component={Page1} />
                        <RouteWithoutMatch path="/route-without-match-2" component={Page2} />
                        <Route path="/" component={Home} />
                        <RouteWithoutMatch path="/:anything*">Default Route: nothing found!</RouteWithoutMatch>
                    </Switch>
                </main>
            </section>
        </Router>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
