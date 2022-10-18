import { animated } from "react-spring"

export const Line1 = ({spring}:any) => {

    return (
        <g>
            <animated.rect
                style={spring}
                width="351.431"
                height="43.253"
                fill="#d2dbed"
                strokeWidth="0"
                rx="0"
                ry="0"
                // transform="matrix(1.25765 -0.01022 0.00813 0.99997 78.836 132.907)"
            ></animated.rect>
        </g>
    )
}

export default Line1