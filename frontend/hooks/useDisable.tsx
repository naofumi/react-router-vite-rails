import {useEffect, useState} from "react"
import {useNavigation} from "react-router"

export function useDisable() {
  const [disabled, setDisabled] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    if (navigation.state === "idle") {
      setDisabled(false)
    }
  }, [navigation])

  return {disabled, setDisabled}
}
