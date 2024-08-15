import { Paper, Stack, Tab, Tabs } from "@mui/material"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useEffect } from "react"
import { JoggingCartesianTab } from "./JoggingCartesianTab"
import { JoggingJointTab } from "./JoggingJointTab"
import { JoggingStore } from "./JoggingStore"
import { LoadingCover } from "../LoadingCover"
import { runInAction } from "mobx"
import type { NovaClient } from "@wandelbots/wandelbots-js"

export type JoggingPanelProps = {
  /** Connection to a Nova instance to use for jogging */
  nova: NovaClient
  /** Id of the motion group to move e.g. 0@ur5e **/
  motionGroupId: string
  /** Callback with the jogging panel's state store for further customization/config */
  onSetup?: (store: JoggingStore) => void
  /** Any children will go at the bottom of the panel under the default components */
  children?: React.ReactNode
}

export const JoggingPanel = observer((props: JoggingPanelProps) => {
  const { nova } = props

  const state = useLocalObservable(() => ({
    joggingStore: null as JoggingStore | null,
    loadingError: null as unknown | null,
  }))

  async function init() {
    try {
      const jogger = await nova.connectJogger(props.motionGroupId)
      const joggingStore = await JoggingStore.loadFor(jogger)
      runInAction(() => {
        state.joggingStore = joggingStore
      })
      if (props.onSetup) {
        props.onSetup(joggingStore)
      }
    } catch (err) {
      state.loadingError = err
    }
  }

  useEffect(() => {
    init()
    return () => {
      state.joggingStore?.dispose()
    }
  }, [])

  // Set correct jogging mode on jogger based on user selections
  useEffect(() => {
    if (!state.joggingStore) return

    const {
      currentTab,
      selectedTcpId,
      activeCoordSystemId,
      selectedDiscreteIncrement,
    } = state.joggingStore

    if (currentTab.id !== "cartesian" && currentTab.id !== "joint") return

    const cartesianJoggingOpts = {
      tcpId: selectedTcpId,
      coordSystemId: activeCoordSystemId,
    }

    if (selectedDiscreteIncrement && currentTab.id === "cartesian") {
      state.joggingStore.jogger.setJoggingMode(
        "increment",
        cartesianJoggingOpts,
      )
    } else {
      state.joggingStore.jogger.setJoggingMode(
        currentTab.id,
        cartesianJoggingOpts,
      )
    }
  }, [
    state.joggingStore?.currentTab,
    state.joggingStore?.selectedTcpId,
    state.joggingStore?.activeCoordSystemId,
    state.joggingStore?.selectedDiscreteIncrement,
  ])

  if (!state.joggingStore) {
    return (
      <JoggingPanelOuter>
        <LoadingCover message="Loading jogging" error={state.loadingError} />
      </JoggingPanelOuter>
    )
  }

  const { joggingStore: store } = state

  return (
    <JoggingPanelOuter>
      <Stack flexGrow={1}>
        {/* Tab selection */}
        <Tabs value={store.tabIndex} onChange={store.onTabChange}>
          {store.tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.label}
              id={`jogging-tab-${tab.id}`}
              aria-controls={`jogging-tab-${tab.id}`}
            />
          ))}
        </Tabs>

        {/* Current tab content */}
        <Stack flexGrow={1}>
          {store.currentTab.id === "cartesian" && (
            <JoggingCartesianTab store={store} />
          )}
          {store.currentTab.id === "joint" && <JoggingJointTab store={store} />}
          {props.children}
        </Stack>
      </Stack>
    </JoggingPanelOuter>
  )
})

function JoggingPanelOuter({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      sx={{
        maxWidth: "460px",
        minWidth: "350px",
        overflowY: "auto",
        position: "relative",
        height: "100%",
      }}
    >
      <Paper
        sx={{
          height: "100%",
        }}
      >
        {children}
      </Paper>
    </Stack>
  )
}
