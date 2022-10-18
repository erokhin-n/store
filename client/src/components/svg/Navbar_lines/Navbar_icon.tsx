import React, { FC } from "react";
import { animated, useSpring } from "react-spring";
import { transform } from "typescript";
import Line1 from "./Navbar_line1";
import Line2 from "./Navbar_line2";
// import Line1 from "./Navbar_line1";
// import Line2 from "./Navbar_line2";
// import Line3 from "./Navbar_line3";


const Icon:FC<{navbarVisible:boolean}> = ({navbarVisible}) => {

    const line1Spring = useSpring({
        transform: navbarVisible ? 
            "translate(30%, 30%) rotate(45deg)" :
            "translate(20%, 25%) rotate(0deg)"
    })

    const line2Spring = useSpring({
        transform: navbarVisible ? 
            "translate(30%, 30%) rotate(45deg)" :
            "translate(20%, 47%) rotate(0deg)"
    })

    const line3Spring = useSpring({
        transform: navbarVisible ? 
            "translate(27%, 72%) rotate(-45deg)" :
            "translate(20%, 68%) rotate(0deg)"
    })
    
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            viewBox="0 0 600 600"
        >
            <rect
                width="548.772"
                height="558.234"
                fill="#313337"
                strokeWidth="0"
                rx="0"
                ry="0"
                transform="matrix(1.01478 0 0 1 21.559 22.978)"
            ></rect>
            <Line1 spring={line1Spring} />
            <Line1 spring={line2Spring} />
            <Line1 spring={line3Spring} />
        </svg>
    );
}

export default Icon;
