import React from "react";
import { Page, Link, Toolbar, Navbar } from "framework7-react";

export default class NotificationIcon extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }
    render() {
        return (
            <div className="page-navbar__noti">
                <Link href="/notification/">
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="prefix__feather prefix__feather-bell"
                    >
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                    <div className="count"></div>
                </Link>
            </div>
        )
    }
}