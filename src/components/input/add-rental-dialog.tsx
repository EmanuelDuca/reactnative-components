import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  TooltipProvider,
} from "@usekeyhole/web";
import React, { useState } from "react";
//import { useLocalizationContext } from "../../../contexts/LocalizationContext";
import { useControllableState } from "@usekeyhole/hooks";
//import { useComplexQuery } from "../../../hooks/api/complexes";
import { AddRentalForm } from "./add-rental-form";
import { toast } from "@usekeyhole/nativewind";

export function AddRentalDialog({
  complexId,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
  lockComplex,
  ...dialogProps
}: React.ComponentProps<typeof Dialog> & {
  complexId?: string;
  lockComplex?: boolean;
}) {
  const [open, setOpen] = useState(true); // open by default
  return (
    <Dialog open={open} onOpenChange={setOpen} {...dialogProps}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-[728px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>(DEMO)</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <TooltipProvider>
          <AddRentalForm
            lockComplex={true}
            isSubmitting={false}
            defaultValues={{
              handle: "A-1001",
              address: "Amaliegade 6",
              number: "2A",
              city: "Copenhagen",
              zipcode: "1256",
              complex: {
                id: "1",
                name: "Amaliegade 6",
                depositMonths: 3,
                prepaidMonths: 1,
              },
              rentalFee: 12000,
            }}
            onSubmit={(values) => {
              console.log("Dummy submit:", values);
            }}
          />
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}
