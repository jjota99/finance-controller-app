import Input from '@/app/components/Input/Input'
import Button from '@/app/components/Button/Button'
import { Control, Controller, SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { ReactElement } from 'react'

type Props = {
    formInputs: Array<any>
    onSubmit: () => void
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
            {formInputs.map((input) => (
                <Controller
                    key={input.name}
                    rules={{
                        required: true,
                        maxLength: input.maxLenght,
                    }}
                    render={({ field }) => (
                        <Input
                            label={input.label}
                            size="lg"
                            variant={input.variant}
                            placeholder={input.placeholder}
                            {...field}
                        />
                    )}
                    name={input.name}
                    control={control}
                />
            ))}

            <div className="flex flex-1 gap-4">
                <Button title="Confirmar" size="lg" variant="primary" type="submit" />
                <Button
                    title="Cancelar"
                    size="lg"
                    variant="secondary"
                    onClick={onReset}
                />
            </div>
        </form>
    )
}
