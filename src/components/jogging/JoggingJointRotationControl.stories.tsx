import { Meta, StoryObj } from "@storybook/react"
import { JoggingJointRotationControl } from "./JoggingJointRotationControl"
import { useRef } from "react"
import { useAnimationFrame } from "../utils/hooks"

const meta: Meta<typeof JoggingJointRotationControl> = {
  component: JoggingJointRotationControl,

  args: {
    lowerLimitDegs: -360,
    upperLimitDegs: 360,
    disabled: false,
  },
  render: function Component(args) {
    const joggingDirRef = useRef<"+" | "-" | null>(null)
    const joggingValueRef = useRef(0)

    useAnimationFrame(() => {
      if (joggingDirRef.current === "+") {
        joggingValueRef.current += 1
      } else if (joggingDirRef.current === "-") {
        joggingValueRef.current -= 1
      }
    })

    const { startJogging, stopJogging, getValueDegs, ...restArgs } = args

    return (
      <JoggingJointRotationControl
        startJogging={(direction) => (joggingDirRef.current = direction)}
        stopJogging={() => (joggingDirRef.current = null)}
        getValueDegs={() => joggingValueRef.current}
        {...restArgs}
      />
    )
  },
}
export default meta

export const Default: StoryObj<typeof JoggingJointRotationControl> = {}
