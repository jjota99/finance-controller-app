import { Control, Controller } from 'react-hook-form'
import { ReactElement, ReactNode } from 'react'
import { TFormInput } from '@/app/types/form'
import Button from '@/app/components/Button/Button'
import Input from '@/app/components/Input/Input'
import Dropdown from '@/app/components/Dropdown/Dropdown'

type Props = {
    formInputs: TFormInput[]
    onSubmit: (param: any) => void
    onReset: () => void
    control: Control<any, any>
}

export default function GenericForm({
    formInputs,
    onSubmit,
    onReset,
    control,
}: Props): ReactElement {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8 w-full justify-center">
            {formInputs.map((input: TFormInput) => (
                <Controller
                    key={input.name}
                    rules={{
                        required: {
                            value: input.rules.required?.value,
                            message: input.rules.required?.message,
                        },
                        maxLength: {
                            value: input.rules.maxLength?.value as number,
                            message: input.rules.maxLength?.message as string,
                        },
                    }}
                    render={({ field, formState: { errors } }) => {
                        if (input.type === 'dropdown' && input.options) {
                            return (
                                <div className="flex flex-col gap-1 flex-1">
                                    <span className="text-neutral-200">
                                        {input.label}
                                    </span>
                                    <Dropdown
                                        selectedValue={field.value}
                                        placeholder={input.placeholder}
                                        options={input.options}
                                    />
                                </div>
                            )
                        }

                        return (
                            <div className="flex flex-col flex-1 gap-1">
                                <Input
                                    maxLength={input.rules.maxLength?.value as number}
                                    label={input.label}
                                    size={input.size || 'lg'}
                                    variant={input.variant || 'text'}
                                    placeholder={input.placeholder}
                                    {...field}
                                />
                                {errors && (
                                    <span className="text-red-600">
                                        {errors[input.name]?.message as ReactNode}
                                    </span>
                                )}
                            </div>
                        )
                    }}
                    name={input.name}
                    control={control}
                />
            ))}

            <div className="flex flex-1 gap-4">
                <Button title="Confirmar" size="lg" variant="primary" type="submit" />
                <Button title="Cancelar" size="lg" variant="danger" onClick={onReset} />
            </div>
        </form>
    )
}
