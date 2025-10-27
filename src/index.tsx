import React from "react";
import { createRoot } from "react-dom/client";

import { Switch, Route, Router, Link, useLocation } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";

import "./styles.css";

const Page1 = () => {
    const [location] = useLocation();

    alert(`Page 1 was rendered!\nLocation from useLocation(): ${location}`)

    return (
        <div>
            <p>Go to <Link to="/page/2">/page/2</Link> now</p>

            <hr/>

            <p>If you arrived here at the at of the reproduction after you pressed "back" in your browser, then you will have seen two alerts pop up, one for page 2 (which you left behind) and one for page 1 (which you have re-entered).</p>
            <p>The alert for page 2 is wrong, since it should not have been re-rendered when we left the page.</p>
        </div>
    );
};

const Page2 = () => {
    const [location] = useLocation();

    alert(`Page 2 was rendered!\nLocation from useLocation(): ${location}`)

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
            <li>Go to <Link to="/page/1">/page/1</Link></li>
            <li>(Dismiss the alert that pops up for now)</li>
            <li>Follow the link to <code>/page/2</code> on that page.</li>
            <li>Press the browser's "back" button.</li>
        </ul>
    </div>
};

function App() {
    return (
        <Router hook={useBrowserLocation}>
            <section>
                <nav>
                    <Link href="/page/1">Page One</Link>
                    <Link href="/page/2">Page Two</Link>
                </nav>

                <main>
                    <Switch>
                        <Route path="/page/1" component={Page1} />
                        <Route path="/page/2" component={Page2} />
                        <Route path="/" component={Home} />
                        <Route path="/:anything*">Default Route: nothing found!</Route>
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
