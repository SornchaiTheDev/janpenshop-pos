import { useState } from 'react'
import Switch from './Switch'

export type ToggleSwitchProps = {
  name: string
  onClick: () => void
}
interface Props {
  buttons: ToggleSwitchProps[]
}

type ButtonName = ToggleSwitchProps['name']

function ToggleSwitch({ buttons }: Props) {
  const [active, setActive] = useState<ButtonName>(buttons[0].name)

  const handleOnClick = (name: ButtonName) => {
    const button = buttons.find((button) => button.name === name)
    if (button) {
      setActive(name)
      button.onClick()
    }
  }

  return (
    <div className="flex items-center w-[200px] gap-2 p-2 rounded-full bg-zinc-100">
      {buttons.map(({ name }) => (
        <Switch
          key={name}
          title={name}
          active={active === name}
          onClick={() => handleOnClick(name)}
        />
      ))}
    </div>
  )
}

export default ToggleSwitch
