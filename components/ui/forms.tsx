import * as React from "react"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"
import { TextProps, View, ViewProps } from "react-native"
import {Text} from "react-native-paper"


const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ style, ...props }: ViewProps) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <View style={style} {...props} />
    </FormItemContext.Provider>
  )
}
FormItem.displayName = "FormItem"

function FormLabel({ style, children, ...props }: TextProps) {
  return (
    <Text
      style={{
        color: "#000",
        fontWeight: "bold",
        ...(style as object),
      }}
      {...props}
    >
      {children}
    </Text>
  )

}

FormLabel.displayName = "FormLabel"
const FormControl = React.forwardRef<View, ViewProps>(({ style, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <View
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      style={style}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"


function FormMessage ({ children, style, ...props }: TextProps) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <Text
      id={formMessageId}
      style={{
        color: "red",
        fontWeight: "bold",
        ...(style as object),
      }}
      {...props}
    >
      {body}
    </Text>
  )
}
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  // FormDescription,
  FormMessage,
  FormField,
}