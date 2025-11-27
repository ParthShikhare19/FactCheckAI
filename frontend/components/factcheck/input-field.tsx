"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function InputField({
  id,
  label,
  type = "text",
  autoComplete,
  required = true,
  placeholder,
}: {
  id: string
  label: string
  type?: string
  autoComplete?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className="rounded-md"
      />
    </div>
  )
}
