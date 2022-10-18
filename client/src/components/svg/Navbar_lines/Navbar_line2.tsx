import { animated } from "react-spring"

const Line2 = ({spring}:any) => {
    return (
        <animated.g
            style={spring}
        >
            <rect
                width="351.431"
                height="43.253"
                fill="#d2dbed"
                strokeWidth="0"
                rx="0"
                ry="0"
                transform="matrix(1.25768 .00562 -.00447 .99999 79.103 277.387)"
            ></rect>
      </animated.g>
    )
}

export default Line2