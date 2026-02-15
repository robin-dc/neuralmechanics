import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
} from "@/components/ui/dialog";
import PatientService from "@/services/patientService";

const formSchema = z.object({
  heartRate: z
    .number()
    .min(30, "Heart rate must be at least 30 bpm.")
    .max(220, "Heart rate must be at most 220 bpm."),
  systolic: z
    .number()
    .min(70, "Systolic must be at least 70 mmHg.")
    .max(250, "Systolic must be at most 250 mmHg."),
  diastolic: z
    .number()
    .min(40, "Diastolic must be at least 40 mmHg.")
    .max(150, "Diastolic must be at most 150 mmHg."),
  temperature: z
    .number()
    .min(35, "Temperature must be at least 35°C.")
    .max(42, "Temperature must be at most 42°C."),
  weight: z
    .number()
    .min(0.5, "Weight must be at least 0.5 kg.")
    .max(500, "Weight must be at most 500 kg."),
  height: z
    .number()
    .min(30, "Height must be at least 30 cm.")
    .max(300, "Height must be at most 300 cm."),
  notes: z.string().optional(),
});

interface AddVitalsFormProps {
  patientId: string;
}

export default function AddVitalsForm({ patientId }: AddVitalsFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heartRate: 0,
      systolic: 0,
      diastolic: 0,
      temperature: 0,
      weight: 0,
      height: 0,
      notes: "",
    },
  });

  const addVisit = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const visitData = {
        ...data,
        height: data.height / 100,
      };
      return await PatientService.addVisit(patientId, visitData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patient", patientId],
      });

      form.reset();
      toast.success("Visit vitals added successfully!");
    },
    onError: () => {
      toast.error("Failed to add visit vitals.");
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    addVisit.mutate(data);
  }

  const { isSubmitting } = form.formState;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary! text-white!">
          <Plus className="w-4 h-4" />
          Add Visit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Visit Vitals</DialogTitle>
          <DialogDescription>
            Record vital signs for this patient visit. All fields are required except notes.
          </DialogDescription>
        </DialogHeader>
        <form id="form-add-vitals" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="heartRate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-add-vitals-heartRate">
                      Heart Rate (bpm)
                    </FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                      id="form-add-vitals-heartRate"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter heart rate"
                      autoComplete="off"
                      type="number"
                      step="1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="temperature"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-add-vitals-temperature">
                      Temperature (°C)
                    </FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                      id="form-add-vitals-temperature"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter temperature"
                      autoComplete="off"
                      type="number"
                      step="0.1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="systolic"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-add-vitals-systolic">
                      Systolic (mmHg)
                    </FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                      id="form-add-vitals-systolic"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter systolic"
                      autoComplete="off"
                      type="number"
                      step="1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="diastolic"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-add-vitals-diastolic">
                      Diastolic (mmHg)
                    </FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                      id="form-add-vitals-diastolic"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter diastolic"
                      autoComplete="off"
                      type="number"
                      step="1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              

              <Controller
                name="weight"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-add-vitals-weight">
                      Weight (kg)
                    </FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                      id="form-add-vitals-weight"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter weight"
                      autoComplete="off"
                      type="number"
                      step="0.1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="height"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-add-vitals-height">
                      Height (cm)
                    </FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                      id="form-add-vitals-height"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter height"
                      autoComplete="off"
                      type="number"
                      step="1"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Notes Field - Full Width */}
            <Controller
              name="notes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel htmlFor="form-add-vitals-notes">
                    Notes (Optional)
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-add-vitals-notes"
                    aria-invalid={fieldState.invalid}
                    placeholder="Add any additional observations or notes..."
                    rows={4}
                    className="w-full resize-none"
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
            <Button variant="outline" onClick={() => form.reset()}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="form-add-vitals" disabled={isSubmitting}>
            {isSubmitting ? "Adding Visit..." : "Add Visit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}