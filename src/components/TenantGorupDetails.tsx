import {
  Details,
  DetailsItem,
  DetailsLabel,
  DetailsLabelText,
  DetailsList,
  DetailsTitle,
  DetailsTitleText,
  DetailsValue,
  DetailsValueText,
  FileKey2,
} from "@usekeyhole/nativewind";
import { View } from "react-native";

export function TenantGroupDetailsDemo() {
  const tenant = {
    id: "1",
    name: "raimonds-onborder",
    email: "skkxhlbdvdhnwotobg@ckptr.com",
    countryCode: "+371",
    phone: "25878675",
    nationality: null, // or 'lv' if you want to test the flag
  };
  return (
    <Details className="bg-accent rounded-md p-4">
      <DetailsTitle className="mb-2">
        <DetailsTitleText className="text-foreground">Tenants</DetailsTitleText>
      </DetailsTitle>
      <DetailsList className="gap-y-4">
        <DetailsItem key={tenant.id} className="flex-col items-start">
          <DetailsLabel className="flex-row items-center gap-x-2 mb-1">
            {(tenant?.nationality && <FileKey2 className="size-10" />) || (
              <FileKey2 className="size-5 stroke-2 text-muted-foreground" />
            )}
            <DetailsValueText className="text-muted-foreground">
              {tenant.name}
            </DetailsValueText>
          </DetailsLabel>
          <DetailsValue className="ml-7">
            <DetailsLabelText className="text-muted-foreground">
              Email
            </DetailsLabelText>
            <DetailsValueText className="text-muted-foreground">
              {tenant.email}
            </DetailsValueText>
          </DetailsValue>
          <DetailsValue className="ml-7 flex-row">
            <DetailsLabelText className="text-muted-foreground">
              Phone number
            </DetailsLabelText>
            <DetailsValueText className="text-muted-foreground">
              {tenant.countryCode} {tenant.phone || "-"}
            </DetailsValueText>
          </DetailsValue>
        </DetailsItem>
      </DetailsList>
    </Details>
  );
}
