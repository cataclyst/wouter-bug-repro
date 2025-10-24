// import React, {useContext, useEffect, createContext} from "react";
// import { createRoot } from "react-dom/client";
// import { createRoot } from "react-dom";

import { Switch, Route, Router, Link, useParams, useLocation } from "wouter";
import { useBrowserLocation, navigate } from "wouter/use-browser-location";

import "./styles.css";
import {createRoot} from "react-dom/client";
// import {render} from "react-dom";

const Page1 = () => {
    const params = useParams();
    const [location] = useLocation();

    alert(`Page 1 was rendered!\nParam: ${params.pageId}\nLocation: ${location}`)

    return (
        <div>
            <p>The param on Page 1 is: {params.pageId}</p>
            <p>The location on Page 1 is: {location}</p>
        </div>
    );
};

const Page2 = () => {
    const params = useParams();
    const [location] = useLocation();

    alert(`Page 2 was rendered!\nParam: ${params.pageId}\nLocation: ${location}`)

    return (
        <div>
            <p>The param on Page 2 is: {params.pageId}</p>
            <p>The location on Page 2 is: {location}</p>
        </div>
    );
};

function App() {
    return (
        <Router hook={useBrowserLocation}>
            <section>
                <nav>
                    <Link href="/page/1">Page One</Link>
                    <Link href="/a-different-page/2">Page Two</Link>
                </nav>


                <button onClick={() => {
                    navigate("/page/1");
                }}>To Page 1 (sync)</button>

                <button onClick={() => {
                    Promise.resolve().then(() => {
                        navigate("/a-different-page/2");
                    });
                }}>To Page 2 (with promise)</button>

                <main>
                    <Switch>
                        <Route path="/page/:pageId" component={Page1} />
                        <Route path="/a-different-page/:pageId" component={Page2} />
                        <Route path="/:anything*">Default Route: nothing found!</Route>
                    </Switch>
                </main>
            </section>
        </Router>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    // React 17:
    // render(<App />, rootElement);

    // React 18+:
    const root = createRoot(rootElement);
    root.render(<App />);
}
