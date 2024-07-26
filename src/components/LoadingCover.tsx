import { makeErrorMessage } from "./utils/errorHandling"
import { CircularProgress, Stack, useTheme } from "@mui/material"
import { useEffect, useState } from "react"

export const LoadingCover = (props: {
  message?: string
  error?: unknown
  softTimeout?: number
}) => {
  const softTimeout = props.softTimeout || 3000

  const [showSlowLoadingMessage, setShowSlowLoadingMessage] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSlowLoadingMessage(true)
    }, softTimeout)

    return () => clearTimeout(timeout)
  })

  return (
    <Stack
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      {props.error ? (
        <LoadingErrorMessage message={props.message} error={props.error} />
      ) : (
        <>
          <CircularProgress sx={{ marginBottom: "24px" }} />
          {!!props.message && <div>{props.message}</div>}
          <Stack
            sx={{
              visibility: showSlowLoadingMessage ? "visible" : "hidden",
              marginTop: "1rem",
              color: "gray",
            }}
          >
            {"This is taking longer than expected..."}
          </Stack>
        </>
      )}
    </Stack>
  )
}

const LoadingErrorMessage = (props: { message?: string; error: unknown }) => {
  const errorMessage = makeErrorMessage(props.error)
  const stack = props.error instanceof Error ? props.error.stack : null
  const theme = useTheme()

  return (
    <Stack
      sx={{
        maxHeight: "100%",
        maxWidth: "min(100%, 800px)",
        padding: 2,
        overflow: "auto",
        color: theme.palette.error.main,
        "& pre": {
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          paddingBottom: "3rem",
        },
      }}
    >
      {`Error while: ${props.message} - ${errorMessage}`}
      <br />
      {stack && <pre>{stack}</pre>}
    </Stack>
  )
}
