import { Select } from '@kobalte/core'
import { FaSolidCheck } from 'solid-icons/fa'
import { HiSolidSelector } from 'solid-icons/hi'
import { type Component, createSignal } from 'solid-js'
import './styles.css'

interface SelectionProps {
    name: string
    options: string[]
    placeholder: string
    defaultValue?: string
    description?: string
    onValueChange?: (value: string) => void
}

const Selection: Component<SelectionProps> = (props) => {
    const [value, setValue] = createSignal(props.defaultValue)

    const handleChange = (value: string) => {
        setValue(value)
        if (props.onValueChange) props.onValueChange(value)
    }

    return (
        <Select.Root
            name={props.name}
            value={value()}
            onValueChange={handleChange}
            defaultValue={props.defaultValue}
            options={props.options}
            placeholder={props.placeholder}
            valueComponent={(props) => props.item.rawValue}
            itemComponent={(props) => (
                <Select.Item item={props.item} class="select__item">
                    <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
                    <Select.ItemIndicator class="select__item-indicator">
                        <FaSolidCheck />
                    </Select.ItemIndicator>
                </Select.Item>
            )}>
            <Select.Trigger class="select__trigger" aria-label="ESP_Boards">
                <Select.Value class="select__value" />
                <Select.Icon class="select__icon">
                    <HiSolidSelector />
                </Select.Icon>
            </Select.Trigger>
            <Select.Description>{props.description}</Select.Description>
            <Select.Portal>
                <Select.Content class="select__content">
                    <Select.Listbox class="select__listbox" />
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}

export default Selection
