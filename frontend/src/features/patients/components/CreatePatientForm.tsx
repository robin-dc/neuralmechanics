import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PatientService from "@/services/patientService";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(32, "First name must be at most 32 characters."),
  lastName: z
    .string()
    .min(5, "Last name must be at least 5 characters.")
    .max(32, "Last name must be at most 32 characters."),
  age: z
    .number()
    .min(1, "Age must be greater than 0.")
    .max(150, "Age must be 150 or less."),
  gender: z.enum(["Male", "Female", "Other"]),
  status: z.enum(["Active", "Inactive"]),
  phone: z.string()
    .min(11, "Phone number must be at least 11 characters.")
    .max(11, "Phone number must be at most 11 characters."),
  lastDateVisit: z.string().optional()
})

export default function CreatePatientForm() {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        age: 0,
        gender: undefined,
        status: undefined,
        phone: "",
        lastDateVisit: new Date().toISOString(),
      },
    })

    const createPatient = useMutation({
      mutationFn: async (data: z.infer<typeof formSchema>) => {
        return await PatientService.createPatient(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["all-patients"],
          });

        form.reset();
        toast.success("Patient created successfully!")
      },
      onError: () => {
        toast.error("Failed to create patient.")
      }
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
      createPatient.mutate(data);
    }

  const { isLoading } = form.formState

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary! text-white!">
          <Plus className="w-4 h-4" />
          Create Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Patient</DialogTitle>
          <DialogDescription>
            Initial details are required to a patient record. You can add vitals later.
          </DialogDescription>
        </DialogHeader>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-firstName">
                    First Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-firstName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter first name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-lastName">
                    Last Name
                  </FieldLabel>
                 <Input
                    {...field}
                    id="form-rhf-demo-lastName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter last name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="age"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-age">
                    Age
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                    id="form-rhf-demo-age"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter age"
                    autoComplete="off"
                    type="number"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="gender"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-gender">
                    Gender
                  </FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-demo-gender"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-status">
                    Status
                  </FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-demo-status"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-phone">
                    Phone
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter phone number"
                    autoComplete="off"
                    type="tel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => form.reset()}>Cancel</Button>
          </DialogClose>
          <Button type="submit" form="form-rhf-demo" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Patient"}
          </Button>
        </DialogFooter>
      </DialogContent>
      
    </Dialog>
  );
}